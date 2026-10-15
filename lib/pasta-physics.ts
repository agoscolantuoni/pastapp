import { Body, Vertices, type IBodyDefinition } from "matter-js"
import collisionShapes from "@/lib/pasta-collision-shapes.json"

const pastaTypes = [
  { sources: ["penne-1", "penne-2", "penne-3"], size: 58 },
  { sources: ["fusilli-01", "fusilli-02", "fusilli-03"], size: 52 },
  { sources: ["rigatoni-1", "rigatoni-2", "rigatoni-3"], size: 48 },
  { sources: ["orecchiette-1", "orecchiette-2", "orecchiette-3"], size: 40 },
  { sources: ["cavatelli-1", "cavatelli-2", "cavatelli-3"], size: 48 },
  { sources: ["garganelli-1", "garganelli-2", "garganelli-3"], size: 58 },
] as const

export function createPastaPieces(countPerType: number) {
  const pieces = pastaTypes.flatMap(({ sources, size }) =>
    Array.from({ length: countPerType }, (_, index) => {
      const file = sources[index % sources.length]
      const shape = collisionShapes[file]
      const scale = size / Math.max(shape.width, shape.height)
      const width = shape.width * scale
      const height = shape.height * scale
      return {
        src: `/pasta/${file}.svg`,
        width,
        height,
        parts: shape.parts.map((part) =>
          part.map(([x, y]) => ({ x: x * width, y: y * height }))
        ),
      }
    })
  )

  // Shuffle the complete batch so pasta types mix throughout the fall.
  for (let index = pieces.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[pieces[index], pieces[other]] = [pieces[other], pieces[index]]
  }
  return pieces
}

export function createPastaBody(
  piece: ReturnType<typeof createPastaPieces>[number],
  x: number,
  y: number
) {
  const material: IBodyDefinition = {
    restitution: 0.12,
    friction: 0.4,
    frictionStatic: 0.8,
    frictionAir: 0.022,
    density: 0.0015,
    slop: 0.02,
  }
  // Each convex part stays in the SVG's coordinate system. Their union follows
  // the silhouette, including the grooves between the fusilli's spiral edges.
  const parts = piece.parts.map((vertices) =>
    Body.create({ ...material, position: Vertices.centre(vertices), vertices })
  )
  const body =
    parts.length === 1 ? parts[0] : Body.create({ ...material, parts })

  // An irregular silhouette's centre of mass differs from the image centre.
  // Keep this offset so the drawing remains aligned while the body rotates.
  const imageOffset = { x: -body.position.x, y: -body.position.y }
  Body.setPosition(body, { x, y })
  return { body, imageOffset }
}
