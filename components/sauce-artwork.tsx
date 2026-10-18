"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import type { Sauce } from "@/lib/catalog"
import { getIngredientArtwork } from "@/lib/ingredient-artwork"
import { saucePreviewIngredients } from "@/lib/sauce-artwork"

const layouts = {
  2: [
    { left: "3%", top: "24%", width: "65%", angle: -8 },
    { left: "45%", top: "10%", width: "52%", angle: 10 },
  ],
  3: [
    { left: "1%", top: "17%", width: "66%", angle: -8 },
    { left: "51%", top: "4%", width: "45%", angle: 9 },
    { left: "43%", top: "49%", width: "50%", angle: -5 },
  ],
  4: [
    { left: "0%", top: "4%", width: "57%", angle: -8 },
    { left: "47%", top: "1%", width: "51%", angle: 9 },
    { left: "1%", top: "48%", width: "51%", angle: -6 },
    { left: "46%", top: "46%", width: "53%", angle: 7 },
  ],
} as const

export function SauceArtwork({
  sauce,
  compact = false,
}: {
  sauce: Sauce
  compact?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const ingredients = saucePreviewIngredients[sauce.id] ?? []
  const layout = layouts[ingredients.length as keyof typeof layouts]
  if (!layout) return null

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {ingredients.map((name, index) => {
        const artwork = getIngredientArtwork(name, sauce.category)
        const piece = layout[index]
        if (!artwork || !piece) return null
        const direction = index % 2 === 0 ? -1 : 1

        return (
          <motion.div
            key={name}
            className="absolute aspect-square"
            style={{
              left: piece.left,
              top: piece.top,
              width: piece.width,
              rotate: piece.angle,
            }}
            variants={
              reduceMotion
                ? undefined
                : {
                    rest: { y: 0, rotate: piece.angle, scale: 1 },
                    buoyant: {
                      y: -4 - index * 2,
                      rotate: piece.angle + direction * 5,
                      scale: 1.04,
                    },
                    pressed: { y: 2, rotate: piece.angle, scale: 0.96 },
                  }
            }
            transition={{
              type: "spring",
              stiffness: 165,
              damping: 12,
              mass: 0.8,
            }}
          >
            <motion.div
              className="relative size-full"
              animate={
                reduceMotion
                  ? { y: 0, rotate: 0 }
                  : { y: [0, -2, 0], rotate: [0, direction * 1.5, 0] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 3.6 + index * 0.4,
                      delay: index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <Image
                src={artwork.src}
                alt=""
                fill
                sizes={compact ? "52px" : "106px"}
                draggable={false}
                className="object-contain drop-shadow-sm select-none"
              />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
