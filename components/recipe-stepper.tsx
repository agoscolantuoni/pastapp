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
      <ol className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3">
        {steps.map(({ label, icon: Icon }, index) => {
          const step = index + 1
          const completed = step < currentStep
          const current = step === currentStep
          return (
            <li
              key={label}
              aria-current={current ? "step" : undefined}
              className="relative flex min-w-0 flex-col items-center gap-2 sm:flex-1 sm:flex-row sm:gap-3 sm:last:flex-none"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
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
                  "text-center text-xs leading-4 sm:text-left sm:text-sm",
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
                    "absolute top-4 left-[calc(50%+1.25rem)] h-0.5 w-[calc(100%-2rem)] rounded-full transition-colors sm:static sm:w-auto sm:flex-1",
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
