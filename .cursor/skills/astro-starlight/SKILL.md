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

- Practitioner register (canonical): `apps/site/src/content/docs/` (Starlight-native; `en-us` is the only active locale in the current repo)
- Register content: `apps/site/src/content/register/<register>/<locale>/...` (currently only `register/orientation/en-us/` is active; `everyday` is known to the register registry but unavailable until real content exists)
- Assets (images, fonts): `apps/site/src/assets/`
- Shared modules: `apps/site/src/lib/`
- Seeds (`seeds/`) are development-only sources. They are not the site content tree.
- The site may reference seeds but must not import them as pages.

### Public practice-first boundary

For public content under `apps/site/src/content/**`:

- lead with condition and practice, not repo or agent mechanics
- do not include repo-operation instructions
- keep activation secondary to explanation
- point activation only to mandate lenses or their context seeders
- do not frame repo navigation or repo workflows as activation

The site explains the practice. Mandate lenses activate it. The repo supports
its evolution.

### Authorship boundary for public content

Creating or moving a page does not imply permission to write its prose.

On authored content surfaces in `apps/site/src/content/**`:

- if no source text is provided
- and no explicit drafting request is given

default to:

- title and frontmatter
- correct route placement
- placeholder body
- explicit confirmation before writing prose

The burden is on the agent to justify authorship, not on the operator to forbid
invented prose after the fact.

### Register × locale two-axis model

Locale and register are independent axes in the practice model, but the current repo activates only a small subset of that model.

- **Practitioner** register is the canonical Starlight content in `src/content/docs/`, with `docs/en-us/` as the active locale tree.
- **Orientation** is the only active non-practitioner content tree in the repo today, at `src/content/register/orientation/en-us/`.
- **Everyday** is a known reading register in the registry and route metadata, but it is explicitly unavailable on current routes. Do not scaffold a `register/everyday/` tree or preserve empty placeholder content.
- Other register families may exist conceptually in seeds, but they are not active repo structure. Do not scaffold or preserve them unless the operator explicitly asks.

### Content collections

Two content collections are defined in `content.config.ts`:

- `docs`: Starlight's native collection. Uses `docsLoader()` and `docsSchema()`.
- `register`: Custom collection for non-practitioner register content. Uses Astro's `glob` loader for `**/*.mdx` files in `src/content/register/`.

The current site uses a single prefixed locale key, `en-us`. Content lives in symmetric `en-us` directories under both `docs/` and the active `register/orientation/` tree. There is no `root` locale; Astro's `redirects` config handles `/` → `/en-us/` (301 in dev server, meta-refresh HTML in static build). Do not assume additional locales are present unless you verify them in the current tree and config.

Active content files may also declare register metadata in frontmatter for source
inspectability:

- `docs/**` may use `register: practitioner`
- `register/orientation/**` may use `register: orientation`

This metadata is descriptive and should stay aligned with the collection/path.
Do not use it as the primary source of runtime register logic when the path or
collection already defines the same fact.

## Known pitfalls

These are known pitfalls we’ve hit in this repo. Do not repeat them.

### Image paths in content frontmatter

Astro content collections (`.md`, `.mdx` files in `src/content/`) resolve image paths differently from `.astro` component imports.

- **In frontmatter YAML**: use relative paths from the content file. Example: `../../assets/hero.png`
- **In `.astro` components**: aliases like `~/assets/` or `@/assets/` may work (depending on tsconfig).
- **Do not** use `~/assets/` in frontmatter. It will fail at build time with `[ImageNotFound]`.

### Path alias context rule

Never assume a path alias works in all contexts. Aliases that resolve in module imports (`.ts`, `.astro`) may not resolve in YAML frontmatter, CSS `url()`, or HTML attributes. When in doubt, use a relative path and verify with a build.

### MDX headings with icons

When you need an icon next to an MDX heading (e.g. `### Accessibility` with an icon), do **not** use a component inside the heading. `### <Component />` can lose the heading anchor (`id`) or flatten the component output. Use inline HTML instead: `### <span style="..."><span>Accessibility</span><svg>...</svg></span>`. Duplicate the markup across registers if the heading appears in both practitioner and orientation content. See `docs/guidance/agent-pre-commit-verification.md` for the reasoning trace.

### Accessibility preference contracts must be explicit

When implementing accessibility preferences in site CSS, do not guess the default behavior from a general principle. Verify the product contract first.

For this workspace's current underline-links preference:

- default: links are not underlined across the page
- preference on: all links are underlined across the page

After changing an accessibility preference:

1. verify the default state still matches the intended baseline
2. verify the preference-on state applies everywhere it should
3. verify toggling back off restores the original baseline

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

The theme selector in the header combines both into 4 explicit options. See the "Site-wide visual system" section below for implementation details.

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

The site remains practice-first. Repository links should stay deliberate and
limited to pages that explicitly handle public inspection or activation
surfaces, such as `Act IV` or `Sensible Defaults`.

## Shared modules (`src/lib/`)

Reusable logic lives in `src/lib/` as pure TypeScript modules. Components import from these instead of inlining logic.

| Module | Context | Purpose |
|---|---|---|
| `locale.ts` | Server (frontmatter) | Resolve locale from URL pathname. Single source for locale detection. |
| `i18n.ts` | Server (frontmatter) | Label maps for register names and theme names per locale. |
| `register-registry.js` | Shared server/client | Reading-register registry and availability helpers. Plain JS so Astro config can import route metadata. |
| `register.ts` | Client (`<script>`) | Register state: read, write, localStorage, URL param sync, fallback metadata, event dispatch. |
| `toc.ts` | Client (`<script>`) | Rebuild Starlight ToC for the active register's visible headings. |

**Server vs. client**: `locale.ts` and `i18n.ts` run at build time in Astro frontmatter. `register.ts` and `toc.ts` run in the browser via Vite-processed `<script>` tags.

**Adding a locale**: update `locale.ts` (prefix map), `i18n.ts` (label maps), and `astro.config.mjs` (locales object). For register content, add a new locale folder under each active register in `src/content/register/`.

## Component overrides

Starlight components are overridden via the `components` key in `astro.config.mjs`.
Supporting custom components may be mounted from those overrides:

| Override | File | Purpose |
|---|---|---|
| `SiteTitle` | `src/components/SiteTitle.astro` | Site title with a non-interactive current register indicator. |
| `RegisterFab` | `src/components/RegisterFab.astro` | Floating reading-register control with route-level unavailable states and compact mode. |
| `SocialIcons` | `src/components/SocialIcons.astro` | Renders the public social/profile links shown in the header. |
| `ThemeProvider` | `src/components/ThemeProvider.astro` | Prevents FOUC for `data-theme`, `data-style`, and `data-register` attributes. |
| `ThemeSelect` | `src/components/ThemeSelect.astro` | Extends the selector to 4 explicit theme options with locale-aware labels. |
| `Pagination` | `src/components/LicensePanel.astro` | Wraps default Pagination with LicenseNotice footer. |

### Override principles

1. **Minimal surface.** Only override what Starlight cannot configure. Each override is a maintenance contract that must survive Starlight upgrades.
2. **Single responsibility.** Each component does one thing. SiteTitle shows the register indicator. RegisterFab handles register selection. ThemeSelect handles theme selection. LicensePanel composes Pagination with LicenseNotice.
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

The reading register controls which content variant is visible on each page.

Known registers are:

- `everyday`
- `orientation`
- `practitioner`

Current content availability is smaller than the known registry:

- `practitioner` is the default and comes from the Starlight `docs` collection.
- `orientation` is the active non-practitioner register content tree.
- `everyday` is known but explicitly unavailable until real content exists.

### How it works

1. **Build time**: `RegisterContent.astro` renders available variants into the HTML, wrapped in `[data-register-content="<register>"]` containers.
2. **Route metadata**: `route-map.js` declares available registers, unavailable registers, and the default register for each route.
3. **Before paint**: ThemeProvider's inline script reads `?register=` or `localStorage`, resolves it against route availability, and sets `data-register` plus fallback metadata on `<html>`.
4. **CSS**: Global styles hide inactive variants based on `data-register`.
5. **Floating control**: `RegisterFab.astro` imports from `register.ts` and `toc.ts`. The bottom-right register control calls `setRegister()`, which updates state and dispatches `poc:register-change` on `window`.
6. **Listeners**: The `poc:register-change` event triggers UI updates and ToC rebuild.

### State flow

```
ThemeProvider (inline, sync) → resolves route availability → sets data-register → CSS hides inactive content
RegisterFab (module, deferred) → select → setRegister() → event → UI update + ToC rebuild
```

### Adding register-aware behavior

Listen for the `poc:register-change` event on `window`. The event detail contains the resolved register plus requested/fallback metadata. Do not read `localStorage` directly from components; use the DOM attribute or the event.

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

### Box token contract

Custom box-like surfaces use shared token families defined in `tokens.css`.

- `--poc-box-*` for the calm shared base surface used by box-like elements in a theme
- `--poc-box-control-*` for controls inside those boxes
- `--poc-box-row-*` for neutral row-style controls such as accessibility rows
- `--poc-box-boundary-*` for boundary frames that need a sober semantic shade
- `--poc-box-note-*`, `tip`, `caution`, and `danger` for semantic callouts

When adding a new box, extend the token contract first if needed, then consume
those tokens from the component. Do not duplicate atmospheric light-mode box
overrides across multiple components unless the token contract cannot express
the need.

Default posture: keep the base box surface broadly shared within a theme, then
differentiate type through the highlight system (rail, border, title, and
accent glow), not by tinting every box background differently.

Semantic box accents use one restrained pastel system with fixed hues across
themes. Only adjust presentation variables such as title contrast, lightness,
and opacity for dark vs light rendering. Do not create separate hue logic for
light mode.

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
3. Auditing both atmospheric themes explicitly when custom surfaces or controls changed. Do not assume light mode is solved because token inheritance makes it “acceptable.”
4. Checking mirrored theme entry points against each other. If the homepage, header, accessibility panel, or another surface exposes the same theme choice, they must share one explicit option model.

FOUC regressions are silent — they do not fail the build. The only reliable check is a visual refresh after a clean load (hard refresh or incognito window).

## Control semantics guardrail

When a control label names an action, the primary behavior must match that label.

- If a control says `Copy link`, its primary action should be copying.
- If a control says `Share`, its primary action should be opening a share flow.
- If behavior is mixed or conditional, rename the control or simplify the behavior until the label is honest.

## Linting and formatting

Biome handles linting, formatting, and import organization for `.ts`, `.mjs`, `.js`, `.json`, and `.css` files workspace-wide. Configuration is in `biome.json` at the repo root.

Biome does not process `.astro` files. Astro frontmatter and templates are excluded. This means `.astro` files rely on convention and review rather than automated enforcement.

The `!important` lint rule is suppressed for `controls.css` because Starlight sets the language selector width via inline style, leaving no other override path. This is a documented constraint, not a pattern to follow elsewhere.

```bash
pnpm lint                   # Check lint + formatting (no changes)
pnpm lint:fix               # Auto-fix lint + formatting
pnpm --filter site check    # Astro type checking
```

## Testing

### Unit tests (Vitest)

Unit tests for shared modules live in `apps/site/src/lib/__tests__/`.

- Vitest config: `apps/site/vitest.config.ts`. Default environment is `node`.
- Pure modules (`locale.ts`, `i18n.ts`) run in `node` environment.
- DOM modules (`register.ts`, `toc.ts`) opt in to `happy-dom` via `// @vitest-environment happy-dom` per file.
- File-based content guardrails may also live here when a small declared set of
  public pages needs structural boundary checks. `register-boundaries.test.ts`
  keeps the highest-risk paired register pages aligned on required boundary
  anchors without turning prose review into scoring.
- Shared test constants in `test-constants.ts` define the locale, path, and register matrix. Both unit and E2E tests import from this single source.
- DOM helpers in `dom-helpers.ts` provide functional factory functions for test setup.

### E2E tests (Playwright)

E2E tests live in `apps/site/e2e/`. Playwright config: `apps/site/playwright.config.ts`.

- Run against the built static output (`dist/`) via `pnpm preview`.
- Chromium only. `webServer` config manages preview lifecycle.
- Shared helpers in `e2e/helpers.ts` generate the page matrix and provide assertion functions.

### Route migration test contract

For legacy URL migrations, separate the contracts:

- **Unit tests** prove the route map generates the intended redirect table.
- **E2E tests** prove a legacy public URL lands on the canonical destination.
- Do **not** assert Playwright-observed redirect-chain depth unless the exact
  HTTP hop behavior is itself the product contract and you have verified that
  the runtime exposes that signal reliably.

Preview and static-serving runtimes can land on the correct canonical page
without exposing a stable browser-visible redirect chain. Treat landing on the
canonical URL as the primary route-migration contract unless a lower-level
transport check is explicitly required.

| Spec file | What it covers |
|---|---|
| `register-parity.spec.ts` | Both register content divs exist on every page in the current `en-us` matrix |
| `navigation.spec.ts` | All pages return 200, all internal links resolve |
| `register-toggle.spec.ts` | Floating register control, URL param sync, unavailable states, compact mode, ToC update |
| `locale-switching.spec.ts` | Language selector navigation, locale reachability |
| `installability.spec.ts` | Manifest, icons, maskable, theme-color consistency |

### Test matrix

The current active content matrix is 1 locale x current content paths x available registers, generated from route metadata and arrays in `test-constants.ts`. Register state is a query parameter for non-default registers, not a route segment. Known but unavailable registers, such as `everyday`, are tested as explicit fallback states rather than content variants.

## Installability surface

The app icon comes from the web manifest (`public/site.webmanifest`), not the repo icon, not Astro, not GitHub.

- All manifest-referenced assets live in `apps/site/public/` with absolute path references.
- Maskable icons are required to prevent off-center cropping on Android-like launchers. The maskable safe zone is the inner 80% of the canvas.
- After any icon change: `pnpm run build`, one manual install check in Chrome (clear site data if icon appears cached), and the installability E2E must pass.

## Common commands

```bash
pnpm run local              # Start dev server
pnpm run build              # Production build (run before committing)
pnpm --filter site preview  # Preview production build
pnpm lint                   # Lint and format check
pnpm lint:fix               # Auto-fix lint and formatting
pnpm test                   # Run all unit tests (both packages)
pnpm --filter site test:e2e # Run E2E tests (requires prior build)
```

## Additional resources

- For detailed Starlight config patterns, see the [official Starlight docs](https://starlight.astro.build/).

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/astro-starlight/SKILL.md
