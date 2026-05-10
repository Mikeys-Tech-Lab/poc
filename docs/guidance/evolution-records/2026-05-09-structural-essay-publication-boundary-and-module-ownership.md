# Structural Essay Publication Boundary And Module Ownership

**Status:** draft
**Date:** 2026-05-09
**Trigger class:** required
**Scope:** content | architecture | tooling
**Origin trace:** Operator request to publish the first structural essay across practitioner, orientation, and everyday registers without leaking private intake paths or draft workflow metadata, followed by iterative corrections around source presentation, leak-guard posture, and module placement.
**Activation trace:** Sensible Defaults lens loaded during the final rename, review, and reflection pass. The lens was used to expose hidden delivery work across QA, security, documentation, and module-boundary cleanup.
**Related PR:** https://github.com/Mikeys-Tech-Lab/poc/pull/191

## Why this record exists

The first structural essay publication was not only a prose-promotion task.

It exposed a durable pattern for how this workspace needs to publish essays that
carry shared support material such as source ledgers, further reading, and
anchor maps while preserving the public/private boundary.

It also exposed a second pattern. A working implementation can still place data
in the wrong layer. The essay initially shipped with public support data in
`src/lib/`, then had to be refactored so route mechanics stayed in `lib` while
public essay support data moved into the content layer.

It later exposed a third pattern. Close-phase publication cleanup can still
surface durable lessons after the main architecture fix looks complete. In this
branch that meant deciding whether the retired essay frame should survive in
redirect and route-id compatibility surfaces, and tightening a flaky
hash-navigation check so CI measured the navigation contract rather than smooth
scroll timing.

## What was observed

- Publishing a structural essay activates more than content writing. It also
  activates route wiring, register parity, source presentation, anchor reuse,
  leak prevention, QA review, and documentation evolution.
- The branch was mostly atomic, not cleanly atomic. The initial feature commit
  `4fd6967` was large but still mostly coherent around first publication, while
  later commits mixed in correction classes unevenly.
- Several follow-up commits were clean single-purpose corrections:
  `fd76952`, `6bfe4c7`, `3accada`, and `2a0b491`.
- At least two commits were overloaded across concerns, `52535d9` and
  `328b5dc`, and `f23c8c1` landed as a mixed corrective pass rather than a
  single isolated lesson.
- Public source and anchor data needed to be reusable across the practitioner
  page, alternate registers, and overview surfaces.
- Deterministic leak guards were necessary and useful, but they only held
  safely after private literal patterns were treated as secret-fed inputs rather
  than public repo content.
- The initial module placement worked technically, but it mixed public support
  data with site mechanics in `src/lib/structural-essays/`.
- Technical verification came earlier than enough QA and readability review.
  Layout instability and later source-grounding corrections proved that "it
  passes" was not the same as "it is publication-ready."
- The later refactor clarified the right ownership split:
  - `apps/site/src/content/structural-essays/<locale>/*.data.ts` for shared
    public essay support data
  - `apps/site/src/lib/structural-essays/` for route mechanics and other
    non-prose helpers
- A remaining essay-specific helper filename also became misleading after the
  data was moved. Renaming it to `essay-route.ts` made the residual
  responsibility explicit.
- The later concept migration showed that public framing changes can leave
  residue outside prose. The old essay frame still existed in the redirect path
  and stable internal route id until a separate keep-or-remove decision was
  made.
- The final failing PR check came from navigation-test scope, not a broken
  public page. The broad hash-link sweep was treating scroll landing under
  smooth scrolling as a generic integrity check.
- The correction worked best when the responsibilities were split cleanly:
  broad navigation verifies hash resolution and visible target existence, while
  focused ToC tests verify landed heading position under reduced motion.

## Missed assumptions

- It was initially assumed that a single essay-specific module under `src/lib/`
  was acceptable because the behavior was correct.
- It was initially assumed that private leak patterns could be represented as
  ordinary repo-visible test data rather than secret-backed operator or CI
  inputs.
- It was easy to underestimate how much QA and readability work would still be
  required after the first implementation technically passed.
- It was also easy to underestimate layout stability work. The branch treated
  early rendering success as stronger evidence than it was, then needed later
  layout fixes.
- The source-grounding pass arrived late. NIST and related support material
  needed a dedicated review earlier instead of appearing as a late corrective
  adjustment.
- The branch risked treating a passing verification suite as evidence that the
  publication layer itself was finished. It was not.
- The branch also assumed atomicity would emerge naturally from iterative
  cleanup. It did not. Without explicit commit boundaries, correction classes
  started to bundle together.
- It was also assumed the old essay redirect and internal route id could remain
  as neutral compatibility scaffolding after the public concept changed. In this
  branch they still carried the retired frame and needed an explicit operator
  decision.
- It was assumed a broad navigation sweep could safely assert scroll landing
  across smooth-scrolling pages. That overfit the test to motion timing instead
  of the structural navigation contract.

## Missed guidance

The workspace already had strong guidance for deterministic verification
boundaries, register structure, and documentation evolution.

What was missing at execution time was an explicit essay-support-data pattern:

- where shared public essay support data should live
- how that data should relate to locale and register layers
- how route mechanics should stay separate from public support material

The branch resolved that pattern concretely even though the rule was not named
up front.

The branch also lacked an explicit navigation-test scope rule:

- broad navigation sweeps should verify path or hash resolution plus target
  existence
- focused specs should own scroll landing behavior, ideally under reduced
  motion when the product already supports that accessibility contract

## Structural gap

This belongs to a module-ownership, migration-completeness,
publication-boundary, navigation-test-scope, and commit-discipline gap.

The failure mode is:

- a content feature needs shared structured support data
- that data gets placed in a convenient mechanics folder
- the implementation works
- future essays inherit a muddled boundary between public content data and site
  plumbing
- the branch then accumulates layout, QA/readability, and source-grounding
  corrections
- those corrections are not always split by concern, so the commit history
  becomes only mostly atomic instead of cleanly reviewable

The same branch also exposed a delivery-shape gap. "Publish the essay" sounded
like content work, but in practice it required coordinated changes across
content, components, tests, secrets posture, review, and architecture
description.

A later close-phase pass exposed a second reusable failure mode:

- copy and file renames land
- compatibility redirects and internal ids still carry the retired frame
- CI then fails in a broad navigation sweep because the test is asserting
  motion semantics rather than structural navigation integrity
- close-phase energy gets spent triaging false-negative timing behavior instead
  of simply confirming the publication contract

## Proposed evolution

- Treat each structural essay as a publication unit with its own locale-scoped
  shared data module under `apps/site/src/content/structural-essays/`.
- Keep structural essay route helpers in `apps/site/src/lib/structural-essays/`
  and name them by responsibility, not by essay slug, once the helper is no
  longer essay-specific.
- Keep source ledgers, further reading, and anchor maps as shared public support
  data, not MDX frontmatter and not `src/lib/` payloads.
- When a public concept migration changes titles, slugs, or canonical framing,
  decide explicitly whether redirects and stable internal ids are compatibility
  surfaces to keep or conceptual residue to remove. Do not leave the branch
  half-migrated by accident.
- Keep private leak patterns secret-backed in CI and operator-local contexts,
  with deterministic tests scanning both source and generated output.
- Keep QA review explicitly separate from deterministic CI. CI proves structure.
  QA/source review still owns readability, grounding, and public fit.
- Keep broad navigation sweeps structural: same-origin paths resolve, hashes
  update, and visible targets exist.
- Keep scroll-landing assertions in focused specs, and run them under reduced
  motion when the product already exposes that path as a first-class
  accessibility contract.
- For future essay branches, isolate correction classes into separate commits:
  module ownership, layout stability, source-grounding, and QA/readability
  should not share a cleanup commit unless the dependency is inseparable.
- Treat large initial publication commits as acceptable only when the scope is
  still coherent. After that point, prefer smaller corrective commits that map
  one lesson to one reviewable change.

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

- `apps/site/src/content/structural-essays/en-us/ai-is-not-magic-it-is-a-cognitive-amplifier.data.ts`
- `apps/site/src/content/structural-essays/types.ts`
- `apps/site/src/lib/structural-essays/essay-route.ts`
- `apps/site/src/lib/route-map.js`
- `apps/site/src/lib/__tests__/structural-essay-publication.test.ts`
- `apps/site/e2e/navigation.spec.ts`
- `apps/site/e2e/register-toggle.spec.ts`
- `apps/site/e2e/public-output-boundary.spec.ts`
- `docs/architecture/workspace.md`
- `docs/guidance/evolution-records/2026-05-09-structural-essay-publication-boundary-and-module-ownership.md`

## Verification

Verify the boundary and navigation contract through deterministic checks and
explicit review:

- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm --filter site check`
- with `POC_PRIVATE_LEAK_PATTERNS` provided through the local environment or a
  CI secret: `pnpm --filter site test:e2e`
- read-only QA, boundary, and maintainability review over the changed surfaces

## PR-visible learning trace

This branch added the first structural essay and then had to clean up the
boundary, layout, grounding, migration-residue, and navigation-test-scope
issues the publication exposed.

The durable lesson is that shared public essay support data belongs in the
content layer, while route mechanics belong in `src/lib/`. The branch also
confirmed that private leak guards should stay deterministic but secret-backed,
and that passing CI is necessary structural evidence, not proof that the public
essay is fully reviewed.

The commit audit adds a second lesson. The branch was mostly atomic, not
cleanly atomic. `4fd6967` was a large but mostly coherent feature commit, and
`fd76952`, `6bfe4c7`, `3accada`, and `2a0b491` were clean single-purpose
corrections. But `52535d9` and `328b5dc` bundled concerns, and `f23c8c1` mixed
corrective work that would have been easier to review as separated passes.

The concrete misses to preserve are plain: public support data was first placed
in the wrong module layer, QA/readability was underestimated after technical
verification, layout stability needed later fixes, and source-grounding needed a
late NIST correction. Future essay branches should preserve the same structural
lessons in both the file layout and the commit history.

The late close pass added two more reusable lessons. First, concept migrations
need an explicit keep-or-retire decision for redirects and internal ids. Second,
broad navigation E2E sweeps should verify hash resolution and target presence,
while scroll landing belongs in focused reduced-motion specs. That split turned
the red PR check back into a trustworthy guardrail instead of a smooth-scroll
timing trap.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
