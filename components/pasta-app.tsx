"use client"

import { useEffect, useSyncExternalStore } from "react"
import { Home, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { RecipeStepper } from "@/components/recipe-stepper"
import { BrandLogo } from "@/components/brand-logo"
import { HomeScreen } from "@/components/pasta/home-screen"
import { ListScreen } from "@/components/pasta/list-screen"
import { PairingScreen } from "@/components/pasta/pairing-screen"
import { RecipeScreen } from "@/components/pasta/recipe-screen"
import {
  navigate,
  screens,
  subscribe,
  type Screen,
} from "@/components/pasta/navigation"
import { cn } from "@/lib/utils"
import { pastas, sauces } from "@/lib/catalog"

export function PastaApp() {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => ""
  )
  const [name, query = ""] = hash.replace(/^#/, "").split("?")
  const screen: Screen = screens.includes(name as Screen)
    ? (name as Screen)
    : "home"
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
        <div className="z-10 shrink-0 bg-background">
          <div className="bg-background">
            <header className="flex h-14 shrink-0 items-center justify-between border-b px-5">
              <Button
                variant="ghost"
                className="gap-2 px-0 text-base font-semibold hover:bg-transparent hover:text-muted-foreground active:scale-95 active:text-muted-foreground dark:hover:bg-transparent"
                onClick={() => navigate("home")}
                aria-label="Pastapp home"
              >
                <BrandLogo className="w-24" />
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
        <div
          key={hash}
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            screen === "result" || (progress && progress.currentStep < 3)
              ? "overflow-hidden"
              : "overflow-y-auto overscroll-contain"
          )}
        >
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
