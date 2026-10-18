"use client"

import { motion, useReducedMotion } from "motion/react"
import { hasPastaArtwork, PastaArtwork } from "@/components/pasta-artwork"
import { SauceArtwork } from "@/components/sauce-artwork"
import type { Pasta, Sauce } from "@/lib/catalog"

export function PairingHero({ pasta, sauce }: { pasta: Pasta; sauce: Sauce }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="@container px-5">
      <div className="grid grid-cols-[minmax(0,1fr)_clamp(64px,22cqw,100px)] items-start gap-4 @min-[560px]:grid-cols-[1.1fr_1fr] @min-[560px]:gap-6">
        <div className="min-w-0">
          <p className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase @min-[360px]:text-xs">
            Your perfect pairing
          </p>
          <h1 className="mt-4 text-[clamp(24px,9cqw,40px)] leading-[1.3] font-semibold tracking-tight @min-[560px]:text-4xl">
            {pasta.name} with
            <br />
            {sauce.name}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {sauce.description}
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 @min-[560px]:grid-cols-2 @min-[560px]:gap-6">
          <motion.div
            aria-hidden="true"
            className="relative aspect-square rounded-xl bg-muted/40"
            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {hasPastaArtwork(pasta.id) && <PastaArtwork id={pasta.id} />}
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="relative aspect-square rounded-xl bg-muted/40"
            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.1 }}
          >
            <SauceArtwork sauce={sauce} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
