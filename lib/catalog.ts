// Recipe quantities serve two people.
export const pastaCategories = [
  "Short pasta",
  "Long pasta",
  "Filled pasta",
] as const
export const sauceCategories = [
  "Tomato base",
  "Pesto",
  "Creamy",
  "Oil or butter base",
  "Cold & fresh",
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
  timeLabel?: string
  vegetarian: boolean
  plantBased: boolean
  spicy: boolean
  peppery?: boolean
  spiceLabel?: string
  ingredients: Ingredient[]
  steps: string[]
  pastaIds: string[]
}
const pastaShapes: Omit<Pasta, "sauceIds">[] = [
  {
    id: "penne",
    name: "Penne",
    category: "Short pasta",
    description:
      "The ridges and hollow centers catch thick sauces, giving you plenty of flavor in every bite.",
  },
  {
    id: "fusilli",
    name: "Fusilli",
    category: "Short pasta",
    description:
      "Little spirals hold chopped ingredients and fresh sauces between their twists.",
  },
  {
    id: "rigatoni",
    name: "Rigatoni",
    category: "Short pasta",
    description:
      "Big ridged tubes are a great home for rich sauces and chunky vegetables.",
  },
  {
    id: "spaghetti",
    name: "Spaghetti",
    category: "Long pasta",
    description:
      "Thin strands work beautifully with smooth sauces that lightly coat their whole length.",
  },
  {
    id: "linguine",
    name: "Linguine",
    category: "Long pasta",
    description:
      "Slightly flat strands give creamy and herb sauces more surface to cling to.",
  },
  {
    id: "bucatini",
    name: "Bucatini",
    category: "Long pasta",
    description:
      "Thick, hollow strands catch silky sauces inside and out for a hearty bite.",
  },
  {
    id: "ravioli",
    name: "Ravioli",
    category: "Filled pasta",
    description:
      "Use ricotta and spinach ravioli. Gentle sauces let the filling shine.",
  },
  {
    id: "tortellini",
    name: "Tortellini",
    category: "Filled pasta",
    description:
      "Use cheese-filled tortellini. Their little folds pick up smooth, creamy sauces.",
  },
  {
    id: "cappelletti",
    name: "Cappelletti",
    category: "Filled pasta",
    description:
      "Choose cheese-filled cappelletti. A light sauce keeps the delicate filling in balance.",
  },

  {
    id: "orecchiette",
    name: "Orecchiette",
    category: "Short pasta",
    description: "Small ear-shaped cups hold vegetables and chunky sauces.",
  },
  {
    id: "cavatelli",
    name: "Cavatelli",
    category: "Short pasta",
    description:
      "Small curved shells catch tomato sauces, pesto and vegetables.",
  },
  {
    id: "trofie",
    name: "Trofie",
    category: "Short pasta",
    description: "Short twisted strands hold pesto and light dressings.",
  },
  {
    id: "garganelli",
    name: "Garganelli",
    category: "Short pasta",
    description: "Ridged rolled tubes catch creamy sauces and hearty toppings.",
  },
  {
    id: "sedanini",
    name: "Sedanini",
    category: "Short pasta",
    description:
      "Small curved tubes hold tomato sauces and chopped ingredients.",
  },
]
export const sauces: Sauce[] = [
  {
    id: "pesto-genovese",
    name: "Basil pesto",
    category: "Pesto",
    minutes: 15,
    vegetarian: true,
    plantBased: false,
    spicy: false,
    description: "A fragrant basil pesto with pine nuts and Parmigiano.",
    ingredients: [
      {
        quantity: "30 g",
        name: "Fresh basil",
      },
      {
        quantity: "15 g",
        name: "Pine nuts",
      },
      {
        quantity: "20 g",
        name: "Parmigiano Reggiano",
      },
      {
        quantity: "10 g",
        name: "Pecorino",
      },
      {
        quantity: "½ small clove",
        name: "Garlic",
      },
      {
        quantity: "3 tbsp",
        name: "Extra virgin olive oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
    ],
    steps: [
      "Blend the pine nuts, garlic, cheeses and oil briefly, then add the basil and blend in short pulses.",
      "Transfer to a bowl and loosen with a little warm pasta water.",
      "Toss with cooked pasta off the heat; do not boil the pesto.",
    ],
    pastaIds: ["trofie", "linguine", "fusilli", "penne"],
  },
  {
    id: "carbonara",
    name: "Carbonara",
    category: "Creamy",
    minutes: 20,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description: "A silky egg and Pecorino coating with crisp guanciale.",
    ingredients: [
      {
        quantity: "80 g",
        name: "Guanciale",
      },
      {
        quantity: "2",
        name: "Egg yolks",
      },
      {
        quantity: "1",
        name: "Whole egg",
      },
      {
        quantity: "40 g",
        name: "Pecorino Romano",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Cut the guanciale into strips and cook in a dry pan over medium-low heat for 6–8 minutes, until golden.",
      "Whisk the eggs, grated Pecorino and pepper in a bowl.",
      "Toss cooked pasta with the guanciale and its fat. Remove the pan from the heat and let it stop sizzling before adding the egg mixture.",
      "Stir continuously, adding small splashes of pasta water until glossy. Avoid direct high heat, which scrambles the eggs.",
    ],
    pastaIds: ["spaghetti", "bucatini", "rigatoni", "penne"],
    peppery: true,
  },
  {
    id: "tomato-basil",
    name: "Tomato & basil",
    category: "Tomato base",
    minutes: 20,
    vegetarian: true,
    plantBased: true,
    spicy: false,
    description: "A simple tomato sauce with fresh basil and a little garlic.",
    ingredients: [
      {
        quantity: "300 g",
        name: "Passata",
      },
      {
        quantity: "1 clove",
        name: "Garlic",
      },
      {
        quantity: "6 leaves",
        name: "Basil",
      },
      {
        quantity: "1 tbsp",
        name: "Extra virgin olive oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
    ],
    steps: [
      "Warm the oil over medium-low heat. Add the lightly crushed garlic and cook for 30 seconds without browning.",
      "Add passata and salt; simmer gently for 15 minutes. Remove the garlic and add torn basil.",
      "Toss with cooked pasta and a splash of pasta water. Fold filled pasta through gently.",
    ],
    pastaIds: ["cavatelli", "cappelletti", "tortellini", "ravioli"],
  },
  {
    id: "tomato-shallot",
    name: "Tomato & shallot",
    category: "Tomato base",
    minutes: 25,
    vegetarian: true,
    plantBased: true,
    spicy: false,
    description: "A mellow tomato sauce with the gentle sweetness of shallot.",
    ingredients: [
      {
        quantity: "300 g",
        name: "Passata",
      },
      {
        quantity: "1 medium",
        name: "Shallot",
      },
      {
        quantity: "1 tbsp",
        name: "Extra virgin olive oil",
      },
      {
        quantity: "4 leaves",
        name: "Basil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
    ],
    steps: [
      "Finely chop the shallot and soften it in the oil over low heat for 5 minutes, adding a splash of water if it starts to brown.",
      "Add passata and salt; simmer for 15 minutes.",
      "Finish with basil and toss gently with cooked pasta.",
    ],
    pastaIds: ["bucatini", "cappelletti", "tortellini", "ravioli"],
  },
  {
    id: "alla-norma",
    name: "Alla Norma",
    category: "Tomato base",
    minutes: 35,
    vegetarian: true,
    plantBased: false,
    spicy: false,
    description: "Tomato, golden aubergine, basil and ricotta salata.",
    ingredients: [
      {
        quantity: "1 medium",
        name: "Aubergine",
      },
      {
        quantity: "300 g",
        name: "Passata",
      },
      {
        quantity: "1 clove",
        name: "Garlic",
      },
      {
        quantity: "40 g",
        name: "Ricotta salata",
      },
      {
        quantity: "6 leaves",
        name: "Basil",
      },
      {
        quantity: "1 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "As needed for shallow-frying",
        name: "Frying oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
    ],
    steps: [
      "Cut the aubergine into small cubes and pat dry. Shallow-fry in batches until golden and tender, then drain on kitchen paper.",
      "Meanwhile, warm the olive oil with the garlic, add passata and salt, and simmer for 15 minutes. Remove the garlic.",
      "Toss pasta with the tomato sauce and aubergine; finish with basil and grated ricotta salata.",
    ],
    pastaIds: ["rigatoni", "penne", "fusilli", "sedanini"],
  },
  {
    id: "saffron-ricotta-tomato-mint",
    name: "Saffron, ricotta, tomato & mint",
    category: "Creamy",
    minutes: 20,
    vegetarian: true,
    plantBased: false,
    spicy: false,
    description:
      "Creamy saffron ricotta with juicy tomatoes, mozzarella and a fresh mint finish.",
    ingredients: [
      {
        quantity: "120 g",
        name: "Ricotta",
      },
      {
        quantity: "60 g, well-drained",
        name: "Mozzarella",
      },
      {
        quantity: "150 g",
        name: "Cherry tomatoes",
      },
      {
        quantity: "0.1 g",
        name: "Saffron",
      },
      {
        quantity: "4 leaves",
        name: "Mint",
      },
      {
        quantity: "1 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
    ],
    steps: [
      "Steep the saffron in 2 tbsp hot water for 5 minutes. Halve the tomatoes and cook in the oil for 5–6 minutes.",
      "Mix ricotta, small mozzarella cubes, the saffron liquid and a little pasta water until combined.",
      "Remove the tomato pan from the heat, add pasta and the ricotta mixture, and toss.",
      "Fold in finely torn mint just before serving.",
    ],
    pastaIds: ["orecchiette", "cavatelli", "trofie", "fusilli"],
  },
  {
    id: "butter-sage",
    name: "Butter & sage",
    category: "Oil or butter base",
    minutes: 15,
    vegetarian: true,
    plantBased: false,
    spicy: false,
    description:
      "A delicate buttery dressing that lets filled pasta take the lead.",
    ingredients: [
      {
        quantity: "40 g",
        name: "Butter",
      },
      {
        quantity: "6 leaves",
        name: "Sage",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
      {
        quantity: "Optional, to taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Melt the butter over medium-low heat. Add sage and cook gently for 2–3 minutes until fragrant, without burning the butter.",
      "Add cooked pasta and a tablespoon of pasta water.",
      "Swirl or fold gently until coated; season to taste.",
    ],
    pastaIds: ["cappelletti", "tortellini", "ravioli", "garganelli"],
  },
  {
    id: "tomato-sausage-cream",
    name: "Tomato, sausage & cream",
    category: "Tomato base",
    minutes: 30,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description:
      "A rich sausage and tomato sauce softened with a little cream.",
    ingredients: [
      {
        quantity: "150 g",
        name: "Mild Italian sausage",
      },
      {
        quantity: "250 g",
        name: "Passata",
      },
      {
        quantity: "60 ml",
        name: "Cooking cream",
      },
      {
        quantity: "½ small",
        name: "Onion",
      },
      {
        quantity: "1 tsp",
        name: "Olive oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Remove the sausage casing. Soften the chopped onion in the oil for 4 minutes.",
      "Add crumbled sausage and cook for 7–8 minutes, until browned and cooked through.",
      "Add passata and simmer for 12 minutes.",
      "Stir in cream, heat gently for 2 minutes, then toss with pasta.",
    ],
    pastaIds: ["rigatoni", "penne", "garganelli", "sedanini"],
  },
  {
    id: "meat-ragu",
    name: "Slow-cooked meat ragù",
    category: "Tomato base",
    minutes: 150,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description:
      "A slow-cooked meat sauce for preparing ahead and reheating quickly.",
    ingredients: [
      {
        quantity: "200 g",
        name: "Minced beef",
      },
      {
        quantity: "50 g, finely chopped",
        name: "Pancetta",
      },
      {
        quantity: "½ small",
        name: "Onion",
      },
      {
        quantity: "½",
        name: "Carrot",
      },
      {
        quantity: "½ stalk",
        name: "Celery",
      },
      {
        quantity: "150 g",
        name: "Passata",
      },
      {
        quantity: "50 ml",
        name: "Dry white wine",
      },
      {
        quantity: "75 ml",
        name: "Milk",
      },
      {
        quantity: "Approximately 200 ml",
        name: "Unsalted stock",
      },
      {
        quantity: "1 tsp",
        name: "Olive oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Finely chop the vegetables. Cook the pancetta in the oil for 3 minutes; add the vegetables and soften for 8 minutes.",
      "Add beef and brown for about 8 minutes. Add wine and let it reduce.",
      "Stir in passata and a little stock; simmer very gently for around 2 hours, adding stock as needed.",
      "Stir in milk during the final 20 minutes and season. Fold through cooked pasta.",
    ],
    pastaIds: ["rigatoni", "cappelletti", "tortellini", "ravioli"],
    timeLabel: "About 2½ hours",
  },
  {
    id: "rocket-pesto",
    name: "Rocket, pine nut & Pecorino pesto",
    category: "Pesto",
    minutes: 15,
    vegetarian: true,
    plantBased: false,
    spicy: false,
    description: "A bold green pesto with rocket, pine nuts and Pecorino.",
    ingredients: [
      {
        quantity: "40 g",
        name: "Rocket",
      },
      {
        quantity: "20 g",
        name: "Pine nuts",
      },
      {
        quantity: "30 g",
        name: "Pecorino",
      },
      {
        quantity: "3 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "½ small clove",
        name: "Garlic",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
    ],
    steps: [
      "Blend rocket, pine nuts, cheese, oil and garlic in short pulses.",
      "Taste before adding salt. Loosen with a little warm pasta water and toss with cooked pasta off the heat.",
    ],
    pastaIds: ["fusilli", "trofie", "linguine", "cavatelli"],
    peppery: true,
  },
  {
    id: "tuna-tomato-ragu",
    name: "Tuna & tomato ragù",
    category: "Tomato base",
    minutes: 25,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description: "A chunky tomato sauce with tuna, parsley and capers.",
    ingredients: [
      {
        quantity: "140 g, drained",
        name: "Canned tuna",
      },
      {
        quantity: "250 g",
        name: "Chopped tomatoes",
      },
      {
        quantity: "½ small",
        name: "Onion",
      },
      {
        quantity: "1 tsp, rinsed",
        name: "Capers",
      },
      {
        quantity: "1 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "1 tbsp, chopped",
        name: "Parsley",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Soften the chopped onion in the oil for 5 minutes.",
      "Add tomatoes and capers; simmer for 12–15 minutes.",
      "Gently fold in flaked tuna and warm for 2 minutes.",
      "Toss with pasta and finish with parsley.",
    ],
    pastaIds: ["spaghetti", "bucatini", "linguine", "sedanini"],
  },
  {
    id: "salmon-cream",
    name: "Salmon & cream",
    category: "Creamy",
    minutes: 20,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description: "A creamy salmon sauce with shallot and a little lemon zest.",
    ingredients: [
      {
        quantity: "120 g",
        name: "Smoked salmon",
      },
      {
        quantity: "100 ml",
        name: "Cooking cream",
      },
      {
        quantity: "1 small",
        name: "Shallot",
      },
      {
        quantity: "10 g",
        name: "Butter",
      },
      {
        quantity: "¼ lemon, finely grated",
        name: "Lemon zest",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
      {
        quantity: "If needed",
        name: "Salt",
      },
    ],
    steps: [
      "Finely chop the shallot and soften in butter for 4–5 minutes.",
      "Add cream and warm gently for 2 minutes.",
      "Fold in salmon strips and cook over low heat for 1 minute.",
      "Add pasta and a splash of pasta water; finish with lemon zest and pepper. Taste before salting.",
    ],
    pastaIds: ["penne", "garganelli", "linguine", "fusilli"],
  },
  {
    id: "sun-dried-tomato-pesto",
    name: "Sun-dried tomato pesto",
    category: "Pesto",
    minutes: 15,
    vegetarian: true,
    plantBased: true,
    spicy: false,
    description: "A rich red pesto with sun-dried tomatoes, almonds and basil.",
    ingredients: [
      {
        quantity: "70 g, drained",
        name: "Sun-dried tomatoes in oil",
      },
      {
        quantity: "20 g",
        name: "Unsalted almonds",
      },
      {
        quantity: "5 leaves",
        name: "Basil",
      },
      {
        quantity: "½ small clove",
        name: "Garlic",
      },
      {
        quantity: "2 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "If needed",
        name: "Salt",
      },
    ],
    steps: [
      "Blend the tomatoes, almonds, basil, garlic and oil into a textured paste.",
      "Loosen with warm pasta water, taste before salting and toss with pasta off the heat.",
      "Add more pasta water if the coating is too thick.",
    ],
    pastaIds: ["fusilli", "penne", "trofie", "sedanini"],
  },
  {
    id: "cacio-e-pepe",
    name: "Cacio e pepe",
    category: "Creamy",
    minutes: 20,
    vegetarian: true,
    plantBased: false,
    spicy: false,
    description: "Pecorino and black pepper emulsified into a creamy coating.",
    ingredients: [
      {
        quantity: "70 g, finely grated",
        name: "Pecorino Romano",
      },
      {
        quantity: "½–1 tsp, freshly ground",
        name: "Black pepper",
      },
    ],
    steps: [
      "Toast the pepper in a dry pan over low heat for 30 seconds, then add a small ladle of pasta water.",
      "In a bowl, gradually mix the cheese with warm—not boiling—pasta water to make a thick paste.",
      "Add cooked pasta to the pepper pan, remove from the heat and let it cool briefly.",
      "Fold in the cheese paste, stirring and adding small splashes of water until smooth. Do not boil after adding cheese.",
    ],
    pastaIds: ["spaghetti", "bucatini", "rigatoni", "linguine"],
    peppery: true,
  },
  {
    id: "lemon-basil-breadcrumbs",
    name: "Lemon, basil & breadcrumbs",
    category: "Oil or butter base",
    minutes: 20,
    vegetarian: true,
    plantBased: true,
    spicy: false,
    description:
      "A bright lemon dressing with basil and crisp toasted breadcrumbs.",
    ingredients: [
      {
        quantity: "30 g",
        name: "Coarse dry breadcrumbs",
      },
      {
        quantity: "2 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "1 lemon, finely grated",
        name: "Lemon zest",
      },
      {
        quantity: "1–2 tsp",
        name: "Lemon juice",
      },
      {
        quantity: "6 leaves",
        name: "Basil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Toast the breadcrumbs with 1 tbsp oil over medium heat for 3–4 minutes until golden; set aside.",
      "Combine the remaining oil, lemon zest, 1 tsp juice and a splash of pasta water in the warm pan. Add pasta and toss briefly.",
      "Remove from the heat and add torn basil and pepper. Taste before adding more juice.",
      "Sprinkle breadcrumbs over each serving.",
    ],
    pastaIds: ["spaghetti", "bucatini", "linguine", "trofie"],
    peppery: true,
  },
  {
    id: "courgette-speck",
    name: "Courgette & speck",
    category: "Oil or butter base",
    minutes: 25,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description:
      "Tender courgette with savoury speck and a light coating made with pasta water.",
    ingredients: [
      {
        quantity: "1 medium",
        name: "Courgette",
      },
      {
        quantity: "70 g",
        name: "Speck",
      },
      {
        quantity: "½ small",
        name: "Onion",
      },
      {
        quantity: "1 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Cut the speck into strips and cook in a dry pan for 2–3 minutes; set aside.",
      "Add oil and chopped onion to the pan and soften for 4 minutes.",
      "Add thinly sliced courgette and cook for 8–10 minutes until tender. Mash a few pieces with a spoon.",
      "Add pasta, speck and a splash of pasta water; toss until lightly coated.",
    ],
    pastaIds: ["garganelli", "penne", "cavatelli", "orecchiette"],
  },
  {
    id: "peas-speck",
    name: "Peas & speck",
    category: "Oil or butter base",
    minutes: 20,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description:
      "Sweet peas and savoury speck with a naturally creamy pea coating.",
    ingredients: [
      {
        quantity: "180 g",
        name: "Frozen peas",
      },
      {
        quantity: "70 g",
        name: "Speck",
      },
      {
        quantity: "½ small",
        name: "Onion",
      },
      {
        quantity: "1 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Cook speck strips in a dry pan for 2–3 minutes; set aside.",
      "Soften chopped onion in the oil for 4 minutes.",
      "Add peas and 80 ml water; simmer for 6–8 minutes until tender. Optionally, mash or blend one-third of the peas.",
      "Return everything to the pan, add pasta and speck, and loosen with pasta water.",
    ],
    pastaIds: ["garganelli", "sedanini", "orecchiette", "cavatelli"],
  },
  {
    id: "vegetables-mushrooms-speck",
    name: "Vegetables, mushrooms & speck",
    category: "Oil or butter base",
    minutes: 30,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description:
      "A colourful vegetable dressing with mushrooms and savoury speck.",
    ingredients: [
      {
        quantity: "1 small",
        name: "Courgette",
      },
      {
        quantity: "1 small",
        name: "Carrot",
      },
      {
        quantity: "½",
        name: "Onion",
      },
      {
        quantity: "150 g",
        name: "Mushrooms",
      },
      {
        quantity: "60 g",
        name: "Speck",
      },
      {
        quantity: "1 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Cook speck strips in a dry pan for 2–3 minutes; set aside.",
      "Finely dice the carrot, onion and courgette and slice the mushrooms.",
      "Add oil, onion and carrot to the pan; cook for 5 minutes. Add mushrooms and cook for 6 minutes, then add courgette and cook for another 6–8 minutes.",
      "Return the speck, add pasta and a little pasta water and toss.",
    ],
    pastaIds: ["rigatoni", "fusilli", "sedanini", "cavatelli"],
  },
  {
    id: "cold-tomato-tuna-mozzarella",
    name: "Cold tomato, tuna, olive & mozzarella",
    category: "Cold & fresh",
    minutes: 20,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description:
      "A fresh pasta salad with tomatoes, tuna, olives and mozzarella.",
    ingredients: [
      {
        quantity: "200 g",
        name: "Cherry tomatoes",
      },
      {
        quantity: "100 g, drained",
        name: "Canned tuna",
      },
      {
        quantity: "60 g",
        name: "Mozzarella",
      },
      {
        quantity: "40 g, pitted",
        name: "Olives",
      },
      {
        quantity: "1 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "½ tsp",
        name: "Dried oregano",
      },
      {
        quantity: "If needed",
        name: "Salt",
      },
    ],
    steps: [
      "Cook pasta until al dente. Drain, spread in a shallow dish and let the steam escape while preparing the topping.",
      "Halve the tomatoes, slice the olives and flake the tuna.",
      "Toss with pasta, oil and oregano once the pasta has cooled to lukewarm. Fold in mozzarella.",
      "Serve or refrigerate promptly until chilled.",
    ],
    pastaIds: ["fusilli", "penne", "orecchiette", "sedanini"],
  },
  {
    id: "cold-tomato-rocket-mozzarella",
    name: "Cold tomato, rocket, olive & mozzarella",
    category: "Cold & fresh",
    minutes: 20,
    vegetarian: true,
    plantBased: false,
    spicy: false,
    description:
      "A fresh pasta salad with juicy tomatoes, rocket, olives and mozzarella.",
    ingredients: [
      {
        quantity: "200 g",
        name: "Cherry tomatoes",
      },
      {
        quantity: "125 g, well-drained",
        name: "Mozzarella",
      },
      {
        quantity: "30 g",
        name: "Rocket",
      },
      {
        quantity: "40 g, pitted",
        name: "Olives",
      },
      {
        quantity: "1 tbsp",
        name: "Olive oil",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
      {
        quantity: "To taste",
        name: "Black pepper",
      },
    ],
    steps: [
      "Cook pasta until al dente. Drain and spread in a shallow dish to release the steam.",
      "Halve the tomatoes, dice mozzarella and slice olives. Toss with the cooled pasta and oil.",
      "Fold in rocket just before serving so it stays fresh. Serve or refrigerate promptly until chilled.",
    ],
    pastaIds: ["fusilli", "penne", "orecchiette", "trofie"],
    peppery: true,
  },
  {
    id: "arrabbiata",
    name: "Arrabbiata",
    category: "Tomato base",
    minutes: 20,
    vegetarian: true,
    plantBased: true,
    spicy: true,
    description:
      "A lively tomato sauce with garlic, chili and parsley. Penne is the classic pairing.",
    ingredients: [
      {
        quantity: "300 g",
        name: "Passata",
      },
      {
        quantity: "1 clove",
        name: "Garlic",
      },
      {
        quantity: "¼ tsp",
        name: "Chili flakes",
      },
      {
        quantity: "1 tbsp",
        name: "Extra virgin olive oil",
      },
      {
        quantity: "1 tbsp, chopped",
        name: "Parsley",
      },
      {
        quantity: "To taste",
        name: "Salt",
      },
    ],
    steps: [
      "Warm the oil over medium-low heat. Add the lightly crushed garlic and chili; cook for 30 seconds without browning.",
      "Add passata and a pinch of salt, then simmer gently for 15 minutes. Remove the garlic.",
      "Toss with cooked pasta and a splash of pasta water, then finish with parsley. Adjust the chili to taste.",
    ],
    pastaIds: ["penne", "rigatoni", "sedanini", "spaghetti"],
  },
  {
    id: "amatriciana",
    name: "Amatriciana",
    category: "Tomato base",
    minutes: 25,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description:
      "A rich tomato sauce with guanciale and Pecorino. This version uses no onion or garlic; a small amount of chili is optional.",
    ingredients: [
      {
        quantity: "80 g",
        name: "Guanciale",
      },
      {
        quantity: "300 g",
        name: "Peeled tomatoes",
      },
      {
        quantity: "30 g",
        name: "Pecorino Romano",
      },
      {
        quantity: "30 ml",
        name: "Dry white wine",
      },
      {
        quantity: "If needed",
        name: "Salt",
      },
      {
        quantity: "Optional small pinch",
        name: "Chili flakes",
      },
    ],
    steps: [
      "Cut the guanciale into strips and cook in a dry pan over medium-low heat for 6–8 minutes, until golden and its fat has rendered. Set the guanciale aside.",
      "Add wine to the pan and let it reduce. Add crushed tomatoes and optional chili; simmer for 12–15 minutes.",
      "Return the guanciale and toss with cooked pasta. Remove from the heat before adding finely grated Pecorino. Taste before salting.",
    ],
    pastaIds: ["bucatini", "spaghetti", "rigatoni", "penne"],
  },
  {
    id: "fresh-tomato-tuna-feta",
    name: "Fresh tomato, tuna, feta, olives & capers",
    category: "Cold & fresh",
    minutes: 20,
    vegetarian: false,
    plantBased: false,
    spicy: false,
    description:
      "A fresh pasta salad with tuna, juicy tomatoes, olives, capers and basil.",
    ingredients: [
      {
        quantity: "200 g",
        name: "Cherry tomatoes",
      },
      {
        quantity: "120 g, drained",
        name: "Canned tuna",
      },
      {
        quantity: "60 g",
        name: "Feta",
      },
      {
        quantity: "40 g, pitted",
        name: "Olives",
      },
      {
        quantity: "2 tsp, rinsed",
        name: "Capers",
      },
      {
        quantity: "6 leaves",
        name: "Basil",
      },
      {
        quantity: "1½ tbsp",
        name: "Extra virgin olive oil",
      },
      {
        quantity: "If needed",
        name: "Salt",
      },
    ],
    steps: [
      "Cook pasta until al dente. Drain and spread in a shallow dish to let the steam escape.",
      "Halve the tomatoes, slice the olives and gently flake the tuna. Combine with capers and oil. Fold in feta.",
      "Once the pasta is lukewarm, toss everything together and add torn basil. Taste before salting.",
      "Serve immediately or refrigerate promptly until chilled.",
    ],
    pastaIds: ["fusilli", "penne", "sedanini", "orecchiette"],
  },
  {
    id: "cime-di-rapa",
    name: "Turnip greens",
    category: "Oil or butter base",
    minutes: 25,
    vegetarian: false,
    plantBased: false,
    spicy: true,
    description:
      "Tender turnip greens with garlic, anchovies and chili. Orecchiette with cime di rapa is an iconic Puglian combination.",
    ingredients: [
      {
        quantity: "300 g, trimmed",
        name: "Cime di rapa",
      },
      {
        quantity: "3 fillets in oil",
        name: "Anchovies",
      },
      {
        quantity: "1 clove",
        name: "Garlic",
      },
      {
        quantity: "2 tbsp",
        name: "Extra virgin olive oil",
      },
      {
        quantity: "⅛ tsp",
        name: "Chili flakes",
      },
    ],
    steps: [
      "Wash the greens and chop large leaves, discarding tough stalks.",
      "Cook the greens in boiling lightly salted water for approximately 5–8 minutes, until tender; lift out and reserve the water for the pasta.",
      "Meanwhile, gently warm the oil with crushed garlic, anchovies and chili, stirring until the anchovies dissolve. Add the greens and cook for 2 minutes.",
      "Cook pasta in the reserved water, then toss with the greens and a splash of cooking water. Remove the garlic before serving.",
    ],
    pastaIds: ["orecchiette", "cavatelli", "fusilli", "spaghetti"],
    spiceLabel: "Mildly spicy",
  },
]

// Derive both selection directions from the same pairing source.
export const pastas: Pasta[] = pastaShapes.map((pasta) => ({
  ...pasta,
  sauceIds: sauces
    .filter((sauce) => sauce.pastaIds.includes(pasta.id))
    .map((sauce) => sauce.id),
}))
export const pairings = sauces.flatMap((sauce) =>
  sauce.pastaIds.map((pastaId) => ({ pastaId, sauceId: sauce.id }))
)
export function sauceTime(sauce: Sauce): string {
  return sauce.timeLabel ?? `${sauce.minutes} min`
}
export function recipeIngredients(pasta: Pasta, sauce: Sauce): Ingredient[] {
  const hasSauceSalt = sauce.ingredients.some(({ name }) => name === "Salt")
  return [
    {
      name: pasta.name,
      quantity: pasta.category === "Filled pasta" ? "250 g" : "180–200 g",
    },
    ...sauce.ingredients.map((ingredient) =>
      ingredient.name === "Salt"
        ? {
            ...ingredient,
            quantity: `For pasta water; ${ingredient.quantity.toLowerCase()} for the sauce`,
          }
        : ingredient
    ),
    ...(hasSauceSalt
      ? []
      : [{ name: "Salt for the pasta water", quantity: "As needed" }]),
  ]
}
export function recipeSteps(pasta: Pasta, sauce: Sauce): string[] {
  if (sauce.id === "cime-di-rapa") {
    return sauce.steps.map((step) =>
      step.replace(
        "Cook pasta in the reserved water",
        `Cook the ${pasta.name} in the reserved water`
      )
    )
  }

  const timing =
    sauce.id === "meat-ragu"
      ? "Prepare the ragù first and cook the pasta when the sauce is nearly ready."
      : sauce.category === "Cold & fresh"
        ? "Cook the pasta first and cool it as described below."
        : "Prepare the sauce alongside the pasta, timing the pasta to finish when the sauce is ready."
  return [
    `${timing} Cook the ${pasta.name} in salted boiling water following the package timing. Reserve a mug of pasta water before draining.`,
    ...sauce.steps,
  ]
}
