// Sample catalog for review. All quantities serve two people.
export const pastaCategories = [
  "Short pasta",
  "Long pasta",
  "Filled pasta",
] as const
export const sauceCategories = [
  "Tomato base",
  "Cream & cheese",
  "Fresh & cold",
] as const
export type Pasta = {
  id: string
  name: string
  category: (typeof pastaCategories)[number]
  description: string
  sauceIds: string[]
}
export type Ingredient = { name: string; quantity: string }
export type Sauce = {
  id: string
  name: string
  category: (typeof sauceCategories)[number]
  description: string
  minutes: number
  vegetarian: boolean
  spicy: boolean
  ingredients: Ingredient[]
  steps: string[]
}
export const pastas: Pasta[] = [
  {
    id: "penne",
    name: "Penne",
    category: "Short pasta",
    description:
      "The ridges and hollow centers catch thick sauces, giving you plenty of flavor in every bite.",
    sauceIds: ["tomato-basil", "spicy-tomato", "fresh-tomato"],
  },
  {
    id: "fusilli",
    name: "Fusilli",
    category: "Short pasta",
    description:
      "Little spirals hold chopped ingredients and fresh sauces between their twists.",
    sauceIds: ["pesto", "fresh-tomato", "lemon-ricotta"],
  },
  {
    id: "rigatoni",
    name: "Rigatoni",
    category: "Short pasta",
    description:
      "Big ridged tubes are a great home for rich sauces and chunky vegetables.",
    sauceIds: ["spicy-tomato", "mushroom-cream", "fresh-tomato"],
  },
  {
    id: "spaghetti",
    name: "Spaghetti",
    category: "Long pasta",
    description:
      "Thin strands work beautifully with smooth sauces that lightly coat their whole length.",
    sauceIds: ["tomato-basil", "spicy-tomato", "pesto"],
  },
  {
    id: "linguine",
    name: "Linguine",
    category: "Long pasta",
    description:
      "Slightly flat strands give creamy and herb sauces more surface to cling to.",
    sauceIds: ["pesto", "lemon-ricotta", "mushroom-cream"],
  },
  {
    id: "tagliatelle",
    name: "Tagliatelle",
    category: "Long pasta",
    description:
      "Wide ribbons are perfect for silky cream sauces and tender mushrooms.",
    sauceIds: ["mushroom-cream", "tomato-basil", "lemon-ricotta"],
  },
  {
    id: "ravioli",
    name: "Ravioli",
    category: "Filled pasta",
    description:
      "Use ricotta and spinach ravioli for this sample. Gentle sauces let the filling shine.",
    sauceIds: ["tomato-basil", "lemon-ricotta", "mushroom-cream"],
  },
  {
    id: "tortellini",
    name: "Tortellini",
    category: "Filled pasta",
    description:
      "Use cheese-filled tortellini. Their little folds pick up smooth, creamy sauces.",
    sauceIds: ["mushroom-cream", "tomato-basil", "lemon-ricotta"],
  },
  {
    id: "cappelletti",
    name: "Cappelletti",
    category: "Filled pasta",
    description:
      "Choose cheese-filled cappelletti. A light sauce keeps the delicate filling in balance.",
    sauceIds: ["lemon-ricotta", "mushroom-cream", "tomato-basil"],
  },
]
export const sauces: Sauce[] = [
  {
    id: "tomato-basil",
    name: "Tomato & basil",
    category: "Tomato base",
    minutes: 20,
    vegetarian: true,
    spicy: false,
    description:
      "A comforting tomato sauce with fresh basil and a little garlic.",
    ingredients: [
      { name: "Chopped tomatoes", quantity: "400 g" },
      { name: "Garlic", quantity: "1 clove" },
      { name: "Basil", quantity: "6 leaves" },
      { name: "Olive oil", quantity: "1 tbsp" },
    ],
    steps: [
      "Warm the oil over medium-low heat. Add chopped garlic and stir for 30 seconds without browning it.",
      "Add the tomatoes and a pinch of salt. Simmer gently for 15 minutes, stirring occasionally.",
      "Tear in the basil. Add the cooked pasta and a splash of reserved pasta water, then toss gently until coated.",
    ],
  },
  {
    id: "spicy-tomato",
    name: "Spicy tomato",
    category: "Tomato base",
    minutes: 20,
    vegetarian: true,
    spicy: true,
    description:
      "Tomato, garlic, and chili: a bold sauce with an adjustable kick.",
    ingredients: [
      { name: "Chopped tomatoes", quantity: "400 g" },
      { name: "Garlic", quantity: "1 clove" },
      { name: "Chili flakes", quantity: "¼ tsp" },
      { name: "Olive oil", quantity: "1 tbsp" },
    ],
    steps: [
      "Warm the oil over medium-low heat. Add chopped garlic and chili flakes; stir for 30 seconds.",
      "Add the tomatoes and a pinch of salt. Simmer for 15 minutes. Taste and add more chili if you like.",
      "Add the cooked pasta with a splash of pasta water and toss until coated evenly.",
    ],
  },
  {
    id: "mushroom-cream",
    name: "Creamy mushroom",
    category: "Cream & cheese",
    minutes: 25,
    vegetarian: true,
    spicy: false,
    description:
      "Golden mushrooms and a silky cream sauce for a cozy, easy meal.",
    ingredients: [
      { name: "Mushrooms", quantity: "200 g" },
      { name: "Cream", quantity: "100 ml" },
      { name: "Garlic", quantity: "1 clove" },
      { name: "Olive oil", quantity: "1 tbsp" },
    ],
    steps: [
      "Slice the mushrooms. Heat the oil over medium heat and cook the mushrooms for 8–10 minutes until golden.",
      "Add chopped garlic and cook for 30 seconds. Stir in the cream, season with salt and pepper, and simmer for 3 minutes.",
      "Add the cooked pasta. Loosen with reserved pasta water as needed and toss gently before serving.",
    ],
  },
  {
    id: "lemon-ricotta",
    name: "Lemon & ricotta",
    category: "Cream & cheese",
    minutes: 15,
    vegetarian: true,
    spicy: false,
    description:
      "A soft, creamy sauce brightened with lemon. Mix it off the heat.",
    ingredients: [
      { name: "Ricotta", quantity: "150 g" },
      { name: "Lemon", quantity: "½ lemon" },
      { name: "Olive oil", quantity: "1 tbsp" },
      { name: "Black pepper", quantity: "To taste" },
    ],
    steps: [
      "In a large bowl, mix ricotta, oil, finely grated lemon zest, and 1 teaspoon of lemon juice.",
      "Stir in a few tablespoons of hot pasta water until smooth. Season with salt and pepper.",
      "Add the cooked pasta and toss gently off the heat. Add more pasta water if the sauce is too thick.",
    ],
  },
  {
    id: "pesto",
    name: "Basil pesto",
    category: "Fresh & cold",
    minutes: 15,
    vegetarian: true,
    spicy: false,
    description:
      "Fresh basil, nuts, and olive oil make a fragrant sauce with no cooking needed.",
    ingredients: [
      { name: "Basil", quantity: "30 g" },
      { name: "Pine nuts", quantity: "20 g" },
      { name: "Vegetarian hard cheese", quantity: "30 g" },
      { name: "Olive oil", quantity: "3 tbsp" },
      { name: "Garlic", quantity: "½ clove" },
    ],
    steps: [
      "Blend basil, pine nuts, garlic, grated vegetarian hard cheese, and oil into a paste.",
      "Put the pesto in a large bowl and loosen with 2 tablespoons of warm pasta water. Taste and season with salt.",
      "Toss with the cooked pasta off the heat. Add more pasta water if needed; do not boil the pesto.",
    ],
  },
  {
    id: "fresh-tomato",
    name: "Fresh tomato & mozzarella",
    category: "Fresh & cold",
    minutes: 15,
    vegetarian: true,
    spicy: false,
    description:
      "Cherry tomatoes, mozzarella, and basil for a fresh, warm-weather bowl.",
    ingredients: [
      { name: "Cherry tomatoes", quantity: "200 g" },
      { name: "Mozzarella", quantity: "125 g" },
      { name: "Basil", quantity: "6 leaves" },
      { name: "Olive oil", quantity: "1 tbsp" },
    ],
    steps: [
      "Halve the tomatoes and dice the mozzarella. Combine with torn basil and oil in a large bowl; season with salt and pepper.",
      "Drain the pasta and spread on a plate for a few minutes until warm rather than steaming hot.",
      "Gently toss the pasta with the tomato mixture and serve. The sauce stays fresh and uncooked.",
    ],
  },
]
export const pairings = pastas.flatMap((pasta) =>
  pasta.sauceIds.map((sauceId) => ({ pastaId: pasta.id, sauceId }))
)
export function recipeIngredients(pasta: Pasta, sauce: Sauce): Ingredient[] {
  return [
    {
      name: pasta.name,
      quantity: pasta.category === "Filled pasta" ? "250 g" : "180 g",
    },
    ...sauce.ingredients,
    { name: "Salt", quantity: "For the pasta water" },
  ]
}
export function recipeSteps(pasta: Pasta, sauce: Sauce): string[] {
  return [
    `Bring a large pot of water to a boil and salt it. Cook the ${pasta.name} following the package timing. Reserve a mug of pasta water before draining. Prepare the sauce while the water heats and the pasta cooks.`,
    ...sauce.steps,
  ]
}
