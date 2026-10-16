# Frontend architecture

The Next.js application lives directly in the repository root and uses `src/app/` for App Router routes. `/dashboard` renders the first dashboard UI, `/settings` provides appearance controls, and `/` redirects to the dashboard. The other seven platform routes remain placeholders inside the shared shell.

- `src/app/layout.tsx` owns document metadata and mounts the shared dashboard shell.
- `src/components/layout/` holds the landscape shell, sidebar, header, main landmark, skip link, and shared placeholder. The shell uses a native modal dialog for mobile navigation, including focus containment, Escape dismissal, focus restoration, and scroll locking.
- `src/components/dashboard/` holds the welcome banner, overview card, accessible SVG score ring, and alerts card.
- `src/components/charts/` is reserved for future Recharts components.
- `src/components/ui/` holds the reusable GlassCard and is the destination for future shadcn/ui primitives.
- `src/hooks/use-glass-settings.tsx` provides shared appearance state through `GlassSettingsProvider` and the reusable `useGlassSettings` hook. It restores validated localStorage preferences after hydration and persists explicit changes without overwriting saved values on startup. Storage failures leave the controls usable.
- `src/components/settings/` holds the reusable Glass Appearance controls.
- `src/lib/constants.ts` defines application and navigation metadata.
- `src/lib/utils.ts` exports the Tailwind-aware `cn` helper.
- `src/types/` holds shared TypeScript contracts.
- `src/data/mock/` holds typed demonstration scores, alerts, and a sample profile. No values come from live monitoring.

Use `@/*` imports for modules under `src/`. Pages and feature cards remain Server Components. The shell, sidebar, and header use client boundaries for the navigation drawer, route state, and controls; the shell accepts server-rendered children. Recharts and Motion remain available for future development; the score uses a lightweight SVG gradient ring.

Tailwind v4 is configured in CSS and processed by `@tailwindcss/postcss`. The root `components.json` points shadcn/ui at the same stylesheet and aliases. The dashboard shell scopes its light text and focus tokens over a local background image. Its `--glass-opacity` and `--glass-blur` properties drive the shared `.glass-surface` utility and existing surface aliases, including cards, navigation, and popovers. Defaults are 25% opacity and 24px blur. A separate contrast layer preserves legibility, with an opaque fallback when blur is unsupported. Reduced-motion preferences remove nonessential transitions. No theme switcher is included.

There are no backend services, API handlers, authentication providers, database connections, or background workers. No environment configuration is required. Future runtime integrations and domain models need their own design decisions.

Validation commands are `npm run lint`, `npm run typecheck`, and `npm run build`. Next.js generates ignored `next-env.d.ts` and `.next/` type artifacts locally. The lockfile is tracked for reproducible installs.
