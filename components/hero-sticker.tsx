import Image from "next/image"

/** Original Figma sticker artwork with the app's font for the tagline. */
export function HeroSticker() {
  return (
    <div className="pointer-events-none relative z-10 aspect-[748/360] w-[272px] max-w-[calc(100%-3rem)] shrink-0 -rotate-1">
      <div className="absolute top-[7.78%] left-[4%] aspect-[688.307/304] w-[92.02%]">
        <Image src="/brand/hero-sticker.svg" alt="" fill unoptimized />
        <h1 className="absolute top-[23.68%] left-[14.69%] w-[73.08%]">
          <Image
            src="/brand/hero-logo.svg"
            alt="Pastapp"
            width={503}
            height={109}
            unoptimized
            className="h-auto w-full"
          />
        </h1>
        <p className="absolute inset-x-[10%] top-[62.17%] text-center font-sans text-[11px] leading-snug text-black">
          A good match. A better meal.
        </p>
      </div>
    </div>
  )
}
