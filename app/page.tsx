import { PastaApp } from "@/components/pasta-app"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pastapp — Find your pasta pairing",
  description: "Match pasta and sauces, then cook a simple, tasty meal.",
}

export default function Page() {
  return <PastaApp />
}
