import { pairings } from "@/lib/catalog"

export type Screen =
  | "home"
  | "pasta-list"
  | "pasta-result"
  | "sauce-list"
  | "sauce-result"
  | "result"
export const screens: Screen[] = [
  "home",
  "pasta-list",
  "pasta-result",
  "sauce-list",
  "sauce-result",
  "result",
]
export function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback)
  return () => window.removeEventListener("hashchange", callback)
}
export function navigate(screen: Screen, params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString()
  window.location.hash = screen + (query ? `?${query}` : "")
}

export function surprise() {
  const pairing = pairings[Math.floor(Math.random() * pairings.length)]
  navigate("result", {
    pasta: pairing.pastaId,
    sauce: pairing.sauceId,
    from: "surprise",
  })
}
