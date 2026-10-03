<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# App context

This repository is a Next.js 16 application using React 19, TypeScript, Tailwind CSS 4, and the App Router. The project is configured for shadcn/ui (see `components.json`), with the `base-luma` style, CSS variables, and Lucide icons.

## UI components

Use shadcn/ui components for interface work where they fit. Before creating or manually copying a component, first try installing the official component through the shadcn CLI:

```bash
npx shadcn@latest add <component>
```

Only implement a custom component when shadcn does not provide an appropriate component or the requested design requires a meaningful departure. Keep CLI-generated components in `components/ui` and preserve the configured aliases in `components.json`.
