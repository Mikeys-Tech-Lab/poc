# PoC Testing Contract And Verification Boundary

**Status:** draft
**Date:** 2026-05-09
**Trigger class:** required
**Scope:** tooling | content | workspace
**Origin trace:** Operator handover requesting a PoC reflection on testing
strategy, CI/CD clarity, and the boundary between structural verification and
editorial judgment.
**Activation trace:** Sensible Defaults lens loaded for delivery-reality
framing. Industry testing research was used to compare external patterns against
the repo's actual structure.
**Related PR:** pending

## Why this record exists

The testing audit exposed a durable boundary that future work needs to preserve.

The PoC already has meaningful structural verification. It checks buildability,
routing, redirects, links, register behavior, activation wiring, selected
accessibility contracts, guidance drift invariants, selected boundary phrases,
and public-node consistency.

It does not verify article truth, rhetorical quality, source interpretation,
pedagogical fit, political clarity, or publication readiness.

That distinction needs to be explicit so CI does not become authority theater.

## What was observed

- The current CI/CD surface is structurally coherent.
- The checks mostly protect deterministic public-node contracts.
- The newly added `pnpm license:check` CI step fits that posture because it
  verifies a tracked source-surface contract.
- Exact phrase checks are useful only when they protect named public boundaries.
- Article quality remains outside deterministic CI.
- Existing advisory LLM review is already correctly bounded as non-blocking and
  non-authoritative.

## Missed assumptions

- A broad test suite could be mistaken for evidence that public writing is
  meaningful, grounded, or ready.
- Phrase-level tests could expand from boundary protection into brittle prose
  freezing.
- Adding more automated review could look like rigor while only spending tokens
  on judgment-shaped output.
- CI/CD clarity was visible in implementation but not yet named as a testing
  contract.

## Missed guidance

The workspace had guidance for deterministic drift checks, license surfaces, and
advisory review.

What was missing was a concise testing strategy that says:

```text
CI owns structure.
Human/source review owns meaning.
Advisory AI review may assist, but does not decide.
```

## Structural gap

This is a verification-boundary gap.

The failure mode is:

- a repository gains useful deterministic checks
- the checks pass reliably
- passing CI begins to feel like proof of public meaning
- automation starts carrying editorial authority it cannot honestly hold

The structural correction is to name what CI can prove and what it cannot.

## Proposed evolution

- Keep CI focused on deterministic structural contracts.
- Keep article meaning, public claims, political framing, and publication
  readiness in human/source review.
- Keep advisory AI review non-blocking and non-authoritative.
- Allow exact prose tests only for named public boundaries.
- Do not add blocking LLM CI for article quality without a separate decision
  record that names criteria, cost, failure behavior, and human review
  boundaries.

## Research delta

Industry testing guidance aligned with the repo's direction:

- testing strategy should fit the product and users, not a fixed pyramid shape
- tests should establish clear boundaries and fail for useful reasons
- broad snapshots or phrase locks become waste when they do not encode intent
- automated accessibility and content checks assist review but do not replace
  human judgment
- LLM evaluation requires explicit criteria, data, cost models, and human
  oversight

The repo implication is conservative: strengthen deterministic contracts, but do
not add a model-based article gate now.

## Propagation decision

Update operational surfaces now.

This does not require a canon rewrite or a new ADR. The needed propagation is a
guidance document that future contributors can use when deciding whether a new
test belongs in CI.

## Surfaces updated

- `.github/workflows/test.yml`
- `docs/guidance/testing-strategy.md`
- `docs/guidance/README.md`
- `docs/guidance/evolution-records/2026-05-09-poc-testing-contract-verification-boundary.md`

## Verification

Verify the current contract with deterministic checks:

- `pnpm license:check`
- `pnpm guidance:check`

Broader build and E2E checks remain the right verification when site content,
route behavior, register behavior, or frontend behavior changes.

## PR-visible learning trace

The testing reflection classified this as required because it exposed a durable
verification-boundary lesson.

CI can prove that the public node is structurally intact. It cannot prove that
the public writing is true, clear, grounded, politically responsible, or ready
for publication. The branch therefore documents the testing contract and keeps
LLM review advisory rather than adding a blocking model-based gate.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
