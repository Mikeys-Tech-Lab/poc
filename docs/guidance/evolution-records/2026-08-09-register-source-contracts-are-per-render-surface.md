# Register source contracts are per render surface

**Status:** applied
**Date:** 2026-08-09
**Trigger class:** required
**Scope:** content
**Origin trace:** Signal 2 publication and cross-register source review in PR
[#335](https://github.com/Mikeys-Tech-Lab/poc/pull/335)
**Activation trace:** none. Sensible Defaults was not loaded in this Cursor
context.
**Runtime propagation:** on-demand + enforced through public-content intake and
the focused Signal 2 source-contract tests
**Related PR:** [#335](https://github.com/Mikeys-Tech-Lab/poc/pull/335)

## Why this record exists

The Signal 2 review exposed a reusable source-contract gap across public
registers. The lesson affects future content intake, but it does not require a
wider PoC architecture change.

## What was observed

Practitioner, Orientation, and Everyday retained direct sourced claims. A
practitioner-led, unscoped source presentation was insufficient once the three
sourced register surfaces could coexist in one rendered register family.

## Missed assumptions

Lighter prose was treated as if lighter citation semantics were acceptable.
That confused reduced claim density with reduced evidence integrity.

## Missed guidance

The source workflow and intake skill emphasized source-heavy practitioner
pages. They did not state the minimum contract for direct sourced claims in
lighter registers or the scope requirement for co-rendered source surfaces.

## Structural gap

A sourced register is an independent render and evidence surface. Shared source
records do not create shared citation order, and shared source IDs are not
unique when register surfaces coexist in one document.

## Proposed evolution

Every register retaining direct sourced factual claims keeps a complete
`SourceHook` to `SourceLedger` loop and owns its first-citation order. Register
variants may select from one locale-owned source catalogue. Co-rendered hooks
and ledgers use matching register scope.

## Runtime propagation

The on-demand public-content intake skill carries the smallest operational
rule and points here. The canonical content source workflow holds the reusable
invariant. Existing focused Signal 2 source-contract tests enforce register
order, hook and ledger presence, and scoped reciprocal IDs.

## Research delta

None.

## Propagation decision

Update operational surfaces now. This is the cheapest effective combination of
canonical domain guidance, on-demand intake guidance, and focused deterministic
coverage. Broader continuity, workflow, legacy, and architecture work remains
outside this PR.

## Surfaces updated

- `docs/guidance/content-register-source-workflow.md`
- `.cursor/skills/public-content-intake/SKILL.md`
- `apps/site/src/lib/__tests__/source-contract.test.ts`

## Verification

Local verification on the final branch covered licensing, lint, the full
workspace test suite, the static build, and Astro type and content checks. The
focused source-contract tests cover each Signal 2 register's citation order,
hook and ledger presence, and scoped reciprocal IDs.

Local production-preview browser inspection found all three source ledgers, 58
unique source reference and ledger IDs, 29 valid hook targets, 29 valid
backlinks, and the expected article and social metadata. Production deployment
and public crawler rendering remain unverified.

## PR-visible learning trace

Trigger class `required`. Signal 2 showed that lighter registers reduce claim
density rather than citation integrity. The invariant propagates through the
content source workflow, on-demand intake guidance, and focused Signal 2
source-contract tests.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
