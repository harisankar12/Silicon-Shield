# Silicon Shield

The Silicon Engine's flagship open-source cybersecurity monitoring platform.

This repository contains a Next.js App Router frontend at the repository root, including the first Silicon Shield dashboard UI. The dashboard uses demonstration scores, alerts, and a sample profile. No live monitoring or security protection is connected. Databases, authentication, APIs, and background workers remain outside the current scope.

## Local development

Use Node.js 22 or a newer supported LTS release and npm. Check your installed versions first:

```bash
node --version
npm --version
```

If a compatible Node.js version is already installed, start directly:

```bash
npm ci
npm run dev
```

If you already use nvm, the included `.nvmrc` lets you select Node.js 22 with `nvm install` followed by `nvm use` before running the npm commands. nvm is optional; if your shell reports `nvm: command not found` but Node.js is compatible, skip the nvm commands.

Open [http://localhost:3000](http://localhost:3000). Run all commands from the repository root; there is no nested application. No environment variables or external services are required.

Development and production builds use Next.js's supported Webpack bundler because this workspace restricts the local worker ports used by Turbopack.

### Development troubleshooting

Keep the terminal running while using `npm run dev`, and open the local URL printed by Next.js. If port 3000 is already in use by this project, reuse that server or stop it with Ctrl+C in its terminal before starting another instance.

Browser recording extensions can add attributes such as `data-scribe-recorder-ready` or `crxemulator` to `<html>` before React starts. The root layout tolerates attribute differences on that element; hydration checks within the application remain enabled. If an extension continues to interfere with the page, disable it for localhost or use a browser profile without extensions, then reload.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run lint` | Run ESLint with zero warnings allowed. |
| `npm run lint:fix` | Apply available ESLint fixes. |
| `npm run typecheck` | Generate route types and check TypeScript without emitting files. |
| `npm run build` | Create the production build and check types. |
| `npm start` | Serve the production build after building. |

Before opening a pull request, run lint, typecheck, and build. There is no test runner configured yet; `tests/` is reserved for future tests. Keep `package-lock.json` in version control and use `npm ci` for reproducible installs.

## Stack

- Next.js App Router and React, with Server Components by default.
- TypeScript with strict mode and `@/*` imports mapped to `src/*`.
- Tailwind CSS v4 through PostCSS, with CSS theme tokens in `src/app/globals.css`.
- ESLint with Next.js Core Web Vitals and TypeScript rules.
- shadcn/ui configuration in `components.json`, using the New York style and neutral CSS variables.
- Lucide React for icons, Recharts for future charts, and Motion for future animation.
- `clsx`, `tailwind-merge`, `class-variance-authority`, Radix Slot, and `tw-animate-css` for future UI primitives.

## Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    dashboard/page.tsx
    monitoring/page.tsx
    alerts/page.tsx
    assets/page.tsx
    reports/page.tsx
    security-health/page.tsx
    vulnerabilities/page.tsx
    recommendations/page.tsx
    settings/page.tsx
  components/
    layout/
    dashboard/
    charts/
    ui/
  hooks/
  lib/
    utils.ts
    constants.ts
  types/
    index.ts
  data/
    mock/
public/
  images/
  icons/
docs/
  architecture/
  design/
  ROADMAP.md
tests/
```

The home page redirects to `/dashboard`. The dashboard contains exactly two main feature cards: Security Overview and Security Alerts. All nine platform routes are available through the sidebar. Settings includes Glass Appearance controls; the other seven routes remain placeholders. Shared route metadata lives in `src/lib/constants.ts`.

In Settings → Glass Appearance, adjust Glass Opacity (5–90%, default 25%) and Background Blur (0–40px, default 24px). Changes immediately update shared glass surfaces through shell-level CSS variables, including the sidebar, header, cards, and popovers. Preferences restore safely after hydration from this browser's localStorage. Reset to Default restores both defaults. If storage is blocked, appearance changes still work for the current session.

The shared shell, sidebar, and header live in `src/components/layout/`. Feature cards and the welcome banner live in `src/components/dashboard/`, with reusable glass surfaces in `src/components/ui/glass-card.tsx`. Typed sample scores, alerts, and profile values live in `src/data/mock/`.

## UI development

Add shadcn/ui primitives as they become necessary, from the repository root:

```bash
npx shadcn@latest add button
```

The CLI writes components to `src/components/ui/`. Tailwind v4 uses CSS configuration, so the Tailwind config path in `components.json` is intentionally empty. Use `cn` from `@/lib/utils` to compose Tailwind classes. Add `"use client"` only to components that need browser APIs, interactive charts, animation, or client hooks; Motion can be imported from `motion/react` there.

The dashboard uses the supplied local mountain-and-lake image at `public/images/dashboard-background.jpg`, a dark overlay, and frosted panels with 24px backdrop blur. No external image or font requests are needed. System fonts, semantic landmarks, a skip link, visible focus outlines, reduced-motion support, and a native mobile navigation dialog are included. Search is a disabled visual preview; notifications and the sample account menu display demonstration content only. See [architecture](docs/architecture/README.md), [design guidance](docs/design/README.md), and the [roadmap](docs/ROADMAP.md).

Reference documentation: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), and [shadcn/ui configuration](https://ui.shadcn.com/docs/components-json).

## Known tooling limitations

ESLint 9 is retained for compatibility with the React, accessibility, and import plugins bundled by `eslint-config-next`; npm marks this ESLint major as unsupported. Revisit the ESLint 10 upgrade when those plugins support it.

At scaffolding time, `npm audit` reports five high-severity development dependency findings along the `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces` chain. These findings originate from one [braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm); the registry currently has no patched braces release. The production dependency audit is clean. Recheck with `npm audit`; avoid forcing a downgrade to an incompatible Next.js ESLint configuration.

## License

No LICENSE file was present in the repository at scaffolding time. A project maintainer should choose and add the intended license before public distribution; this scaffold does not select one.
