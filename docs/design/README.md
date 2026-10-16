# Design reference

The first dashboard follows the supplied Silicon Shield design brief: Apple-inspired glass surfaces, a mountain-and-lake sunset background, white typography, and restrained blue/teal accents. The supplied landscape is stored locally at `public/images/dashboard-background.jpg`; it is used as provided, without an external download. A separate approved dashboard screenshot or design file was not available in the checkout.

The desktop layout has a fixed frosted sidebar, a translucent top bar, a welcome banner, and exactly two main feature cards. Security Overview shows an illustrative 82/100 score, Good status, and +6 weekly change. Security Alerts shows three demonstration events. A visible demo disclosure explains that no live monitoring or security protection is connected.

On smaller screens the sidebar becomes a modal drawer, and the cards stack vertically. Search remains a disabled visual preview. Notification and account disclosures contain demonstration content, not real account or monitoring state.

Surfaces default to 25% tint opacity and 24px backdrop blur, with thin white borders, rounded corners, and soft shadows. Settings → Glass Appearance adjusts opacity from 5% to 90% and blur from 0px to 40px immediately across the workspace. Preferences persist in localStorage on this browser; Reset to Default restores both defaults. A fixed contrast layer and the existing image overlay keep text readable even with low opacity and no blur. The landscape is unchanged. System fonts avoid external requests. Keyboard focus, a skip link, labelled icons and score graphics, text severity labels, and reduced-motion support are part of the first version.

For future work:

- Refine the current implementation against any additional approved design assets.
- Preserve readable contrast and the solid fallback when refining translucent surfaces.
- Preserve semantic headings, keyboard navigation, visible focus, and the skip link.
- Respect reduced-motion preferences when adding Motion animations.
- Give charts meaningful accessible names and text or table alternatives.
- Keep icons decorative with `aria-hidden` when text already provides their meaning; label icon-only controls.

The dashboard uses a dark glass theme. General light and dark theme tokens remain available, but no theme selector is implemented.
