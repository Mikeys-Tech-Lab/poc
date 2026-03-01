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
- Seeds (`seeds/`) are development-only sources. They are not the site content tree.
- The site may reference seeds but must not import them as pages.

## Theming workflow

1. Check the installed Starlight version.
2. Use the recommended theming mechanism for that version (typically `astro.config.mjs` or CSS custom properties).
3. Do not override Starlight internals unless official docs recommend it.

## Common commands

```bash
pnpm --filter site dev       # Start dev server
pnpm --filter site build     # Production build
pnpm --filter site preview   # Preview production build
```

## Additional resources

- For detailed Starlight config patterns, see [reference.md](reference.md) (created when needed).
