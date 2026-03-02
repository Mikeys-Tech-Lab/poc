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

- Do not manually set `--sl-color-accent*` or `--sl-color-gray-*` CSS custom properties. Catppuccin owns these. Override only layout/component-specific properties in `custom.css`.
- Dark flavor options: `frappe`, `macchiato`, `mocha`. Light flavor: `latte` only.
- Accent options: `lavender`, `blue`, `sapphire`, `sky`, `teal`, `green`, `yellow`, `peach`, `maroon`, `red`, `mauve`, `pink`, `flamingo`, `rosewater`.
- To change flavor or accent, edit the plugin config in `astro.config.mjs`. Do not create separate theme CSS files.
- After changing theme config, run `pnpm run build` to verify. The plugin generates theme CSS at build time.

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

### SocialIcons (LinkedIn)

`src/components/SocialIcons.astro` extends the default Starlight `SocialIcons` component to add a LinkedIn icon. It is registered in `astro.config.mjs` under `components.SocialIcons`. The LinkedIn URL comes from `consts.ts`.

To add another social icon, follow the same pattern: append an `<a>` with an inline SVG after the `<Default>` slot.

## Common commands

```bash
pnpm run local              # Start dev server
pnpm run build              # Production build (run before committing)
pnpm --filter site preview  # Preview production build
```

## Additional resources

- For detailed Starlight config patterns, see the [official Starlight docs](https://starlight.astro.build/).
