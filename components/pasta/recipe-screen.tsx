import { useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Clock3,
  Download,
  LoaderCircle,
  Shuffle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PairingHero } from "@/components/pairing-hero"
import { BrandLogo } from "@/components/brand-logo"
import {
  hasPastaArtwork,
  PastaIngredientImage,
} from "@/components/pasta-artwork"
import { SauceTags } from "@/components/pasta/sauce-tags"
import { navigate, surprise } from "@/components/pasta/navigation"
import { getIngredientArtwork } from "@/lib/ingredient-artwork"
import {
  recipeIngredients,
  recipeSteps,
  sauceTime,
  type Pasta,
  type Sauce,
} from "@/lib/catalog"

export function RecipeScreen({
  pasta,
  sauce,
  from,
}: {
  pasta: Pasta
  sauce: Sauce
  from: string
}) {
  const recipeRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const ingredients = recipeIngredients(pasta, sauce)
  const steps = recipeSteps(pasta, sauce)
  async function download() {
    if (!recipeRef.current) return
    setSaving(true)
    setMessage("")
    try {
      const { toPng } = await import("html-to-image")
      const image = await toPng(recipeRef.current, {
        pixelRatio: 2,
        backgroundColor: getComputedStyle(recipeRef.current).backgroundColor,
        cacheBust: true,
      })
      const link = document.createElement("a")
      link.download = `pastapp-${pasta.id}-${sauce.id}.png`
      link.href = image
      link.click()
      setMessage("Your recipe image is ready.")
    } catch {
      setMessage("The image could not be saved. Please try again.")
    } finally {
      setSaving(false)
    }
  }
  function back() {
    if (from === "pasta")
      navigate("pasta-result", { pasta: pasta.id, sauce: sauce.id })
    else if (from === "sauce")
      navigate("sauce-result", { pasta: pasta.id, sauce: sauce.id })
    else navigate("home")
  }
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div ref={recipeRef} className="space-y-6 bg-background px-5 pt-4 pb-6">
          <div className="-mx-5">
            <PairingHero pasta={pasta} sauce={sauce} />
          </div>
          <Separator />
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Ingredients</h2>
              <SauceTags sauce={sauce} />
            </div>
            <p className="text-xs text-muted-foreground">For 2 people</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {ingredients.map((i, index) => {
                const artwork =
                  index > 0
                    ? getIngredientArtwork(i.name, sauce.category)
                    : undefined
                return (
                  <Card
                    key={i.name}
                    size="sm"
                    className="rounded-2xl py-3 shadow-none ring-1 ring-border"
                  >
                    <CardContent className="flex flex-col items-center gap-2 px-2 text-center">
                      {index === 0 && hasPastaArtwork(pasta.id) ? (
                        <PastaIngredientImage id={pasta.id} />
                      ) : artwork ? (
                        <Image
                          src={artwork.src}
                          alt=""
                          width={artwork.width}
                          height={artwork.height}
                          sizes="53px"
                          className="size-[53px] object-contain"
                        />
                      ) : null}
                      <span className="text-xs font-medium">{i.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {i.quantity}
                      </span>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
          <Separator />
          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Let’s make it</h2>
              <Badge variant="secondary">
                <Clock3 />
                {sauceTime(sauce)}
              </Badge>
            </div>
            <ol className="space-y-5">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>
          <p className="flex flex-wrap items-center justify-center gap-1 pt-2 text-center text-xs text-muted-foreground">
            <BrandLogo className="w-20" />
            <span>· A good match. A better meal.</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 px-5 pb-6">
          <Button variant="link" onClick={() => navigate("home")}>
            Start a new pairing
          </Button>
          {from === "surprise" && (
            <Button variant="link" onClick={surprise}>
              <Shuffle />
              Try another
            </Button>
          )}
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-3 border-t bg-background px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button variant="outline" className="h-12" onClick={back}>
          <ArrowLeft />
          Go back
        </Button>
        <Button className="h-12" disabled={saving} onClick={download}>
          {saving ? <LoaderCircle className="animate-spin" /> : <Download />}
          <span>{saving ? "Saving…" : "Save recipe"}</span>
        </Button>
        <p
          role="status"
          className={
            message
              ? "col-span-2 text-center text-xs text-muted-foreground"
              : "sr-only"
          }
        >
          {message}
        </p>
      </div>
    </div>
  )
}
