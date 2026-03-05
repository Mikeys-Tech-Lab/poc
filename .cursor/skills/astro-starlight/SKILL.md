---
name: astro-starlight
description: Guides Astro + Starlight site development for this workspace. Use when scaffolding, configuring, theming, or adding content to the docs site in apps/site/. Enforces version-aligned best practices and content architecture boundaries.
---

# Astro + Starlight

## When to use

- Scaffolding or iterating the Starlight site in `apps/site/`
- Configuring Starlight (sidebar, navigation, integrations)
- Applying or updating custom theme/colors
- Adding or editing site content pages
- Troubleshooting Astro build or dev server issues

## Capability alignment

Before relying on any Astro or Starlight feature:

1. Read `apps/site/package.json` to confirm installed versions.
2. If a command or config option is version-sensitive, run `--help` or check official docs for that version.
3. If not checkable, produce a manual checklist and mark the result unknown. Do not infer capability.

## Content boundaries

- Site content (practitioner): `apps/site/src/content/docs/`
- Site content (beginner): `apps/site/src/content/beginner/`
- Assets (images, fonts): `apps/site/src/assets/`
- Shared modules: `apps/site/src/lib/`
- Seeds (`seeds/`) are development-only sources. They are not the site content tree.
- The site may reference seeds but must not import them as pages.

### Content collections

Two content collections are defined in `content.config.ts`:

- `docs`: Starlight's native collection. Uses `docsLoader()` and `docsSchema()`.
- `beginner`: Custom collection for beginner-register companion content. Uses Astro's `glob` loader for `**/*.mdx` files in `src/content/beginner/`.

Both follow the same locale directory structure: `{locale}/section/page.mdx`.

## Known pitfalls

These are known pitfalls we’ve hit in this repo. Do not repeat them.

### Image paths in content frontmatter

Astro content collections (`.md`, `.mdx` files in `src/content/`) resolve image paths differently from `.astro` component imports.

- **In frontmatter YAML**: use relative paths from the content file. Example: `../../assets/hero.png`
- **In `.astro` components**: aliases like `~/assets/` or `@/assets/` may work (depending on tsconfig).
- **Do not** use `~/assets/` in frontmatter. It will fail at build time with `[ImageNotFound]`.

### Path alias context rule

Never assume a path alias works in all contexts. Aliases that resolve in module imports (`.ts`, `.astro`) may not resolve in YAML frontmatter, CSS `url()`, or HTML attributes. When in doubt, use a relative path and verify with a build.

## Build verification requirement

Any change to assets, config, content structure, or frontmatter must be followed by `pnpm run build` before committing. Do not commit without a passing build.

If the build fails, fix the issue before committing. Do not commit broken builds.

## Theming: Catppuccin for Starlight

The site uses [`@catppuccin/starlight`](https://github.com/catppuccin/starlight) as a Starlight plugin for all color theming.

### Current configuration

```js
starlightCatppuccin({
  dark: { flavor: "frappe", accent: "flamingo" },
  light: { flavor: "latte", accent: "flamingo" },
})
```

- **Dark mode**: Frappé flavor, flamingo accent (rosé pink)
- **Light mode**: Latte flavor, flamingo accent (Latte is the only light-mode flavor)

### Constraints

- Do not manually set `--sl-color-accent*` or `--sl-color-gray-*` CSS custom properties. Catppuccin owns these. Override only layout/component-specific properties via `--poc-*` tokens.
- Dark flavor options: `frappe`, `macchiato`, `mocha`. Light flavor: `latte` only.
- Accent options: `lavender`, `blue`, `sapphire`, `sky`, `teal`, `green`, `yellow`, `peach`, `maroon`, `red`, `mauve`, `pink`, `flamingo`, `rosewater`.
- To change flavor or accent, edit the plugin config in `astro.config.mjs`. Do not create separate theme CSS files for color palettes.
- After changing theme config, run `pnpm run build` to verify. The plugin generates theme CSS at build time.

### Two dimensions: color scheme and visual style

The theme system has two orthogonal dimensions:

- **Color scheme** (`data-theme`): `dark` or `light`. Controlled by Catppuccin plugin (Frappé/Latte flavors).
- **Visual style** (`data-style`): atmospheric (default, no attribute) or `solid`. Controlled by custom CSS tokens and the ThemeProvider/ThemeSelect overrides.

The theme selector in the header combines both into 5 options. See the "Site-wide visual system" section below for implementation details.

### Theme-color meta tags

The `head` array in `astro.config.mjs` includes `theme-color` and `msapplication-TileColor` meta tags hardcoded to `#303446` (Frappé base). If the dark flavor changes, these values must be updated manually. Catppuccin base colors:

- Frappé: `#303446`
- Macchiato: `#24273a`
- Mocha: `#1e1e2e`

### Reference

- Official docs: https://starlight.catppuccin.com/
- Configuration reference: https://starlight.catppuccin.com/configuration

## Centralized URLs

Social URLs live in `apps/site/src/consts.ts`. Use these constants in `.mjs`, `.ts`, and `.astro` files instead of hardcoding URLs.

```ts
import { LINKEDIN } from '../consts';
```

The site is a publication surface, not repository documentation. Repository links are intentionally absent from published content.

## Shared modules (`src/lib/`)

Reusable logic lives in `src/lib/` as pure TypeScript modules. Components import from these instead of inlining logic.

| Module | Context | Purpose |
|---|---|---|
| `locale.ts` | Server (frontmatter) | Resolve locale from URL pathname. Single source for locale detection. |
| `i18n.ts` | Server (frontmatter) | Label maps for register names and theme names per locale. |
| `register.ts` | Client (`<script>`) | Register state: read, write, localStorage, URL param sync, event dispatch. |
| `toc.ts` | Client (`<script>`) | Rebuild Starlight ToC for the active register's visible headings. |

**Server vs. client**: `locale.ts` and `i18n.ts` run at build time in Astro frontmatter. `register.ts` and `toc.ts` run in the browser via Vite-processed `<script>` tags.

**Adding a locale**: update `locale.ts` (prefix map), `i18n.ts` (label maps), and `astro.config.mjs` (locales object).

## Component overrides

Five Starlight components are overridden via the `components` key in `astro.config.mjs`:

| Override | File | Purpose |
|---|---|---|
| `SiteTitle` | `src/components/SiteTitle.astro` | Site title with register toggle. Clicking the title switches between Practitioner and Beginner. |
| `SocialIcons` | `src/components/SocialIcons.astro` | Adds a LinkedIn icon after the default social icons. |
| `ThemeProvider` | `src/components/ThemeProvider.astro` | Prevents FOUC for `data-theme`, `data-style`, and `data-register` attributes. |
| `ThemeSelect` | `src/components/ThemeSelect.astro` | Extends the selector to 5 options with locale-aware labels. |
| `Pagination` | `src/components/LicensePanel.astro` | Wraps default Pagination with LicenseNotice footer. |

### Override principles

1. **Minimal surface.** Only override what Starlight cannot configure. Each override is a maintenance contract that must survive Starlight upgrades.
2. **Single responsibility.** Each component does one thing. SiteTitle handles the register toggle UI. ThemeSelect handles theme selection. LicensePanel composes Pagination with LicenseNotice.
3. **Delegate to shared modules.** Components import logic from `src/lib/` instead of inlining state management, locale detection, or i18n lookups.
4. **Inline scripts only for FOUC prevention.** ThemeProvider uses `is:inline` because it must run before first paint. All other client logic uses regular `<script>` tags processed by Vite, which allows ES imports.

### The inline script constraint

`<script is:inline>` runs synchronously before paint but cannot use ES imports. `<script>` (without `is:inline`) is processed by Vite, supports imports, but is deferred. When logic must exist in both contexts (e.g., register storage key, parsing), the duplication is intentional and documented. If a shared value changes, update both locations.

### Adding an override

1. Check if the need can be met via CSS tokens or Starlight config first.
2. If an override is needed, copy the original from `node_modules/@astrojs/starlight/components/`.
3. Place your version in `src/components/`.
4. Extract reusable logic to `src/lib/`. The component should orchestrate, not contain business logic.
5. Register it in `astro.config.mjs` under `components`.
6. Run `pnpm run build` to verify.

## Register system

The register (Practitioner/Beginner) controls which content variant is visible on each page.

### How it works

1. **Build time**: `RegisterContent.astro` renders both variants into the HTML, wrapped in `[data-register-content="practitioner"]` and `[data-register-content="beginner"]` divs.
2. **Before paint**: ThemeProvider's inline script reads `?register=` URL param or `localStorage`, sets `data-register` on `<html>`.
3. **CSS**: Global styles hide the inactive variant based on `data-register`.
4. **Toggle**: SiteTitle's `<script>` imports from `register.ts` and `toc.ts`. Clicking the title calls `setRegister()`, which updates state and dispatches `poc:register-change` on `window`.
5. **Listeners**: The `poc:register-change` event triggers UI updates (aria-pressed) and ToC rebuild.

### State flow

```
ThemeProvider (inline, sync) → sets data-register → CSS hides inactive content
SiteTitle (module, deferred) → click → setRegister() → event → UI update + ToC rebuild
```

### Adding register-aware behavior

Listen for the `poc:register-change` event on `window`. The event detail contains `{ register: 'practitioner' | 'beginner' }`. Do not read `localStorage` directly from components; use the DOM attribute or the event.

## Site-wide visual system

The atmospheric background and frosted glass treatment apply to **all pages**, not just the landing page.

### CSS architecture

Styles are modular, imported via `src/styles/custom.css` in dependency order:

- `tokens.css` — design tokens (palette channels, surfaces, borders, shadows, blur)
- `atmosphere.css` — fullscreen blurred background image + Starlight variable overrides
- `solid.css` — overrides for the solid style variant (opaque backgrounds, no blur)
- `surfaces.css` — frosted glass for header, sidebar, cards, search, pagination, mobile ToC
- `hero.css` — landing page hero image, tagline, CTA button
- `controls.css` — header controls: hamburger, search, theme selector styling + layout
- `typography.css` — inline code and code links

All files live in `apps/site/src/styles/`. For the design token system and frosted glass pattern details, see `visual-design.mdc`.

### How it works

1. `body::before` renders the background image (`src/assets/bg-landing.png`) with `position: fixed` to cover the full viewport.
2. `tokens.css` defines `--poc-base` and `--poc-overlay` as space-separated RGB channels. Surface, border, blur, and shadow tokens compose from these.
3. `atmosphere.css` overrides `--sl-color-bg`, `--sl-color-bg-nav`, and `--sl-color-bg-sidebar` using `--poc-surface-*` tokens so the atmosphere shows through.
4. `surfaces.css` applies `backdrop-filter: blur()` to specific UI elements for the frosted glass effect.
5. The light theme overrides the channel values in `tokens.css`. Most downstream tokens auto-resolve.

### Style variants

Two visual styles exist, controlled by `data-style` on `<html>`:

- **Atmospheric** (default): blurred background, frosted glass surfaces.
- **Solid** (`data-style="solid"`): opaque Catppuccin backgrounds. Defined in `src/styles/solid.css`, which overrides token values and hides `body::before`.

`ThemeSelect.astro` stores a composite value (e.g. `dark-solid`) in `localStorage`. `ThemeProvider.astro` reads it before render and sets both `data-theme` and `data-style`, preventing FOUC for both dimensions.

### Constraints

- **Override CSS variables, not component styles.** Starlight components reference `--sl-color-bg-nav`, `--sl-color-bg`, etc. Overriding the variables avoids specificity fights and `!important`.
- **Use `backdrop-filter` only on targeted elements.** It cannot be expressed as a CSS custom property, so it requires direct selectors (e.g. `.page > .header`, `.sidebar-pane`).
- **`inset: -24px` on `body::before`.** Compensates for blur edge artifacts. If blur is removed, reset to `inset: 0`.
- **Token colors, not hardcoded rgba.** All color values come from `--poc-*` tokens. The only hardcoded hex values are in `solid.css` (Catppuccin Surface0/1/2) and `theme-color` meta tags.
- **Catppuccin hex maintenance.** If the dark flavor changes in `astro.config.mjs`, update `solid.css` surface hex values and the `theme-color`/`msapplication-TileColor` meta tags in the `head` array.

### Background image

`src/assets/bg-landing.png` is referenced via CSS `url()` from `atmosphere.css` using a relative path (`../assets/bg-landing.png`). Vite resolves this at build time.

To replace the image: swap the file and run `pnpm run build`. The tint overlay opacity may need adjustment for different image color profiles.

## Theme system guardrail

Any change to theme tokens, the theme selector, the ThemeProvider inline script, or style variants must be validated by:

1. Running `pnpm run build` to confirm no build errors.
2. Doing one manual browser refresh to confirm no FOUC (flash of unstyled content).

FOUC regressions are silent — they do not fail the build. The only reliable check is a visual refresh after a clean load (hard refresh or incognito window).

## Linting and formatting

Biome handles linting, formatting, and import organization for `.ts`, `.mjs`, `.js`, `.json`, and `.css` files workspace-wide. Configuration is in `biome.json` at the repo root.

Biome does not process `.astro` files. Astro frontmatter and templates are excluded. This means `.astro` files rely on convention and review rather than automated enforcement.

The `!important` lint rule is suppressed for `controls.css` because Starlight sets the language selector width via inline style, leaving no other override path. This is a documented constraint, not a pattern to follow elsewhere.

```bash
pnpm lint                   # Check lint + formatting (no changes)
pnpm lint:fix               # Auto-fix lint + formatting
pnpm --filter site check    # Astro type checking
```

## Common commands

```bash
pnpm run local              # Start dev server
pnpm run build              # Production build (run before committing)
pnpm --filter site preview  # Preview production build
pnpm lint                   # Lint and format check
pnpm lint:fix               # Auto-fix lint and formatting
pnpm test                   # Run tests (ai-guidance)
```

## Additional resources

- For detailed Starlight config patterns, see the [official Starlight docs](https://starlight.astro.build/).

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/astro-starlight/SKILL.md
