# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server at localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
```

No linter or test suite configured.

## Architecture

Vite + React SPA. No TypeScript, no Tailwind — pure CSS Modules per component.

**Content lives in one place:** `src/data/content.js` exports `projects`, `services`, `process`, `testimonial`, and `contact`. Editing copy, stack chips, or accent colors is done here, not inside components.

**Accent color system:** each project/service has an `accent` field (`'cyan'` | `'purple'` | `'magenta'`). Components apply dynamic CSS class names like `styles[`accent-${accent}`]` and `styles[`dot-${accent}`]`. The three accent values map to CSS variables `--cyan`, `--purple`, `--magenta` and their rgba equivalents are hardcoded in the module CSS files for hover glows and borders.

**Scroll reveal:** `src/hooks/useReveal.js` — IntersectionObserver hook returning `[ref, visible]`. Attaches the global `.reveal` / `.visible` classes (defined in `index.css`) plus an inline `transitionDelay` for staggered card entrances.

**Global tokens:** all colors, fonts, spacing variables, shared classes (`.container`, `.section`, `.btn`, `.chip`, `.reveal`) are in `src/index.css`. Component CSS Modules import nothing — they consume the `:root` variables directly.

**CursorGlow:** fixed-position blob (`src/components/CursorGlow.jsx`) that uses `requestAnimationFrame` with lerp (0.06 factor) to trail the cursor. Hidden on touch devices via `@media (hover: none)`.

**Logo:** `public/logo.png`. A generated placeholder exists — replace with the real asset. Referenced in Nav, Footer, and as the favicon in `index.html`.
