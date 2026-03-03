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

- Site content: `apps/site/src/content/docs/`
- Assets (images, fonts): `apps/site/src/assets/`
- Seeds (`seeds/`) are development-only sources. They are not the site content tree.
- The site may reference seeds but must not import them as pages.

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

Repository and social URLs live in `apps/site/src/consts.ts`. Use these constants in `.mjs`, `.ts`, and `.astro` files instead of hardcoding URLs.

```ts
import { REPO, LINKEDIN } from "./src/consts";
```

### Constraint: plain Markdown content files cannot import constants

Files in `src/content/docs/` that use `.md` (not `.mdx`) cannot import TypeScript modules. Any GitHub URLs in those files must be hardcoded. If the repo moves or renames, these links break silently.

Affected files (as of v0.1.0): `about/how-to-use.md`, `guides/sensible-defaults.md`.

To find all hardcoded repo URLs: search for `github.com/Mikeys-Tech-Lab` in `src/content/docs/`.

## Component overrides

Three Starlight components are overridden via the `components` key in `astro.config.mjs`:

| Override | File | Purpose |
|---|---|---|
| `SocialIcons` | `src/components/SocialIcons.astro` | Adds a LinkedIn icon after the default social icons |
| `ThemeProvider` | `src/components/ThemeProvider.astro` | Prevents FOUC for both `data-theme` and `data-style` attributes |
| `ThemeSelect` | `src/components/ThemeSelect.astro` | Extends the selector to 5 options (Dark, Light, Auto, Dark Solid, Light Solid) |

### Override pattern

Each override imports the default Starlight component, renders it via `<Default>`, then adds or replaces behavior:

```astro
---
import Default from '@astrojs/starlight/components/ComponentName.astro';
---
<Default><slot /></Default>
<!-- additional markup -->
```

ThemeProvider and ThemeSelect do not render the default — they fully replace the component's markup and script.

### Adding an override

1. Copy the original from `node_modules/@astrojs/starlight/components/`.
2. Place your version in `src/components/`.
3. Register it in `astro.config.mjs` under `components`.
4. Run `pnpm run build` to verify.

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

## Common commands

```bash
pnpm run local              # Start dev server
pnpm run build              # Production build (run before committing)
pnpm --filter site preview  # Preview production build
```

## Additional resources

- For detailed Starlight config patterns, see the [official Starlight docs](https://starlight.astro.build/).
