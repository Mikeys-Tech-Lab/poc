# 0009 — Structural signals and route-scoped everyday activation

**Status:** accepted
**Date:** 2026-05-09
**Supersedes:** none
**PR:** pending

## Context

The public site already has a `Signals` area for named conditions and practice
paths. It does not yet have a neutral shelf for structural public signals that
are not operational notes, release notes, or repository updates.

The register substrate also knows three reading registers:

- `everyday`
- `orientation`
- `practitioner`

ADR 0008 deliberately kept `everyday` unavailable until real content existed.
That preserved honesty, but it also meant the three-register model was not yet
exercised by any route.

The next content surface needs a place that can be prepared without publishing
individual structural signals early or exposing preparation context.

## Decision

1. Add `Signals > Structural` as the public information architecture home for
   structural signals.
2. Use `signals/structural/` as the stable overview route.
3. Keep the page generic. It defines the shelf and reading contract, not any
   specific future signal.
4. Activate `everyday` only for the Structural overview route by adding
   real `everyday`, `orientation`, and `practitioner` content for that route.
5. Keep the global default register availability unchanged:
   `practitioner` and `orientation` available, `everyday` explicitly
   unavailable.
6. Generalize `RegisterContent.astro` so routes can provide more than one
   alternate register entry while existing orientation-only pages continue to
   work.
7. Preserve the query-parameter fallback contract. If a reader asks for
   `?register=everyday` on a route where everyday is not available and
   orientation exists, the site renders orientation, preserves
   `?register=everyday`, and shows the visible fallback state.

## Alternatives considered

**Top-level `Publications`.** Rejected. It names the distribution form instead
of the public meaning of the page. The current site is practice-first and
signal-first, so a generic publications shelf would pull the IA toward a blog
model before the content structure needs one.

**`Signals > Publications`.** Rejected. It mixes the conceptual category
(`Signals`) with a publishing channel label. That would become ambiguous once
the section contains signal definitions, paths, structural signals, and
possible mirrors of external publications.

**Activate `everyday` globally.** Rejected. Most existing routes do not have
everyday content. Making everyday globally available would create false content
presence and break the explicit-unavailable contract from ADR 0008.

**Wait until individual signals are ready.** Rejected. The route and register
contract can be prepared honestly with a generic overview. This lets the public
surface and tests carry the intended structure before individual signals are
added.

## Consequences

What improves:

- The site gains a clear public shelf for structural signals.
- The three-register model is exercised by one real route.
- Existing routes keep their current fallback behavior for unavailable
  everyday content.
- The sidebar, route map, content tree, and tests now encode route-specific
  register availability.

What becomes harder:

- Register tests can no longer assume every page has the same available
  registers.
- Documentation must distinguish global default availability from
  route-specific availability.
- `RegisterContent.astro` now carries a more general alternate-register API.

What remains deferred:

- Additional structural signals.
- Any external publication mirror strategy.
- Any graph, constellation, or anchor-entry navigation model.

## References

- [0008 — Public reading register substrate](0008-public-reading-register-substrate.md)
- [`apps/site/src/components/RegisterContent.astro`](../../apps/site/src/components/RegisterContent.astro)
- [`apps/site/src/lib/route-map.js`](../../apps/site/src/lib/route-map.js)
- [`apps/site/astro.config.mjs`](../../apps/site/astro.config.mjs)

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
