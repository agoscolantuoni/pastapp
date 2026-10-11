import { Check, CookingPot, Soup, Utensils } from "lucide-react"
import { cn } from "@/lib/utils"

type RecipeStepperProps = {
  first: "pasta" | "sauce"
  currentStep: 1 | 2 | 3
}

export function RecipeStepper({ first, currentStep }: RecipeStepperProps) {
  const pastaStep = { label: "Pasta", icon: Utensils }
  const sauceStep = { label: "Sauce", icon: Soup }
  const steps = [
    ...(first === "pasta" ? [pastaStep, sauceStep] : [sauceStep, pastaStep]),
    { label: "Make it", icon: CookingPot },
  ]

  return (
    <nav aria-label="Recipe progress">
      <p className="sr-only" role="status">
        Step {currentStep} of {steps.length}: {steps[currentStep - 1].label}
      </p>
      <ol className="flex items-center gap-2 sm:gap-3">
        {steps.map(({ label, icon: Icon }, index) => {
          const step = index + 1
          const completed = step < currentStep
          const current = step === currentStep
          return (
            <li
              key={label}
              aria-current={current ? "step" : undefined}
              className="flex min-w-0 flex-1 items-center gap-1.5 last:flex-none sm:gap-3"
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full transition-colors sm:size-8",
                  completed || current
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {completed ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  <Icon aria-hidden="true" className="size-4" />
                )}
              </span>
              <span
                className={cn(
                  "shrink-0 text-xs leading-4 whitespace-nowrap sm:text-sm",
                  completed || current
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {label}
                <span className="sr-only">
                  {completed
                    ? ", completed"
                    : current
                      ? ", current step"
                      : ", upcoming"}
                </span>
              </span>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 min-w-1 flex-1 rounded-full transition-colors",
                    completed ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
