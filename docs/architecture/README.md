# Frontend architecture

The Next.js application lives directly in the repository root and uses `src/app/` for App Router routes. Each requested platform route is a static placeholder; the home page provides simple navigation.

- `src/app/layout.tsx` owns document metadata, the skip link, the header, and the main landmark.
- `src/components/layout/` holds shared page scaffolding.
- `src/components/dashboard/` is reserved for future dashboard components.
- `src/components/charts/` is reserved for future Recharts components.
- `src/components/ui/` is the destination for shadcn/ui primitives.
- `src/hooks/` holds future reusable hooks.
- `src/lib/constants.ts` defines application and navigation metadata.
- `src/lib/utils.ts` exports the Tailwind-aware `cn` helper.
- `src/types/` holds shared TypeScript contracts.
- `src/data/mock/` is reserved for deterministic fixtures.

Use `@/*` imports for modules under `src/`. Keep Server Components as the default and place client boundaries around interactive leaves when needed. Chart and Motion packages are installed but not rendered by the scaffold.

Tailwind v4 is configured in CSS and processed by `@tailwindcss/postcss`. The root `components.json` points shadcn/ui at the same stylesheet and aliases. CSS variables provide semantic colors and radii, with optional `.dark` overrides; no theme switcher is included.

There are no backend services, API handlers, authentication providers, database connections, or background workers. No environment configuration is required. Future runtime integrations and domain models need their own design decisions.

Validation commands are `npm run lint`, `npm run typecheck`, and `npm run build`. Next.js generates ignored `next-env.d.ts` and `.next/` type artifacts locally. The lockfile is tracked for reproducible installs.
