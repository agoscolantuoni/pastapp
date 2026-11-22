import { motion } from "motion/react"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { hasPastaArtwork, PastaArtwork } from "@/components/pasta-artwork"
import { SauceArtwork } from "@/components/sauce-artwork"
import { SauceTags } from "@/components/pasta/sauce-tags"
import { cn } from "@/lib/utils"
import type { Pasta, Sauce } from "@/lib/catalog"

export function PastaOption({
  pasta,
  selected,
  onClick,
  previewArtwork = false,
}: {
  pasta: Pasta
  selected: boolean
  onClick: () => void
  previewArtwork?: boolean
}) {
  const showArtwork = previewArtwork && hasPastaArtwork(pasta.id)
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      initial={false}
      animate="rest"
      whileHover={showArtwork ? "buoyant" : undefined}
      whileFocus={showArtwork ? "buoyant" : undefined}
      whileTap={showArtwork ? "pressed" : undefined}
      className={cn(
        "group relative rounded-2xl text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring",
        selected && "bg-primary/15"
      )}
    >
      <Card
        size="sm"
        className={cn(
          "gap-2 rounded-2xl p-2 shadow-none ring-1 ring-border dark:ring-border",
          showArtwork && "overflow-visible",
          selected && "ring-2 ring-primary dark:ring-primary"
        )}
      >
        <div
          className={cn(
            "relative flex aspect-square items-center justify-center rounded-xl bg-muted/40",
            showArtwork ? "overflow-visible" : "overflow-hidden"
          )}
        >
          {previewArtwork && hasPastaArtwork(pasta.id) && (
            <PastaArtwork id={pasta.id} />
          )}
          {selected && (
            <span className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-4" />
            </span>
          )}
        </div>
        <span className="px-1 pb-1 text-sm font-medium">{pasta.name}</span>
      </Card>
    </motion.button>
  )
}
export function SauceOption({
  sauce,
  selected,
  onClick,
}: {
  sauce: Sauce
  selected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      initial={false}
      animate="rest"
      whileHover="buoyant"
      whileFocus="buoyant"
      whileTap="pressed"
      className="rounded-2xl text-left outline-none focus-visible:ring-3 focus-visible:ring-ring"
    >
      <Card
        size="sm"
        className={cn(
          "rounded-2xl p-3 shadow-none ring-1 ring-border dark:ring-border",
          selected && "bg-primary/10 ring-2 ring-primary dark:ring-primary"
        )}
      >
        <div className="flex items-start gap-3">
          <div className="relative size-[76px] shrink-0 rounded-xl bg-muted/30">
            <SauceArtwork sauce={sauce} compact />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-start justify-between gap-1">
              <h3 className="text-sm font-semibold">{sauce.name}</h3>
              {selected && (
                <Check className="size-4 shrink-0 text-foreground" />
              )}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {sauce.description}
            </p>
            <SauceTags sauce={sauce} />
          </div>
        </div>
      </Card>
    </motion.button>
  )
}
