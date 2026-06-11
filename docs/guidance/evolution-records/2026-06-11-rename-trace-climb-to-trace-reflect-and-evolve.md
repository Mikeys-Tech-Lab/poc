# Rename Trace Climb to Trace, Reflect and Evolve

**Status:** applied
**Date:** 2026-06-11
**Trigger class:** required
**Scope:** migration
**Origin trace:** Operator decided to rename the close-phase learning command from `Trace Climb` to `Trace, Reflect and Evolve` for a clearer, self-describing name that mirrors the practice's own words (trace, reflection, evolution). Display form chosen: `Trace, Reflect and Evolve`. Slug: `trace-reflect-and-evolve`. Artifact name `Evolution Record` unchanged.
**Activation trace:** none
**Runtime propagation:** archive-only — the mechanical lockstep is already `enforced` by the guidance drift guard (pinned snippets, contract paths, and `TARGET_FILES`); the preserve-history-vs-fix-links judgment is preserved here and in the ADR 0007 amendment as worked examples. No new always-on or on-demand surface is warranted for a rare-event lesson.
**Related PR:** pending

## Why this record exists

ADR 0007 stated that any rename of the command or artifact "requires its own
trace" and "deliberate migration rather than casual wording edits." This record
is that trace. It also preserves two reusable judgments about cross-surface
renames in a guard-pinned workspace.

## What was observed

The command name `Trace Climb` was woven across 34 files: the deterministic
guidance drift guard (pinned mapping name, triggers, `expectedSnippets`, and
`TARGET_FILES`), its test, the skill directory and `name:` field, two living
guidance/onboarding docs, `AGENTS.md`, both thin adapters, the onboarding topic
index, the architecture diagram (including Mermaid node IDs), and two CI YAML
files. It also appeared in surfaces that must not be rewritten: the ADR, the
decisions index row, the dated Evolution Records, and the generated changelogs.

A naive global replace would have done two kinds of damage: it would have broken
the guard's `readFile` on renamed `TARGET_FILES`, and it would have rewritten
history (dated records, ADR narrative) and corrupted links to the one historical
record whose filename contains `trace-climb`.

## Missed assumptions

The first scoping assumed the guard only pinned paths. It also pins literal
display strings (`Trace Climb`, `### trace-climb`, `` `trace-climb` ``), so the
display rename and the slug rename both had to land in lockstep with the guard.

A second assumption was that grepping the slash form and the obvious doc set was
enough. The onboarding skill referenced the renamed onboarding **topic id**
(`trace-reflect-and-evolve`) in a place the guard does not pin. The guard caught
nothing there. A full token sweep did.

## Missed guidance

Nothing was missing in canon. The guard, the structural-awareness ripple check,
and the preserve-history instinct were all available and were used. This record
captures the rename pattern so the next migration starts from a worked example
rather than rediscovering it.

## Structural gap

Class of risk: a cross-surface identifier rename in a workspace where a
deterministic check pins exact strings. The check protects against an
incomplete rename of pinned surfaces, but it does not pin every reference, so a
non-pinned living reference (here, a topic id inside a skill) can drift silently.

## Proposed evolution

No structural change to canon. The mechanical guarantee already exists in the
guard. The durable judgment is a process heuristic, recorded below for reuse.

## Runtime propagation

`archive-only` is the cheapest effective layer here, for two reasons:

- The mechanical lockstep lesson is already `enforced`. The guidance drift guard
  fails fast if a rename leaves a pinned snippet, contract path, or `TARGET_FILES`
  entry stale. Extending or duplicating that enforcement would add no coverage.
- The two judgment lessons are rare-event heuristics. Carrying them into
  always-loaded canon or an on-demand skill would add payload to surfaces that
  should stay small (pointer-not-payload, anti-bloat).

Reusable heuristics, preserved here as the pointer target:

1. When renaming a guard-pinned identifier, change the guard mapping, its pinned
   snippets, and `TARGET_FILES` in the same commit. Treat the guard as the
   lockstep gate, then back it with a full token sweep for non-pinned references.
2. When renaming a documented command, preserve history (dated records, ADR
   narrative, changelogs) and fix only the live navigation links that would
   otherwise rot. The ADR keeps its filename and title; an amendment carries the
   new name forward.

## Research delta

None.

## Propagation decision

Defer with a named boundary. If command or artifact renames recur, add a single
"rename lockstep and preserve history" line to
`.cursor/skills/github-automation/SKILL.md` Close phase, pointing back to this
record. Until then, the guard plus this worked example is sufficient.

## Surfaces updated

- `tools/ai-guidance/src/domain/guidance-drift-guard.ts` (mapping renamed to `trace-reflect-and-evolve-entry`, triggers, checks, pinned snippets)
- `tools/ai-guidance/src/infra/guidance-check.ts` (`TARGET_FILES` paths)
- `tools/ai-guidance/src/__tests__/guidance-drift-guard.test.ts`
- `.cursor/skills/trace-reflect-and-evolve/SKILL.md` (renamed dir, `name:` field, transition alias in description)
- `docs/guidance/trace-reflect-and-evolve.md` and `docs/onboarding/trace-reflect-and-evolve.md` (renamed)
- `AGENTS.md`, `.claude/CLAUDE.md`, `.github/copilot-instructions.md`
- onboarding set, `docs/guidance/README.md`, `docs/guidance/evolution-records/README.md`, `docs/guidance/structural-reflection-and-evolution.md`, `.cursor/skills/onboarding/SKILL.md`, `README.md`, `docs/architecture/workspace.md`
- `.github/prompts/guidance-drift-review.prompt.yml`, `.github/workflows/guidance-drift-review.yml`
- `docs/decisions/0007-trace-climb-durable-learning-flow.md` (amendment + live link fixes; filename and narrative preserved)

Preserved unchanged by design: the dated Evolution Records, the decisions index
row, and the changelogs. Their `trace-climb` references are historical.

## Verification

`pnpm lint`, `pnpm test`, `pnpm guidance:check`, and `pnpm license:check` after
the rename. The guard run with no `--changed-files` activates every contract
mapping, including the renamed `trace-reflect-and-evolve-entry`.

## PR-visible learning trace

Renamed the close-phase command `Trace Climb` to `Trace, Reflect and Evolve` in
lockstep with the deterministic guard, preserved all history surfaces, and
recorded the rename heuristics here as the propagation pointer. Classified
`archive-only` because the mechanical guarantee already lives in the guard.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
