import { PastaApp } from "@/components/pasta-app"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pastapp — Find your pasta pairing",
  description: "Match pasta and sauces, then cook a simple, tasty meal.",
  openGraph: {
    type: "website",
    siteName: "Pastapp",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function Page() {
  return <PastaApp />
}
