<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Pastapp contributor guide

## Product and stack

Pastapp helps people choose a pasta and sauce pairing, then cook a recipe for two. Users can start with pasta, start with sauce, or use “Surprise me”. Recipes include ingredients, cooking steps, dietary badges, and a downloadable PNG.

This is a single Next.js App Router application using React 19, strict TypeScript, Tailwind CSS 4, shadcn/ui with Base UI primitives, Lucide icons, Motion, next-themes, and Matter.js. Use `package.json` and `pnpm-lock.yaml` for installed versions. The catalog is local TypeScript data; there is currently no backend, database, authentication, or API route.

## Commands

Use pnpm and keep `pnpm-lock.yaml` in sync with dependency changes.

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Serve a production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript without emitting files |
| `pnpm format` | Format all TypeScript and TSX files; prefer targeted formatting for small changes |
| `pnpm generate:pasta-physics` | Regenerate pasta collision geometry from SVG artwork |

There is no test runner or `check` script configured. `paseo.json` currently refers to `pnpm run check`; use the actual lint and typecheck scripts unless that configuration is explicitly being fixed.

## Where things live

- `app/page.tsx`: root page and page metadata; renders `PastaApp`.
- `app/layout.tsx`: document shell, Google fonts, and theme provider.
- `app/globals.css`: Tailwind imports, theme tokens, light/dark palettes, and global styles.
- `components/pasta-app.tsx`: screen state, hash navigation, selection flows, recipe rendering, and PNG export.
- `components/recipe-stepper.tsx`: progress indicator for pasta-first and sauce-first flows.
- `lib/catalog.ts`: pasta/sauce types, categories, recipes, pairings, and recipe helper functions.
- `docs/sample-catalog.md`: catalog reference, pairing order, portions, and dietary conventions. Keep it aligned with catalog changes.
- `components/pasta-artwork.tsx`: pasta compositions, ingredient thumbnails, and shared artwork animations.
- `components/sauce-artwork.tsx`, `lib/sauce-artwork.ts`, and `lib/ingredient-artwork.ts`: sauce previews and ingredient image mappings.
- `components/pairing-hero.tsx`, `components/brand-logo.tsx`, and `components/hero-sticker.tsx`: pairing and brand presentation.
- `components/pasta-physics.tsx` and `lib/pasta-physics.ts`: canvas scene and Matter.js body creation.
- `scripts/generate-pasta-colliders.mjs`: SVG tracing that produces `lib/pasta-collision-shapes.json`.
- `public/pasta/`, `public/ingredients/`, and `public/brand/`: supplied artwork.
- `components/ui/`: shadcn primitives; `lib/utils.ts` provides `cn`.
- `components/theme-provider.tsx`: system theme support and the `D` theme shortcut, which ignores typing targets and modifier keys.

## Navigation and rendering

The app has one route, `/`. Its screens are URL fragments: `home`, `pasta-list`, `pasta-result`, `sauce-list`, `sauce-result`, and `result`. Fragment query parameters carry `pasta`, `sauce`, and `from`. For example: `/#result?pasta=spaghetti&sauce=carbonara&from=pasta`.

Preserve direct links, browser Back/Forward behavior, selected items when going back, and the progress indicator when changing navigation. Unknown screens and invalid recipe pairings fall back to home. Surprise me samples the shared pairing list.

Keep `app/page.tsx` and `app/layout.tsx` as Server Components. Put browser APIs and interactive behavior behind appropriate client boundaries; preserve server snapshots in `useSyncExternalStore` to avoid hydration mismatches. Clean up listeners, observers, animation frames, and physics resources in effects.

Recipe export dynamically imports `html-to-image` and captures the recipe container, including artwork and the active theme. Keep export controls outside the captured content and preserve saving/error feedback.

## Catalog rules

- Treat `lib/catalog.ts` as the runtime source of truth. Define compatibility in each sauce’s `pastaIds`; derive pasta `sauceIds` and the flat `pairings` list from it rather than maintaining separate lists.
- Keep IDs stable because links and artwork mappings depend on them. Preserve supplied pairing order and show every compatible match.
- Recipes serve two people. Use `recipeIngredients`, `recipeSteps`, and `sauceTime` rather than duplicating portion, salt, timing, or display-label logic in components.
- Dietary badges describe the sauce. Veggie includes dairy, eggs, and cheese; plant-based excludes animal ingredients and replaces the veggie badge when both apply. Chosen pasta may contain eggs or dairy.
- Keep spicy and peppery flags distinct, and preserve optional time/spice labels and special cooking sequences such as turnip greens and slow-cooked ragù.
- When adding or renaming ingredients or sauces, update the corresponding artwork mappings and catalog documentation.

## UI and artwork

Use existing shadcn/ui components where they fit. Before creating or manually copying a primitive, first try installing the official component:

```bash
pnpm exec shadcn add <component>
```

Keep generated primitives in `components/ui` and preserve the `base-luma` style, CSS variable setup, and aliases in `components.json`. Custom artwork, canvas physics, and composed product screens are appropriate custom components.

Use `@/` imports and `cn` for conditional classes. Follow `.prettierrc`: two spaces, double quotes, no semicolons, and Tailwind class sorting. Format changed files instead of reformatting unrelated code.

Preserve the warm cream backgrounds, blue primary color, rounded cards, supplied brand assets, and both themes. Reuse semantic theme tokens from `app/globals.css`. The app fills the mobile viewport and sits in a centered shell up to 700px wide on larger screens; keep fixed header/actions, inner scrolling, and bottom safe-area padding usable.

Retain keyboard focus indicators, accessible names for icon buttons, selection state, status announcements, and reduced-motion handling. Check hover, focus, and touch behavior when changing animated artwork.

Reuse supplied assets and shared artwork components. Short/filled pasta use three-piece compositions; long pasta use a single bundle. Keep intentional artwork angles and filenames, including mixed `-1` and `-01` suffixes. After changing pasta SVGs, run `pnpm generate:pasta-physics` and include the regenerated JSON; do not hand-edit collision geometry.

## Verification

For code changes, run `pnpm lint` and `pnpm typecheck`. Run `pnpm build` for changes affecting routing, rendering, dependencies, or production behavior. Production builds use `next/font/google`, so font fetching may require network access; report environment failures separately from code failures.

For affected UI, manually verify both selection flows, Surprise me, back navigation, direct fragment links, invalid links, theme switching, and PNG export as applicable. Check narrow mobile and desktop layouts, scrolling, keyboard focus, and missing artwork. For catalog changes, verify referenced IDs exist and both selection directions remain consistent. For physics changes, check resizing, dragging, and scene cleanup.

For documentation-only edits, verify paths, commands, and the diff; application tests are unnecessary. Report what was checked and any checks that could not run. Keep the managed Next.js block above intact, and keep `CLAUDE.md` pointing to `@AGENTS.md`.
