# 0001 — Root locale and register restructure

**Status:** accepted
**Date:** 2026-03-06
**PR:** [#60](https://github.com/Mikeys-Tech-Lab/poc/pull/60)

## Context

The Astro Starlight site used a named locale key (`'en-us'`) for the default language. This forced a `/en-us/` URL prefix on all English (US) content and required a meta-refresh redirect page at `/` to send visitors to `/en-us/`. The redirect added latency and was not the native Starlight pattern.

Separately, register content (the non-practitioner voice) lived in a flat `src/content/beginner/` directory with locale subdirectories. The Practice defines locale and register as two independent axes (`seeds/Translation and Register Guidance.md`), with multiple register families planned: orientation, low-cognitive-load, institutional-interface, public, and short-form. The `beginner/` directory name did not match the seed taxonomy, and the flat structure could not scale to multiple registers.

This was a **pre-release** site with no public traffic. No users had bookmarks, cached URLs, or persisted `localStorage` values. This shaped the cost calculus: migration complexity had zero benefit.

## Decision

1. **Root locale**: change the Starlight `locales` key from `'en-us'` to `root` so en-US content is served at `/` without prefix. Delete the redirect page.

2. **Register directory**: move register content from `beginner/<locale>/...` to `register/orientation/<locale>/...`. Each register keeps explicit locale subdirectories. Create placeholder directories (with `.gitkeep`) for future register families.

3. **Register rename**: rename `beginner` to `orientation` across the full stack — content collection, component props, client state, URL parameter, localStorage value, CSS selectors, i18n labels. Hard break: `?register=beginner` no longer works.

## Alternatives considered

**Keep the redirect page.** This preserves the existing URL structure but adds unnecessary indirection. Starlight's `root` locale is the intended pattern for a prefix-free default language. Rejected: the redirect page existed only because of a non-standard locale configuration.

**Alias `beginner` to `orientation`.** The client-side `parseRegister` function could accept both values during a transition period. Rejected: adds code complexity for a pre-release site with no existing users. There is no migration debt to manage.

**Consolidate en-US content into the register root.** Instead of `register/orientation/en-us/about/...`, place en-US content directly at `register/orientation/about/...` (matching how the `docs/` collection uses `root` for en-US). Rejected: each register is multilingual, and explicit locale folders maintain structural consistency across all registers. The `root` locale pattern is a Starlight-specific convention for the `docs` collection, not a general content organization pattern.

## Consequences

**What improves:**
- En-US content loads at `/` without redirect, matching Starlight best practice
- Register directory structure scales to all planned register families
- Register naming aligns with the seed taxonomy

**What breaks:**
- All `/en-us/` URLs are gone (content now at `/`)
- `?register=beginner` silently falls back to practitioner
- Stored `poc-register=beginner` in localStorage silently reverts to practitioner

**What these breaks cost:**
- Nothing. Pre-release site, no public traffic, no deployed bookmarks. The breaks are structurally real but operationally costless.

## References

- PR: [#60](https://github.com/Mikeys-Tech-Lab/poc/pull/60)
- Seed: `seeds/Translation and Register Guidance.md` (register families, locale-register independence)
- Starlight docs: root locale pattern

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
