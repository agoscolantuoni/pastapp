"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"

// Keep the original angles: short/filled pasta use clusters, long pasta one bundle.
const compositions = {
  penne: [
    { file: "penne-1", left: "2%", top: "8%", width: "55%" },
    { file: "penne-2", left: "4%", top: "51%", width: "50%" },
    { file: "penne-3", left: "49%", top: "30%", width: "53%" },
  ],
  fusilli: [
    { file: "fusilli-01", left: "4%", top: "43%", width: "42%" },
    { file: "fusilli-02", left: "17%", top: "3%", width: "57%" },
    { file: "fusilli-03", left: "47%", top: "28%", width: "50%" },
  ],
  rigatoni: [
    { file: "rigatoni-1", left: "49%", top: "54%", width: "49%" },
    { file: "rigatoni-2", left: "43%", top: "0%", width: "53%" },
    { file: "rigatoni-3", left: "-2%", top: "32%", width: "54%" },
  ],
  spaghetti: [{ file: "spaghetti-1", left: "-3%", top: "25%", width: "106%" }],
  linguine: [{ file: "linguine-1", left: "-3%", top: "24%", width: "106%" }],
  bucatini: [{ file: "bucatini-1", left: "-3%", top: "22%", width: "106%" }],
  ravioli: [
    { file: "ravioli-1", left: "15%", top: "3%", width: "48%" },
    { file: "ravioli-2", left: "49%", top: "37%", width: "48%" },
    { file: "ravioli-3", left: "1%", top: "51%", width: "47%" },
  ],
  tortellini: [
    { file: "tortellini-01", left: "5%", top: "5%", width: "46%" },
    { file: "tortellini-02", left: "49%", top: "26%", width: "46%" },
    { file: "tortellini-03", left: "10%", top: "53%", width: "43%" },
  ],
  cappelletti: [
    { file: "cappelletti-1", left: "5%", top: "5%", width: "46%" },
    { file: "cappelletti-2", left: "49%", top: "26%", width: "46%" },
    { file: "cappelletti-3", left: "10%", top: "53%", width: "43%" },
  ],
} as const

export function hasPastaArtwork(id: string): id is keyof typeof compositions {
  return id in compositions
}

export function PastaArtwork({ id }: { id: keyof typeof compositions }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {compositions[id].map((piece, index) => {
        const direction = index === 1 ? -1 : 1

        return (
          <motion.div
            key={piece.file}
            className="absolute"
            style={{ left: piece.left, top: piece.top, width: piece.width }}
            variants={
              reduceMotion
                ? undefined
                : {
                    rest: { y: 0, rotate: 0, scaleX: 1, scaleY: 1 },
                    buoyant: {
                      y: -7 - index * 2,
                      rotate: direction * 4,
                      scaleX: 1.025,
                      scaleY: 1.055,
                    },
                    pressed: { y: 2, rotate: 0, scaleX: 1.035, scaleY: 0.965 },
                  }
            }
            transition={{
              type: "spring",
              stiffness: 165,
              damping: 10,
              mass: 0.8,
            }}
          >
            <motion.div
              animate={
                reduceMotion
                  ? { y: 0, rotate: 0 }
                  : { y: [0, -3, 0], rotate: [0, direction * 1.5, 0] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 3.6 + index * 0.4,
                      delay: index * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <Image
                src={`/pasta/${piece.file}.svg`}
                alt=""
                width={400}
                height={400}
                unoptimized
                draggable={false}
                className="h-auto w-full select-none"
              />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
