# 0002 — Current launch surface and locale reality

**Status:** accepted
**Date:** 2026-03-13
**Supersedes:** [0001](0001-root-locale-and-register-restructure.md)
**PR:** pending

## Context

ADR 0001 captured an earlier structural direction: root-locale routing, `/` as the en-US surface, and placeholder directories for future register families. The repo no longer matches that shape.

The current site configuration keeps `en-us` as the active locale prefix and redirects `/` to `/en-us/`. The active content tree is intentionally small for the initial release: practitioner content under `src/content/docs/en-us/`, orientation content under `src/content/register/orientation/en-us/`, and no placeholder directories for inactive register families.

Because the repo had evolved without an explicit superseding ADR, later docs and skills started mixing current reality with older structure and future-state assumptions.

## Decision

1. **Keep the symmetric `en-us` route structure.** The public site remains prefixed at `/en-us/`, with `/` redirecting there.
2. **Treat only active content trees as repo structure.** The current repo contains practitioner content at `src/content/docs/en-us/` and orientation content at `src/content/register/orientation/en-us/`.
3. **Remove inactive register-family placeholders from the repo.** Conceptual future register families may still exist in seeds or planning, but they are not kept as empty directories in the active site tree.
4. **Describe only current, implemented surfaces in public copy, guidance, and docs.** Future sequencing may be discussed, but repo structure, workflows, and available routes must be stated from verified present reality.

## Alternatives considered

**Leave 0001 as the standing architectural truth.** Rejected: it describes routing and register structure the repo no longer implements, which turns historical rationale into present-tense misinformation.

**Quietly revise 0001 in place.** Rejected: the ADR policy says accepted ADRs are immutable. A superseding ADR preserves trace instead of rewriting history.

**Keep empty future register-family directories as placeholders.** Rejected: they create false structural presence in the initial release and encourage agents to preserve inactive surfaces as if they were live requirements.

## Consequences

**What improves:**
- The ADR trail once again matches the live app/config/test layer.
- Guidance and docs can anchor to a small verified launch surface instead of a speculative larger one.
- Future expansion remains possible, but it must be reintroduced explicitly rather than lingering as dead scaffolding.

**What becomes explicit:**
- `/en-us/` is the active public prefix.
- `orientation` is the only active non-practitioner register family in the repo today.
- Future register families and broader locale sets are planning material, not current repo structure.

## References

- [0001](0001-root-locale-and-register-restructure.md)
- [`apps/site/astro.config.mjs`](../../apps/site/astro.config.mjs)
- [`apps/site/src/lib/__tests__/test-constants.ts`](../../apps/site/src/lib/__tests__/test-constants.ts)
- [`apps/site/src/content/docs/en-us/`](../../apps/site/src/content/docs/en-us/)
- [`apps/site/src/content/register/orientation/en-us/`](../../apps/site/src/content/register/orientation/en-us/)

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
