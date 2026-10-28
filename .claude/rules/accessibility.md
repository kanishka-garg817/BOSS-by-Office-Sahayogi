# Accessibility (target: WCAG 2.2 AA)

- Use native elements first; add ARIA only when no native element fits, and keep it correct.
- Everything interactive is keyboard-operable with a visible focus indicator. Never remove outlines without a replacement.
- Color contrast: 4.5:1 for text, 3:1 for large text and UI components. Never convey meaning by color alone.
- Every form control has a programmatic label; errors are associated with their field and announced.
- Images have meaningful `alt`; icon-only buttons have an accessible name.
- Touch targets at least 24×24 CSS px (prefer 44×44). Layouts work at 320 px width and 200% zoom.
- Respect `prefers-reduced-motion`; no essential information in animation. No autoplaying media with sound.
- Set `lang` on `<html>` (done in the root layout); mark language changes inline.
- Provide a skip-to-content link once a shared layout with navigation exists.
