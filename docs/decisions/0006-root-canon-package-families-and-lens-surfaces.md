# 0006 — Root canon package families and lens surfaces

**Status:** accepted
**Date:** 2026-04-03
**Supersedes:** none
**PR:** pending

## Context

The promotion of the new Practice of Clarity release introduces two new root
package families from the source material: continuity anchors and mandate lens
packages.

The live repo already has a stable root reality:

- `seeds/` exists at the repo root
- seed formatting and licensing already follow the live PoC conventions
- `docs/practices/sensible-defaults.md` had been reading like the full lens text
- there is no nested `root/` directory in the live repo

Without an explicit decision, promotion would leave three kinds of drift:

1. a source-tree `root/` wrapper that does not match the live repo
2. `docs/practices/sensible-defaults.md` competing with a new canonical lens
   package
3. root artifacts arriving with staging metadata and formatting that do not
   match the live PoC canon

## Decision

1. **Keep `seeds/` at the repo root.** Do not introduce a nested `root/`
   wrapper and do not move seeds into another package surface.
2. **Add `continuity/` and `mandateLenses/` as sibling top-level directories.**
   They join `seeds/` as root canon package families.
3. **Treat `mandateLenses/SensibleDefaults/lens.md` as the canonical lens
   artifact.** Treat `mandateLenses/SensibleDefaults/context-seeder.md` as the
   derivative portable runtime entry.
4. **Treat `docs/practices/sensible-defaults.md` as a derived explainer and
   bridge only.** It must point back to the canonical lens package instead of
   presenting itself as the runtime source of truth.
5. **Use the live PoC authored format and licensing style as the baseline for
   promoted root artifacts.** Preserve package identity and canonical
   relationships, but do not import staging-only YAML metadata as-is.

## Alternatives considered

**Preserve the source `root/` subtree as a nested directory.** Rejected: it
would import a staging structure that does not match the live repo and would
create unnecessary path drift.

**Move `seeds/` into a new root package wrapper.** Rejected: the live repo
already treats root-level `seeds/` as canonical, and moving them would create
path churn without improving the architecture.

**Keep `docs/practices/sensible-defaults.md` as the full canonical lens text.**
Rejected: it would create competing sources of truth once the canonical lens
package exists in `mandateLenses/`.

## Consequences

**What improves:**
- Root canon gains a coherent sibling structure: `seeds/`, `continuity/`, and
  `mandateLenses/`.
- The Sensible Defaults runtime surface becomes explicit instead of implied.
- Public bridge docs can point to canonical runtime artifacts without pretending
  to be them.
- Existing seed paths, licensing, and authored format remain stable.

**What becomes harder:**
- Repo docs, rules, onboarding, and architecture surfaces must be updated in
  the same change so they do not keep describing the earlier structure.
- Future promotions need to respect the distinction between canonical root
  artifacts and derived explainers.

## References

- [`AGENTS.md`](../../AGENTS.md)
- [`README.md`](../../README.md)
- [`continuity/README.md`](../../continuity/README.md)
- [`mandateLenses/README.md`](../../mandateLenses/README.md)
- [`mandateLenses/SensibleDefaults/lens.md`](../../mandateLenses/SensibleDefaults/lens.md)
- [`mandateLenses/SensibleDefaults/context-seeder.md`](../../mandateLenses/SensibleDefaults/context-seeder.md)
- [`docs/practices/sensible-defaults.md`](../practices/sensible-defaults.md)

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
