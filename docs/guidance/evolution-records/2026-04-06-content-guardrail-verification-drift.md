# Content Guardrail Verification Drift

**Status:** applied
**Date:** 2026-04-06
**Trigger class:** required
**Scope:** workspace
**Origin trace:** PR #165 close phase for semantic box refinements and the
`integration-lag` article import. Operator follow-up: "tests are failing" and
`/trace-climb`.
**Activation trace:** `/trace-climb`
**Related PR:** https://github.com/Mikeys-Tech-Lab/poc/pull/165

## Why this record exists

The branch published `integration-lag` in both registers, but a local and CI
unit test still treated the page as a placeholder.

The immediate fix is local. The durable lesson is broader: the workspace
already had declared file-based content guardrails, but close-phase
verification narrowed `pnpm test` to tooling changes and let the mismatch
through.

## What was observed

- `pnpm test` failed in `apps/site/src/lib/__tests__/register-boundaries.test.ts`.
- The failing case expected `Placeholder. Content coming later.` in both
  `integration-lag` files even though the article had been intentionally
  published.
- `pnpm lint` and `pnpm build` still passed.
- `.cursor/skills/astro-starlight/SKILL.md` already documented file-based
  content guardrails and named `register-boundaries.test.ts` explicitly.
- `.cursor/skills/git-commit/SKILL.md`,
  `.cursor/skills/github-automation/SKILL.md`, and
  `docs/guidance/agent-pre-commit-verification.md` still framed `pnpm test` as
  something to run only when tooling code changed.

## Missed assumptions

- Lint plus build were sufficient verification for a content-heavy site change.
- `pnpm test` only mattered when touching tooling code.
- Publishing a formerly placeholder page would not affect content guardrail
  tests.

## Missed guidance

The workspace had the site-specific guidance, but the close-phase and
pre-commit surfaces drifted away from it.

The declared guardrail existed. The operational checklist failed to point back
to it.

## Structural gap

This is verification-contract drift between a domain skill and the generic
close-phase guidance.

The failure mode is:

- the repo declares content guardrail tests
- the operator-facing verification checklist narrows test execution too
  aggressively
- content changes land with stale assertions until a later local or CI run
  catches them

## Proposed evolution

- Treat `pnpm test` as required not only for tooling code, but also for
  `apps/site` content, components, routes, shared modules, and tests when
  declared guardrails may be affected.
- Keep file-based content guardrail tests aligned with the current publication
  contract, not with a page's historical placeholder state.
- When a page moves from placeholder to published content, update both the page
  and the guardrail in the same close phase.

## Research delta

None.

## Propagation decision

Update operational surfaces now.

The lesson changes current verification behavior, but it does not require a new
ADR or canon rewrite. The right propagation lane is the close-phase and
pre-commit guidance that future branches will actually follow.

## Surfaces updated

- `apps/site/src/lib/__tests__/register-boundaries.test.ts`
- `.cursor/skills/git-commit/SKILL.md`
- `.cursor/skills/github-automation/SKILL.md`
- `docs/guidance/agent-pre-commit-verification.md`
- `docs/guidance/evolution-records/2026-04-06-content-guardrail-verification-drift.md`

## Verification

Verify with:

- `pnpm test`
- `pnpm lint`
- `pnpm build`

The expected outcome is that the `integration-lag` guardrail test reflects the
published article contract and the operational guidance no longer excludes site
guardrail changes from local test runs.

## PR-visible learning trace

This branch exposed verification drift: the site skill already declared
file-based content guardrails, but the close-phase checklist still limited
`pnpm test` to tooling changes.

The fix updates the `integration-lag` guardrail test to the published contract
and propagates the lesson into the commit and close-phase guidance so future
site content work runs tests when declared guardrails may be affected.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
