# Silicon Shield

The Silicon Engine's flagship open-source cybersecurity monitoring platform.

This repository currently contains the frontend foundation only: a Next.js App Router application at the repository root, with minimal pages for future development. Dashboard visuals, monitoring logic, databases, authentication, APIs, and background workers are outside this scaffold.

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

The home page links to all nine placeholder routes. Shared route metadata lives in `src/lib/constants.ts`, and the shared placeholder is in `src/components/layout/`.

## UI development

Add shadcn/ui primitives as they become necessary, from the repository root:

```bash
npx shadcn@latest add button
```

The CLI writes components to `src/components/ui/`. Tailwind v4 uses CSS configuration, so the Tailwind config path in `components.json` is intentionally empty. Use `cn` from `@/lib/utils` to compose Tailwind classes. Add `"use client"` only to components that need browser APIs, interactive charts, animation, or client hooks; Motion can be imported from `motion/react` there.

The current UI uses neutral colors, system fonts, semantic landmarks, a skip link, and visible focus outlines. Theme tokens are ready for future visual refinement. See [architecture](docs/architecture/README.md), [design guidance](docs/design/README.md), and the [roadmap](docs/ROADMAP.md).

Reference documentation: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), and [shadcn/ui configuration](https://ui.shadcn.com/docs/components-json).

## Known tooling limitations

ESLint 9 is retained for compatibility with the React, accessibility, and import plugins bundled by `eslint-config-next`; npm marks this ESLint major as unsupported. Revisit the ESLint 10 upgrade when those plugins support it.

At scaffolding time, `npm audit` reports five high-severity development dependency findings along the `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces` chain. These findings originate from one [braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm); the registry currently has no patched braces release. The production dependency audit is clean. Recheck with `npm audit`; avoid forcing a downgrade to an incompatible Next.js ESLint configuration.

## License

No LICENSE file was present in the repository at scaffolding time. A project maintainer should choose and add the intended license before public distribution; this scaffold does not select one.
