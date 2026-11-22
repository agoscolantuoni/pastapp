import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Actions } from "@/components/pasta/screen-actions"
import { PastaOption, SauceOption } from "@/components/pasta/selection-options"
import { navigate } from "@/components/pasta/navigation"
import { pastas, sauces, pastaCategories, sauceCategories } from "@/lib/catalog"

export function ListScreen({
  kind,
  selectedId,
}: {
  kind: "pasta" | "sauce"
  selectedId?: string
}) {
  const categories = kind === "pasta" ? pastaCategories : sauceCategories
  const initial =
    kind === "pasta"
      ? pastas.find((p) => p.id === selectedId)
      : sauces.find((s) => s.id === selectedId)
  const [category, setCategory] = useState<string>(
    initial?.category ?? categories[0]
  )
  const [selection, setSelection] = useState<string | undefined>(selectedId)
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex flex-col gap-6 px-5 py-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Pick your {kind}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {kind === "pasta"
                ? "What do you have in your cupboard?"
                : "What are you in the mood for?"}
            </p>
          </div>
          <Tabs
            value={category}
            onValueChange={(value) => {
              setCategory(String(value))
              setSelection(undefined)
            }}
            className="gap-5"
          >
            <div className="overflow-x-auto pb-1">
              <TabsList className="min-w-max">
                {categories.map((c) => (
                  <TabsTrigger
                    key={c}
                    value={c}
                    className="px-3 text-xs sm:text-sm"
                  >
                    {c}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {categories.map((c) => (
              <TabsContent value={c} key={c}>
                {kind === "pasta" ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {pastas
                      .filter((p) => p.category === c)
                      .map((p) => (
                        <PastaOption
                          key={p.id}
                          previewArtwork
                          pasta={p}
                          selected={selection === p.id}
                          onClick={() => setSelection(p.id)}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {sauces
                      .filter((s) => s.category === c)
                      .map((s) => (
                        <SauceOption
                          key={s.id}
                          sauce={s}
                          selected={selection === s.id}
                          onClick={() => setSelection(s.id)}
                        />
                      ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
          <p
            className="text-center text-xs text-muted-foreground"
            aria-live="polite"
          >
            {selection
              ? `${(kind === "pasta" ? pastas : sauces).find((item) => item.id === selection)?.name} selected`
              : `Pick a ${kind} to continue`}
          </p>
        </div>
      </div>
      <Actions
        back={() => navigate("home")}
        disabled={!selection}
        select={() => {
          if (selection)
            navigate(kind === "pasta" ? "pasta-result" : "sauce-result", {
              [kind]: selection,
            })
        }}
      />
    </div>
  )
}
