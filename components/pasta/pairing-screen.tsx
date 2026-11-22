import { useState } from "react"
import { motion } from "motion/react"
import { hasPastaArtwork, PastaArtwork } from "@/components/pasta-artwork"
import { SauceArtwork } from "@/components/sauce-artwork"
import { HomeScreen } from "@/components/pasta/home-screen"
import { Actions } from "@/components/pasta/screen-actions"
import { PastaOption, SauceOption } from "@/components/pasta/selection-options"
import { SauceTags } from "@/components/pasta/sauce-tags"
import { navigate } from "@/components/pasta/navigation"
import { cn } from "@/lib/utils"
import { pastas, sauces, type Pasta, type Sauce } from "@/lib/catalog"

export function PairingScreen({
  kind,
  pasta,
  sauce,
  selectedMatch,
}: {
  kind: "pasta" | "sauce"
  pasta?: Pasta
  sauce?: Sauce
  selectedMatch?: string
}) {
  const [selection, setSelection] = useState<string | undefined>(selectedMatch)
  const item = kind === "pasta" ? pasta : sauce
  if (!item) return <HomeScreen />
  const showPastaArtwork =
    kind === "pasta" && pasta && hasPastaArtwork(pasta.id)
  const showArtwork = showPastaArtwork || (kind === "sauce" && !!sauce)
  // Show every supplied pairing in either selection direction.
  const matches =
    kind === "pasta"
      ? sauces.filter((s) => pasta?.sauceIds.includes(s.id))
      : sauce!.pastaIds.map((id) => pastas.find((p) => p.id === id)!)
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex flex-col gap-6 px-5 py-6">
          <div className="flex items-start gap-3 sm:gap-5">
            <motion.div
              className={cn(
                "relative flex aspect-square w-[45%] max-w-[157px] shrink-0 justify-center rounded-2xl bg-muted/30",
                showArtwork ? "overflow-visible" : "overflow-hidden"
              )}
              initial={false}
              animate="rest"
              whileHover={showArtwork ? "buoyant" : undefined}
            >
              {kind === "pasta" && pasta && hasPastaArtwork(pasta.id) ? (
                <PastaArtwork id={pasta.id} />
              ) : kind === "sauce" && sauce ? (
                <SauceArtwork sauce={sauce} />
              ) : null}
            </motion.div>
            <div className="min-w-0 space-y-2">
              <p className="text-xs text-muted-foreground">Your {kind}</p>
              <h1 className="text-xl font-semibold tracking-tight">
                {item.name}
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {kind === "sauce" && sauce && <SauceTags sauce={sauce} />}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {kind === "pasta"
                ? "Sauces that go together"
                : "Find its pasta match"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Three good matches. Pick your favorite.
            </p>
          </div>
          {kind === "pasta" ? (
            <div className="flex flex-col gap-3">
              {(matches as Sauce[]).map((s) => (
                <SauceOption
                  key={s.id}
                  sauce={s}
                  selected={selection === s.id}
                  onClick={() => setSelection(s.id)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {(matches as Pasta[]).map((p) => (
                <PastaOption
                  key={p.id}
                  previewArtwork
                  pasta={p}
                  selected={selection === p.id}
                  onClick={() => setSelection(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Actions
        back={() =>
          navigate(kind === "pasta" ? "pasta-list" : "sauce-list", {
            [kind]: item.id,
          })
        }
        disabled={!selection}
        select={() => {
          if (selection)
            navigate("result", {
              pasta: kind === "pasta" ? item.id : selection,
              sauce: kind === "sauce" ? item.id : selection,
              from: kind,
            })
        }}
      />
    </div>
  )
}
