# Design reference

The Silicon Shield dashboard design identified in the project brief is the visual reference for future UI development. No reference image or design file was present in this checkout at scaffolding time. Add the approved asset or a stable link here before implementing the dashboard.

This scaffold intentionally contains only neutral placeholder pages. It does not establish the final dashboard layout, navigation shell, chart styling, branding assets, or glassmorphism treatment.

For future work:

- Map the approved design to the semantic CSS tokens in `src/app/globals.css`.
- Introduce translucent surfaces and backdrop effects only when implementing that reference, with readable contrast and a solid fallback.
- Preserve semantic headings, keyboard navigation, visible focus, and the skip link.
- Respect reduced-motion preferences when adding Motion animations.
- Give charts meaningful accessible names and text or table alternatives.
- Keep icons decorative with `aria-hidden` when text already provides their meaning; label icon-only controls.

Light and dark theme tokens are available. The scaffold uses the light theme by default and does not implement a theme selector.
