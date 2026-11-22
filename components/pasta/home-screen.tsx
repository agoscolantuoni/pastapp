import { Shuffle, Soup, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSticker } from "@/components/hero-sticker"
import { PastaPhysics } from "@/components/pasta-physics"
import { navigate, surprise } from "@/components/pasta/navigation"

export function HomeScreen() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-5 pt-5 pb-8">
      <div className="relative flex h-60 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-primary">
        <PastaPhysics />
        <HeroSticker />
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
