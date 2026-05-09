# Structural Essay Publication Boundary And Module Ownership

**Status:** draft
**Date:** 2026-05-09
**Trigger class:** required
**Scope:** content | architecture | tooling
**Origin trace:** Operator request to publish the first structural essay across practitioner, orientation, and everyday registers without leaking private intake paths or draft workflow metadata, followed by iterative corrections around source presentation, leak-guard posture, and module placement.
**Activation trace:** Sensible Defaults lens loaded during the final rename, review, and reflection pass. The lens was used to expose hidden delivery work across QA, security, documentation, and module-boundary cleanup.
**Related PR:** pending

## Why this record exists

The first structural essay publication was not only a prose-promotion task.

It exposed a durable pattern for how this workspace needs to publish essays that
carry shared support material such as source ledgers, further reading, and
anchor maps while preserving the public/private boundary.

It also exposed a second pattern. A working implementation can still place data
in the wrong layer. The essay initially shipped with public support data in
`src/lib/`, then had to be refactored so route mechanics stayed in `lib` while
public essay support data moved into the content layer.

## What was observed

- Publishing a structural essay activates more than content writing. It also
  activates route wiring, register parity, source presentation, anchor reuse,
  leak prevention, QA review, and documentation evolution.
- Public source and anchor data needed to be reusable across the practitioner
  page, alternate registers, and overview surfaces.
- Deterministic leak guards were necessary and useful, but they only held
  safely after private literal patterns were treated as secret-fed inputs rather
  than public repo content.
- The initial module placement worked technically, but it mixed public support
  data with site mechanics in `src/lib/structural-essays/`.
- The later refactor clarified the right ownership split:
  - `apps/site/src/content/structural-essays/<locale>/*.data.ts` for shared
    public essay support data
  - `apps/site/src/lib/structural-essays/` for route mechanics and other
    non-prose helpers
- A remaining essay-specific helper filename also became misleading after the
  data was moved. Renaming it to `essay-route.ts` made the residual
  responsibility explicit.

## Missed assumptions

- It was initially assumed that a single essay-specific module under `src/lib/`
  was acceptable because the behavior was correct.
- It was initially assumed that private leak patterns could be represented as
  ordinary repo-visible test data rather than secret-backed operator or CI
  inputs.
- It was easy to underestimate how much QA and readability work would still be
  required after the first implementation technically passed.
- The branch risked treating a passing verification suite as evidence that the
  publication layer itself was finished. It was not.

## Missed guidance

The workspace already had strong guidance for deterministic verification
boundaries, register structure, and documentation evolution.

What was missing at execution time was an explicit essay-support-data pattern:

- where shared public essay support data should live
- how that data should relate to locale and register layers
- how route mechanics should stay separate from public support material

The branch resolved that pattern concretely even though the rule was not named
up front.

## Structural gap

This belongs to a module-ownership and publication-boundary gap.

The failure mode is:

- a content feature needs shared structured support data
- that data gets placed in a convenient mechanics folder
- the implementation works
- future essays inherit a muddled boundary between public content data and site
  plumbing

The same branch also exposed a delivery-shape gap. "Publish the essay" sounded
like content work, but in practice it required coordinated changes across
content, components, tests, secrets posture, review, and architecture
description.

## Proposed evolution

- Treat each structural essay as a publication unit with its own locale-scoped
  shared data module under `apps/site/src/content/structural-essays/`.
- Keep structural essay route helpers in `apps/site/src/lib/structural-essays/`
  and name them by responsibility, not by essay slug, once the helper is no
  longer essay-specific.
- Keep source ledgers, further reading, and anchor maps as shared public support
  data, not MDX frontmatter and not `src/lib/` payloads.
- Keep private leak patterns secret-backed in CI and operator-local contexts,
  with deterministic tests scanning both source and generated output.
- Keep QA review explicitly separate from deterministic CI. CI proves structure.
  QA/source review still owns readability, grounding, and public fit.

## Research delta

None.

## Propagation decision

Update operational surfaces now.

This work does not need an ADR. The lesson is about operational file ownership
and publication posture, not a new core architecture decision.

The right propagation is:

- record the lesson in this Evolution Record
- keep the architecture doc aligned with the new content-layer boundary
- carry the module-ownership lesson into future essay work on this branch and in
  the eventual PR context
- defer full multi-locale helper generalization until a second locale or essay
  creates real pressure for it

## Surfaces updated

- `apps/site/src/content/structural-essays/en-us/ai-is-not-magic-it-is-a-mirror-with-a-motor.data.ts`
- `apps/site/src/content/structural-essays/types.ts`
- `apps/site/src/lib/structural-essays/essay-route.ts`
- `apps/site/src/lib/__tests__/structural-essay-publication.test.ts`
- `apps/site/e2e/public-output-boundary.spec.ts`
- `docs/architecture/workspace.md`
- `docs/guidance/evolution-records/2026-05-09-structural-essay-publication-boundary-and-module-ownership.md`

## Verification

Verify the boundary through deterministic checks and explicit review:

- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm --filter site check`
- with `POC_PRIVATE_LEAK_PATTERNS` provided through the local environment or a
  CI secret: `pnpm --filter site test:e2e`
- read-only QA, boundary, and maintainability review over the changed surfaces

## PR-visible learning trace

This branch added the first structural essay and then had to clean up the
boundary it exposed.

The durable lesson is that shared public essay support data belongs in the
content layer, while route mechanics belong in `src/lib/`. The branch also
confirmed that private leak guards should stay deterministic but secret-backed,
and that passing CI is necessary structural evidence, not proof that the public
essay is fully reviewed.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
