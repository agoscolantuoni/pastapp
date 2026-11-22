import { Clock3, Flame, Leaf } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { sauceTime, type Sauce } from "@/lib/catalog"

export function SauceTags({ sauce }: { sauce: Sauce }) {
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
