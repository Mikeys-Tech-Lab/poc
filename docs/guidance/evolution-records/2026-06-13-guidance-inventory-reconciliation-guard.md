# Enforce Guidance Inventory Reconciliation

**Status:** applied
**Date:** 2026-06-13
**Trigger class:** required
**Scope:** workspace
**Origin trace:** A close-phase reflection after the runtime-propagation work and the `Trace, Reflect and Evolve` rename opened into a coherence audit of the workspace's continuity, runtime, and legacy surfaces. The audit asked whether the workspace was still internally consistent. It found inventory drift across several hand-maintained guidance surfaces.
**Activation trace:** Run as a full trace, reflection, and evolution flow. No mandate lens was loaded.
**Runtime propagation:** enforced — the guidance drift guard now reconciles the skill, rule, and continuity inventories against filesystem reality in CI (presence-only). Prevent-at-source pointers and generated-artifact elimination landed in PR #257. See `docs/guidance/trace-reflect-and-evolve.md` for the ladder.
**Related PR:** https://github.com/Mikeys-Tech-Lab/poc/pull/255

## Why this record exists

The audit surfaced a repeating shape, not a single bug. Several places that
enumerate the same set of things by hand had drifted from the filesystem they
describe. The lesson is worth preserving because the workspace already relies on
duplicated human-facing inventories, and it will add more. Without a
reconciliation mechanism, each one rots silently.

## What was observed

The workspace audit found that the surfaces a deterministic check already
covered stayed true, while the hand-maintained descriptive surfaces drifted:

- `docs/onboarding/ai-guidance.md` listed 12 of 14 skills and 7 of 8 rules.
  `public-content-intake`, `conversational-voice`, and `engineering.mdc` were
  missing.
- `docs/architecture/workspace.md` listed 11 of 14 skills.
- `continuity/README.md` omitted `guidance-architecture.md`, a continuity
  artifact that names itself as one.

The same skill inventory was enumerated in three places that disagreed with each
other and with the directory. The enforced spine held. The unenforced skin
drifted.

## Missed assumptions

The implicit assumption was that the standing "every PR updates affected docs"
rule plus advisory review would keep these inventories accurate. It did not. A
rule that depends on an author remembering to update a list, with no mechanical
reconciliation, degrades as the list grows.

## Missed guidance

No guidance was wrong. What was missing was an enforced reconciliation between
the hand-maintained enumerations and the filesystem. The guard already pinned
explicit contract snippets and validated path references, but it did not assert
that each skill, rule, and continuity document appears in its inventory.

## Structural gap

Class of failure: derived or duplicated state without a reconciliation mechanism
drifts from its source. The repair is not always to collapse the duplication.
Some duplicated surfaces are useful for humans, because the docs orient a reader
and the raw tree does not. The repair is to classify each case: enforce, prevent
at source, eliminate, or explicitly leave advisory.

## Proposed evolution

For inventories that are cheap to reconcile mechanically, add a presence-only
check. For surfaces that declare themselves descriptive (here,
`docs/architecture/workspace.md`), leave them advisory and reconcile them as
content, rather than turning a descriptive map into a gate.

## Runtime propagation

`enforced` is the cheapest effective layer that prevents recurrence of inventory
drift. The guidance drift guard now derives the skill, rule, and continuity
inventories from filesystem reality and fails in CI when an entry is missing
from its enumeration. The check is presence-only and never judges prose,
diagrams, or completeness.

The guard checks stable string presence, not table structure: a name that
appears anywhere in the inventory file counts as present. That can theoretically
false-pass if a name shows up in unrelated prose, and the trade is accepted
deliberately to keep the check boring and stable rather than a brittle parser.
The guard should not be over-tightened into a structured inventory parser.

The classification is deliberately bounded into three modes:

- Enforce catches drift after it happens. That is this PR's guard.
- Prevent-at-source tells a future agent how not to create the drift during the
  task. Those pointers (broadening the `ai-guidance.md` "How to extend" note to
  all skills and rules, and a rename or inventory heuristic in the
  `github-automation` Close phase) landed in PR #257.
- Eliminate removes surfaces that should not be maintained at all. The generated
  `docs/ai/` reports were removed and gitignored in PR #257.

Smallest reusable rule carried to the runtime surfaces: when the same fact lives
in more than one hand-maintained place, single-source it, generate it, or add a
deterministic reconciliation check, and prefer rules over snapshots. The full
trace lives here (pointer-not-payload).

## Research delta

None.

## Propagation decision

Update operational surfaces now and enforce. This PR adds the deterministic
guard, greens it by reconciling the three inventories, and documents the
contract in canon.

Defer with a named boundary: the prevent-at-source pointers and the elimination
of generated reports ship in a follow-up PR, so the deterministic contract is
not obscured by broader cleanup. The broader generalization of "duplicated logic
without reconciliation" beyond inventories (for example, register inline-script
versus module parity) is named here and not fixed.

## Surfaces updated

- `tools/ai-guidance/src/domain/guidance-drift-guard.ts` (inventory reconciliation check)
- `tools/ai-guidance/src/infra/guidance-check.ts` (`continuity/README.md` loaded as an inventory surface)
- `tools/ai-guidance/src/__tests__/guidance-drift-guard.test.ts` (pass and missing-entry cases, audit and README exemption)
- `docs/onboarding/ai-guidance.md` (rule and skill tables completed, validator description)
- `continuity/README.md` (`guidance-architecture.md` added)
- `AGENTS.md` (guidance drift guard section and enforcement boundary)

Left advisory by design: `docs/architecture/workspace.md`, which declares itself
descriptive and not a compliance artifact. Its skill list is reconciled as
content in the follow-up PR.

## Verification

`pnpm guidance:check` fails on the pre-fix tree with exactly the four drifted
entries, and passes after reconciliation. `pnpm lint`, `pnpm test`, and
`pnpm license:check` pass at PR head. The fresh-task recurrence claim is covered
by unit tests: adding a skill, rule, or continuity document that is not
enumerated produces a guard failure, so a future task that forgets the inventory
is caught in CI.

## PR-visible learning trace

Added a presence-only, CI-only inventory reconciliation to the guidance drift
guard so skills, rules, and continuity documents cannot drift out of their
enumerations unnoticed, reconciled the three drifted inventories, and documented
the contract. Classified `enforced`. Prevent-at-source pointers and
generated-report elimination follow in a second PR.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
