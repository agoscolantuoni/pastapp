"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChefHat,
  Clock3,
  Download,
  Flame,
  Home,
  Leaf,
  LoaderCircle,
  Moon,
  Shuffle,
  Soup,
  Sun,
  Utensils,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecipeStepper } from "@/components/recipe-stepper"
import { PastaPhysics } from "@/components/pasta-physics"
import {
  hasPastaArtwork,
  PastaArtwork,
  PastaIngredientImage,
} from "@/components/pasta-artwork"
import { cn } from "@/lib/utils"
import { getIngredientArtwork } from "@/lib/ingredient-artwork"
import {
  pastas,
  sauces,
  pairings,
  pastaCategories,
  sauceCategories,
  recipeIngredients,
  recipeSteps,
  sauceTime,
  type Pasta,
  type Sauce,
} from "@/lib/catalog"

type Screen =
  | "loading"
  | "home"
  | "pasta-list"
  | "pasta-result"
  | "sauce-list"
  | "sauce-result"
  | "result"
const screens: Screen[] = [
  "loading",
  "home",
  "pasta-list",
  "pasta-result",
  "sauce-list",
  "sauce-result",
  "result",
]
function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback)
  return () => window.removeEventListener("hashchange", callback)
}
function navigate(screen: Screen, params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString()
  window.location.hash = screen + (query ? `?${query}` : "")
}

// The wireframe artwork is deliberately retained until the image direction is decided.
function WireImage({
  kind,
  className,
}: {
  kind: "home" | "pasta" | "sauce" | "selection" | "dish" | "ingredient"
  className?: string
}) {
  const dimensions = {
    home: [350, 240],
    pasta: [110, 110],
    sauce: [76, 76],
    selection: [157, 157],
    dish: [299, 299],
    ingredient: [53, 53],
  }[kind]
  // These small local SVGs are wireframe placeholders, not optimized photographs.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/wireframe/${kind}.svg`}
      alt=""
      width={dimensions[0]}
      height={dimensions[1]}
      className={cn("object-contain dark:invert", className)}
    />
  )
}
function SauceTags({ sauce }: { sauce: Sauce }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <Badge variant="secondary">{sauce.category}</Badge>
      <Badge variant="secondary">
        <Clock3 />
        {sauceTime(sauce)}
      </Badge>
      {sauce.vegetarian && !sauce.plantBased && (
        <Badge variant="outline">
          <Leaf />
          Veggie
        </Badge>
      )}
      {sauce.plantBased && (
        <Badge variant="outline">
          <Leaf />
          Plant-based
        </Badge>
      )}
      {sauce.spicy && (
        <Badge variant="outline">
          <Flame />
          {sauce.spiceLabel ?? "Spicy"}
        </Badge>
      )}
      {sauce.peppery && (
        <Badge variant="outline">
          <Flame />
          Peppery
        </Badge>
      )}
    </div>
  )
}
function Actions({
  back,
  select,
  disabled,
}: {
  back: () => void
  select: () => void
  disabled: boolean
}) {
  return (
    <div className="grid shrink-0 grid-cols-2 gap-3 border-t bg-background px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <Button variant="outline" className="h-12" onClick={back}>
        <ArrowLeft />
        Go back
      </Button>
      <Button className="h-12" disabled={disabled} onClick={select}>
        Next
        <ArrowRight />
      </Button>
    </div>
  )
}
function PastaOption({
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
          {previewArtwork && hasPastaArtwork(pasta.id) ? (
            <PastaArtwork id={pasta.id} />
          ) : (
            <WireImage kind="pasta" className="max-w-full" />
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
function SauceOption({
  sauce,
  selected,
  onClick,
}: {
  sauce: Sauce
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
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
          <WireImage kind="sauce" className="shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-start justify-between gap-1">
              <h3 className="text-sm font-semibold">{sauce.name}</h3>
              {selected && (
                <Check className="size-4 shrink-0 text-primary-foreground" />
              )}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {sauce.description}
            </p>
            <SauceTags sauce={sauce} />
          </div>
        </div>
      </Card>
    </button>
  )
}

function ListScreen({
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
function PairingScreen({
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
                showPastaArtwork ? "overflow-visible" : "overflow-hidden"
              )}
              initial={false}
              animate="rest"
              whileHover={showPastaArtwork ? "buoyant" : undefined}
            >
              {kind === "pasta" && pasta && hasPastaArtwork(pasta.id) ? (
                <PastaArtwork id={pasta.id} />
              ) : (
                <WireImage kind="selection" className="max-w-full" />
              )}
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
function surprise() {
  const pairing = pairings[Math.floor(Math.random() * pairings.length)]
  navigate("result", {
    pasta: pairing.pastaId,
    sauce: pairing.sauceId,
    from: "surprise",
  })
}
function HomeScreen() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-5 pt-5 pb-8">
      <div className="relative flex h-60 items-center justify-center overflow-hidden rounded-3xl bg-primary/15">
        <PastaPhysics />
        <div className="relative z-10 space-y-2 text-center">
          <ChefHat className="mx-auto size-9" />
          <h1 className="text-4xl font-semibold tracking-tight">pastapp</h1>
          <p className="text-sm text-muted-foreground">
            A good match. A better meal.
          </p>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold">What are we cooking?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start with what you have. We’ll find its match.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 rounded-2xl"
          onClick={() => navigate("pasta-list")}
        >
          <Utensils className="size-5" />
          Pick a pasta
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col gap-2 rounded-2xl"
          onClick={() => navigate("sauce-list")}
        >
          <Soup className="size-5" />
          Pick a sauce
        </Button>
      </div>
      <Button className="h-12" onClick={surprise}>
        <Shuffle />
        Surprise me!
      </Button>
      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Simple ingredients. Easy steps.
        <br />A little help making something tasty.
      </p>
    </div>
  )
}
function LoadingScreen() {
  useEffect(() => {
    const timer = window.setTimeout(() => navigate("home"), 1600)
    return () => window.clearTimeout(timer)
  }, [])
  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-5 overflow-hidden bg-primary/10 px-6">
      <PastaPhysics />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="/wireframe/splash.svg"
        width="390"
        height="840"
        className="pointer-events-none absolute z-0 opacity-10 dark:invert"
      />
      <ChefHat className="relative z-10 size-12" />
      <h1 className="relative z-10 text-4xl font-semibold tracking-tight">
        pastapp
      </h1>
      <p className="relative z-10 text-sm text-muted-foreground">
        Something tasty starts here.
      </p>
      <Button
        className="relative z-10 mt-4 h-12 px-8"
        onClick={() => navigate("home")}
      >
        Start
        <ArrowRight />
      </Button>
    </div>
  )
}
function RecipeScreen({
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
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <Button variant="ghost" onClick={back}>
          <ArrowLeft />
          Go back
        </Button>
        {from === "surprise" && (
          <Button variant="ghost" onClick={surprise}>
            <Shuffle />
            Try another
          </Button>
        )}
      </div>
      <div ref={recipeRef} className="space-y-6 bg-background px-5 pt-4 pb-6">
        <div className="text-center">
          <div className="mx-auto flex h-52 items-end justify-center overflow-hidden">
            <WireImage kind="dish" className="shrink-0" />
          </div>
          <p className="mt-5 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Your perfect pairing
          </p>
          <h1 className="mx-auto mt-2 max-w-sm text-2xl font-semibold tracking-tight">
            {pasta.name} + {sauce.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {sauce.description}
          </p>
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
                    ) : (
                      <WireImage kind="ingredient" />
                    )}
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
        <p className="pt-2 text-center text-xs text-muted-foreground">
          pastapp · A good match. A better meal.
        </p>
      </div>
      <div className="space-y-3 border-t px-5 py-5">
        <Button className="h-12 w-full" disabled={saving} onClick={download}>
          {saving ? <LoaderCircle className="animate-spin" /> : <Download />}
          {saving ? "Saving recipe…" : "Save recipe as image"}
        </Button>
        <Button
          variant="outline"
          className="h-12 w-full"
          onClick={() => navigate("home")}
        >
          <Home />
          Start a new pairing
        </Button>
        <p role="status" className="text-center text-xs text-muted-foreground">
          {message}
        </p>
      </div>
    </div>
  )
}
export function PastaApp() {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => ""
  )
  const [name, query = ""] = hash.replace(/^#/, "").split("?")
  const screen: Screen = screens.includes(name as Screen)
    ? (name as Screen)
    : hash
      ? "home"
      : "loading"
  const params = new URLSearchParams(query)
  const pasta = pastas.find((p) => p.id === params.get("pasta"))
  const sauce = sauces.find((s) => s.id === params.get("sauce"))
  const from = params.get("from") ?? "surprise"
  const progress: { first: "pasta" | "sauce"; currentStep: 1 | 2 | 3 } | null =
    screen === "pasta-list" || screen === "sauce-list"
      ? { first: screen === "pasta-list" ? "pasta" : "sauce", currentStep: 1 }
      : screen === "pasta-result" && pasta
        ? { first: "pasta", currentStep: 2 }
        : screen === "sauce-result" && sauce
          ? { first: "sauce", currentStep: 2 }
          : screen === "result" &&
              pasta &&
              sauce &&
              pasta.sauceIds.includes(sauce.id) &&
              (from === "pasta" || from === "sauce")
            ? { first: from, currentStep: 3 }
            : null
  const { resolvedTheme, setTheme } = useTheme()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [hash])
  return (
    <main className="h-dvh overflow-hidden bg-(--app-surround) [--app-surround:color-mix(in_oklab,var(--muted)_40%,var(--background))] sm:py-6">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[700px] flex-col overflow-hidden bg-background sm:rounded-3xl sm:border sm:shadow-sm">
        {screen !== "loading" && (
          <div className="z-10 shrink-0 bg-background">
            <div className="bg-background">
              <header className="flex h-14 shrink-0 items-center justify-between border-b px-5">
                <Button
                  variant="ghost"
                  className="gap-2 px-0 text-base font-semibold"
                  onClick={() => navigate("home")}
                  aria-label="Pastapp home"
                >
                  <ChefHat className="size-5" />
                  pastapp
                </Button>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Go to home"
                    onClick={() => navigate("home")}
                  >
                    <Home />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle color theme"
                    onClick={() =>
                      setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                  >
                    <Sun className="dark:hidden" />
                    <Moon className="hidden dark:block" />
                  </Button>
                </div>
              </header>
              {progress && (
                <div className="border-b px-5 py-4">
                  <RecipeStepper {...progress} />
                </div>
              )}
            </div>
          </div>
        )}
        <div
          key={hash}
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            progress && progress.currentStep < 3
              ? "overflow-hidden"
              : "overflow-y-auto overscroll-contain"
          )}
        >
          {screen === "loading" && <LoadingScreen />}
          {screen === "home" && <HomeScreen />}
          {(screen === "pasta-list" || screen === "sauce-list") && (
            <ListScreen
              key={screen + query}
              kind={screen === "pasta-list" ? "pasta" : "sauce"}
              selectedId={
                params.get(screen === "pasta-list" ? "pasta" : "sauce") ??
                undefined
              }
            />
          )}
          {(screen === "pasta-result" || screen === "sauce-result") && (
            <PairingScreen
              key={screen + query}
              kind={screen === "pasta-result" ? "pasta" : "sauce"}
              pasta={pasta}
              sauce={sauce}
              selectedMatch={
                params.get(screen === "pasta-result" ? "sauce" : "pasta") ??
                undefined
              }
            />
          )}
          {screen === "result" &&
            (pasta && sauce && pasta.sauceIds.includes(sauce.id) ? (
              <RecipeScreen
                key={query}
                pasta={pasta}
                sauce={sauce}
                from={from}
              />
            ) : (
              <HomeScreen />
            ))}
        </div>
      </div>
    </main>
  )
}
