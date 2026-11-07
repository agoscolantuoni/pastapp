"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
} from "matter-js"
import { createPastaBody, createPastaPieces } from "@/lib/pasta-physics"

const physicsStep = 1000 / 120
const desktopQuery = "(min-width: 640px)"

function subscribeToViewport(callback: () => void) {
  const query = window.matchMedia(desktopQuery)
  query.addEventListener("change", callback)
  return () => query.removeEventListener("change", callback)
}

/** A lightweight Matter.js scene that uses the existing pasta SVGs as sprites. */
export function PastaPhysics({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDesktop = useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia(desktopQuery).matches,
    () => false
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return
    const pieces = createPastaPieces(isDesktop ? 12 : 9)

    const engine = Engine.create({
      enableSleeping: true,
      positionIterations: 8,
      velocityIterations: 8,
    })
    engine.gravity.y = 0.85
    const world = engine.world
    const sprites: {
      body: Body
      imageOffset: { x: number; y: number }
      previous: { x: number; y: number; angle: number }
    }[] = []
    const images = pieces.map(({ src }) => {
      const image = new Image()
      image.src = src
      return image
    })
    let bounds: Body[] = []
    let width = 0
    let height = 0
    let frame = 0
    let previousTime = 0
    let accumulator = 0
    let disposed = false
    let seeded = false
    let hasPointer = false
    let lastPointerMotion = -Infinity
    const smoothPointer = { x: 0, y: 0 }
    let resetPointer = true
    const pointerEnter = () => {
      hasPointer = true
      resetPointer = true
    }
    const pointerLeave = () => {
      hasPointer = false
    }
    const pointerMove = () => {
      lastPointerMotion = performance.now()
    }
    canvas.addEventListener("pointerenter", pointerEnter)
    canvas.addEventListener("pointerleave", pointerLeave)
    canvas.addEventListener("pointermove", pointerMove)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const nextWidth = Math.max(1, rect.width)
      const nextHeight = Math.max(1, rect.height)
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = nextWidth
      height = nextHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      if (bounds.length) Composite.remove(world, bounds)
      const wall = 80
      bounds = [
        Bodies.rectangle(-wall / 2, height / 2, wall, height * 3, {
          isStatic: true,
        }),
        Bodies.rectangle(width + wall / 2, height / 2, wall, height * 3, {
          isStatic: true,
        }),
        Bodies.rectangle(width / 2, height + wall / 2, width + wall * 2, wall, {
          isStatic: true,
        }),
      ]
      Composite.add(world, bounds)

      if (!seeded) {
        seeded = true
        const columns = 5
        pieces.forEach((piece, index) => {
          const column = index % columns
          const row = Math.floor(index / columns)
          const x = ((column + 0.5 + (row % 2) * 0.3) / columns) * width
          const y = -20 - row * Math.min(62, height / 7) - column * 5
          const { body, imageOffset } = createPastaBody(piece, x, y)
          Body.setAngle(body, (Math.random() - 0.5) * 1.2)
          Composite.add(world, body)
          sprites.push({
            body,
            imageOffset,
            previous: { x, y, angle: body.angle },
          })
        })
      }
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    // Matter's mouse input supports both mouse and touch dragging.
    const mouse = Mouse.create(canvas)
    mouse.pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.08, damping: 0.2, render: { visible: false } },
      collisionFilter: { mask: 0x0001 },
    })
    Composite.add(world, mouseConstraint)

    const draw = (time: number) => {
      if (disposed) return
      const delta = previousTime
        ? Math.min(time - previousTime, 50)
        : physicsStep
      previousTime = time
      accumulator += delta
      if (hasPointer) {
        if (resetPointer) {
          smoothPointer.x = mouse.position.x
          smoothPointer.y = mouse.position.y
          resetPointer = false
        }
        const blend = 1 - Math.exp(-delta / 75)
        smoothPointer.x += (mouse.position.x - smoothPointer.x) * blend
        smoothPointer.y += (mouse.position.y - smoothPointer.y) * blend
      }

      // Fixed steps keep collisions consistent across frame rates; interpolation
      // makes drawing smooth even between simulation updates.
      while (accumulator >= physicsStep) {
        const activity = hasPointer
          ? Math.exp(-Math.max(0, time - lastPointerMotion) / 150)
          : 0
        sprites.forEach(({ body, previous }) => {
          previous.x = body.position.x
          previous.y = body.position.y
          previous.angle = body.angle
          if (activity < 0.01 || body === mouseConstraint.body) return
          const dx = body.position.x - smoothPointer.x
          const dy = body.position.y - smoothPointer.y
          const distance = Math.hypot(dx, dy)
          if (distance > 110 || distance < 1) return
          const falloff = (1 - distance / 110) ** 2
          const strength = body.mass * 0.0007 * falloff * activity
          Body.applyForce(body, body.position, {
            x: (dx / distance) * strength,
            y: (dy / distance) * strength,
          })
        })
        Engine.update(engine, physicsStep)
        accumulator -= physicsStep
      }
      context.clearRect(0, 0, width, height)

      const alpha = accumulator / physicsStep
      sprites.forEach(({ body, previous, imageOffset }, index) => {
        const piece = pieces[index]
        const image = images[index]
        if (!piece || !image?.complete || !image.naturalWidth) return
        context.save()
        context.translate(
          previous.x + (body.position.x - previous.x) * alpha,
          previous.y + (body.position.y - previous.y) * alpha
        )
        context.rotate(previous.angle + (body.angle - previous.angle) * alpha)
        context.drawImage(
          image,
          imageOffset.x,
          imageOffset.y,
          piece.width,
          piece.height
        )
        context.restore()
      })
      frame = window.requestAnimationFrame(draw)
    }
    frame = window.requestAnimationFrame(draw)

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      canvas.removeEventListener("pointerenter", pointerEnter)
      canvas.removeEventListener("pointerleave", pointerLeave)
      canvas.removeEventListener("pointermove", pointerMove)
      // The canvas is reused when crossing the mobile breakpoint. Matter does
      // not remove its input listeners when clearing the simulation.
      const mouseHandlers = mouse as Mouse &
        Record<
          "mousemove" | "mousedown" | "mouseup" | "mousewheel",
          EventListener
        >
      for (const [event, handler] of [
        ["mousemove", "mousemove"],
        ["mousedown", "mousedown"],
        ["mouseup", "mouseup"],
        ["wheel", "mousewheel"],
        ["touchmove", "mousemove"],
        ["touchstart", "mousedown"],
        ["touchend", "mouseup"],
      ] as const) {
        canvas.removeEventListener(event, mouseHandlers[handler])
      }
      Mouse.clearSourceEvents(mouse)
      Composite.clear(world, false)
      Engine.clear(engine)
    }
  }, [isDesktop])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 size-full touch-none ${className}`}
    />
  )
}
