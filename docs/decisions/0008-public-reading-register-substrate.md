# 0008 — Public reading register substrate

**Status:** accepted
**Date:** 2026-05-05
**Supersedes:** none
**PR:** pending

## Context

The public site currently has a binary register model:

- `practitioner`
- `orientation`

That model is implemented as a two-state client toggle, a single orientation
entry in `RegisterContent.astro`, a `hasRegisterPair` route flag, and
`?register=orientation` as the only explicit query state.

The next public content direction needs a smaller substrate before adding more
content. The site should know about the future reading-register set:

- `everyday`: starts from familiar situations
- `orientation`: builds the practice step by step
- `practitioner`: keeps the working detail and trace

It should also preserve the current content reality: practitioner and
orientation exist today, while everyday has not been written. Missing register
variants need to be explicit, visible states rather than silent errors or empty
placeholder content trees.

This decision also needs to preserve a boundary around future navigation work.
Route metadata is useful for the current reading substrate, but it is not the
final graph or navigation model. Any graph or constellation interface needs its
own future ADR.

## Decision

1. Introduce a reading-register registry with `everyday`, `orientation`, and
   `practitioner`.
2. Keep `practitioner` as the effective default for the current public site.
   Routes may declare defaults, but existing routes default to practitioner
   unless they explicitly say otherwise.
3. Replace binary route assumptions such as `hasRegisterPair` with route-level
   register availability metadata:
   - available reading registers
   - explicit absent/unavailable registers
   - default register
4. Keep the existing practitioner and orientation content working.
5. Represent `everyday` as explicitly unavailable in slice one. Do not create
   placeholder `everyday` content.
6. Replace the hidden site-title toggle with a visible reading-register
   selector.
7. Keep repository/source inspection separate from reading registers. Source and
   trace affordances may point to the public node, architecture, or source
   material, but they must never appear as frontend reading-register options.
8. Treat anchors as plural future entry nodes in the design rationale only.
   Slice one does not add anchor-entry metadata.
9. Treat future navigation compatibility as metadata readiness only. Slice one
   does not build graph UI, graph extraction, ranking semantics, or a route-only
   graph model.

## Alternatives considered

**Keep the binary toggle.** Rejected: the UI and state model would keep encoding
the current two-register implementation as if it were the durable architecture.
That would make `everyday` and explicit missing states harder to add safely.

**Bulk-generate everyday pages.** Rejected: the workspace already avoids
placeholder register trees. Adding weak or empty pages would create false
content presence and would conflict with the current launch-surface discipline.

**Treat source inspection as a reading register.** Rejected: repository/source
inspection is a trace affordance, not a voice or readability layer. Mixing it
into the register selector would confuse reading mode with source access.

**Build navigation or graph architecture first.** Rejected: the current task is
the reading-register substrate. Future graph or constellation work may draw from
public content relationships, links, source references, and explicit metadata,
but it requires a dedicated future ADR.

**Install a formal spec framework.** Rejected: repo evidence does not show the
existing ADR, route metadata, schema, and test workflow is insufficient for this
slice.

## Consequences

What improves:

- The public register model becomes explicit instead of binary-by-accident.
- Missing register variants become visible, testable states.
- The current practitioner/orientation content continues to work.
- The URL and localStorage behavior can support all known reading registers.
- Future navigation work is not blocked, but it is not prematurely defined.

What becomes harder:

- Route metadata now has to stay aligned with rendered content.
- The pre-paint register script and client register module both need to preserve
  the same parsing and fallback semantics.
- Tests need to distinguish available, unavailable, unknown, and default
  register states.

What remains deferred:

- Anchor-entry metadata.
- The first anchor-rich signal candidate.
- Graph or constellation extraction.
- Graph or constellation UI.
- Any ranking, centrality, or importance semantics.

## References

- [0002 — Current launch surface and locale reality](0002-current-launch-surface-and-locale-reality.md)
- [`apps/site/src/lib/register.ts`](../../apps/site/src/lib/register.ts)
- [`apps/site/src/components/RegisterContent.astro`](../../apps/site/src/components/RegisterContent.astro)
- [`apps/site/src/components/SiteTitle.astro`](../../apps/site/src/components/SiteTitle.astro)
- [`apps/site/src/components/ThemeProvider.astro`](../../apps/site/src/components/ThemeProvider.astro)
- [`apps/site/src/lib/route-map.js`](../../apps/site/src/lib/route-map.js)
- [`seeds/Translation and Register Guidance.md`](../../seeds/Translation%20and%20Register%20Guidance.md)

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
