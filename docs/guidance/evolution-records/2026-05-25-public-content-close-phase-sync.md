# Public Content Close-Phase Sync

**Status:** applied
**Date:** 2026-05-25
**Trigger class:** required
**Scope:** content
**Origin trace:** Branch close phase after the finalized public-content rewrite across registers and seeds. Operator request: get the branch to a coherent production state by fixing the remaining findings.
**Activation trace:** none
**Runtime propagation:** enforced — register-boundaries.test.ts pins the close-phase content boundaries. No new propagation in this backfill.
**Related PR:** pending

## Why this record exists

The public content was materially finished, but the branch was still not coherent.

The remaining drift was structural, not cosmetic:

- file-based content guardrails still expected earlier wording
- current-state repo docs still described the pre-rename structural layout
- non-practitioner structural entry points still carried older `essay` and `publication` wording

That combination is a reusable lesson about close phase, not just a one-off patch set.

## What was observed

- `pnpm test` failed in `apps/site/src/lib/__tests__/register-boundaries.test.ts` because the finalized public wording no longer matched the guardrail snippets.
- `docs/architecture/workspace.md` still pointed at `apps/site/src/content/structural-essays/` and `apps/site/src/lib/structural-essays/` even though the repo had already moved to `structural/`.
- `docs/decisions/0009-structural-essays-and-route-scoped-everyday-activation.md` and `docs/decisions/README.md` still described the old `Structural Essays` IA.
- The structural overview and signal entry points in orientation and everyday still used stale user-facing terms such as `essay`, `publication`, and `bridge` in places where the finalized IA now says `signal`.
- `pnpm lint` passed, but it surfaced a quiet tooling drift: `biome.json` still referenced schema `2.4.10` while the installed CLI was `2.4.15`.

## Missed assumptions

- Finalizing public prose would automatically leave the verification layer coherent.
- Once practitioner copy was stabilized, orientation and everyday entry points would already match the same terminology.
- Renaming the structural shelf in site content meant the current-state repo docs had already been updated with it.
- A passing lint exit code meant the lint surface itself was fully aligned.

## Missed guidance

The repo already had the right high-level rules:

- documentation evolves in the same PR
- current-state docs must match the actual structure
- declared content guardrails must stay aligned with published content

What was missing was the applied close-phase habit of treating a major public-content finalization as a contract-sync event across all of those surfaces at once.

## Structural gap

This is close-phase contract drift across three layers:

1. public content
2. file-based guardrails
3. current-state documentation

The failure mode is:

- public wording stabilizes
- the branch feels "done"
- tests, architecture docs, and neighboring register entry points still describe an earlier contract
- coherence breaks late, even though the main content itself is already final

## Proposed evolution

- Treat major public-content finalization as a contract-sync pass, not only a prose pass.
- In close phase, explicitly sweep:
  - file-based content guardrails
  - current-state architecture and decision docs
  - neighboring register entry points that summarize the same cluster
- Preserve historical evolution records as history, but update current-state docs and ADR summaries to the live IA and route structure.
- Fix quiet tooling drift when it appears during the verification pass, so the finishing checklist ends cleanly instead of "passing with caveats."

## Research delta

None.

## Propagation decision

Update operational surfaces now.

The durable lesson changes how this kind of branch should be closed, but it does
not require a new ADR or canon rewrite. The right propagation lane is the
branch itself plus this durable record, so future PRs can carry a bounded
learning trace when the same pattern appears.

## Surfaces updated

- `apps/site/src/lib/__tests__/register-boundaries.test.ts`
- `apps/site/src/content/docs/en-us/index.mdx`
- `apps/site/src/content/register/orientation/en-us/index.mdx`
- `apps/site/src/content/register/everyday/en-us/index.mdx`
- `apps/site/src/content/register/orientation/en-us/signals/structural/index.mdx`
- `apps/site/src/content/register/everyday/en-us/signals/structural/index.mdx`
- `apps/site/src/content/register/orientation/en-us/signals/structural/ai-is-not-magic-it-is-a-cognitive-amplifier.mdx`
- `docs/architecture/workspace.md`
- `docs/decisions/0009-structural-essays-and-route-scoped-everyday-activation.md`
- `docs/decisions/README.md`
- `continuity/README.md`
- `biome.json`
- `docs/guidance/evolution-records/2026-05-25-public-content-close-phase-sync.md`

## Verification

Verified with:

- `pnpm lint`
- `pnpm --filter site check`
- `pnpm test`
- `pnpm build`
- `pnpm license:check`
- `pnpm --filter site test:e2e`

Expected outcome: the public branch wording, the guardrail suite, and the
current-state documentation all describe the same contract.

## PR-visible learning trace

This cleanup exposed a close-phase sync gap: finalized register content changed
the public contract, but `register-boundaries.test.ts`, current-state docs, and
some structural entry wording were still describing earlier states.

The fix updates those surfaces together and verifies the branch with lint, Astro
check, unit tests, build, license check, and E2E.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
