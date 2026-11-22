import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Actions({
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
