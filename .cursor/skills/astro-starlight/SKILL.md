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

These are verified mistakes. Do not repeat them.

### Image paths in content frontmatter

Astro content collections (`.md`, `.mdx` files in `src/content/`) resolve image paths differently from `.astro` component imports.

- **In frontmatter YAML**: use relative paths from the content file. Example: `../../assets/hero.png`
- **In `.astro` components**: aliases like `~/assets/` or `@/assets/` may work (depending on tsconfig).
- **Do not** use `~/assets/` in frontmatter. It will fail at build time with `[ImageNotFound]`.

### Path alias context rule

Never assume a path alias works in all contexts. Aliases that resolve in module imports (`.ts`, `.astro`) may not resolve in YAML frontmatter, CSS `url()`, or HTML attributes. When in doubt, use a relative path and verify with a build.

## Build verification gate

Any change to assets, config, content structure, or frontmatter must be followed by `pnpm run build` before committing. Do not commit without a passing build.

If the build fails, fix the issue before committing. Do not commit broken builds.

## Theming workflow

1. Check the installed Starlight version.
2. Use the recommended theming mechanism for that version (typically `astro.config.mjs` or CSS custom properties).
3. Do not override Starlight internals unless official docs recommend it.

## Common commands

```bash
pnpm run local              # Start dev server
pnpm run build              # Production build (run before committing)
pnpm --filter site preview  # Preview production build
```

## Additional resources

- For detailed Starlight config patterns, see the [official Starlight docs](https://starlight.astro.build/).
