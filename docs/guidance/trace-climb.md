# Trace Climb

This document defines the current working command for turning post-task reflection
into durable learning in this workspace.

`Trace Climb` and `Evolution Record` are strong current recommendations. They are
not beyond revision. If the workspace renames them later, the rename carries its
own trace.

## What this is

`Trace Climb` is the repo-native close-phase learning flow for non-trivial work.

It exists to answer:

- what the work exposed
- what was missed
- what should change in future behavior
- where that change needs to land

It is not:

- a generic retrospective ritual
- a mandatory logbook for every task
- a substitute for ADRs
- a reason to move transient reflection into `continuity/`

## Trigger model

Classify the work before writing anything durable.

### Required

Use `Trace Climb` when the work exposed a durable lesson that should change
future behavior.

Typical cases:

- messy or failed tasks
- architecture changes
- migrations
- guidance or skill gaps
- repeated friction that points to a shared pattern
- research delta worth preserving

### Recommended

Use `Trace Climb` when the work is non-trivial and likely to help future
contributors, even if it may not require immediate guardrail changes.

Typical cases:

- meaningful course corrections during implementation
- durable content-pattern lessons
- work that changed the plan materially but stayed within bounds

### Skip allowed

Skip the durable artifact when the work has no reusable lesson and no propagation
target.

Typical cases:

- trivial typo or copy fixes
- formatting-only changes
- narrowly local edits with no durable learning and no meaningful PR trace delta

In those cases, a short skip or no-op learning trace is the correct outcome.

## Trace taxonomy

`Trace Climb` works with five trace types:

- **Origin trace**: the initiating prompt, handover, issue, or task artifact
- **Activation trace**: a governance-loading or lens-loading step that materially
  changed the framing, such as `/sensible-defaults`
- **Evolution trace**: the audit, decisions, corrections, and design movement
  that followed
- **Durable learning trace**: the preserved artifact plus its propagation
  decision
- **PR-visible trace**: the bounded summary or link that makes the learning
  inspectable in review

Preserve the full origin artifact only when it materially shaped the work. For
routine prompts, record concise provenance instead.

Record activation trace only when it changed framing or scope. Do not turn
command invocation into a ritual log line.

Raw chat logs are not the canonical artifact.

## Durable artifact

The default durable artifact lane is `docs/guidance/evolution-records/`.

Use an `Evolution Record` when the work surfaced durable learning that should be
inspectable after the chat is gone.

Use this filename pattern:

- `YYYY-MM-DD-short-title.md`

The current template lives at `docs/guidance/evolution-records/template.md`.

## Record sections

Keep records concise. Preserve the lesson, not the whole conversation.

At minimum, an `Evolution Record` should cover:

1. origin trace
2. activation trace, if material
3. what was observed
4. missed assumptions
5. missed guidance
6. structural gap or pattern
7. proposed evolution
8. research delta, if any
9. propagation decision
10. surfaces updated or to update
11. verification
12. PR-visible learning trace

If a section does not apply, say `None.` or remove it. Do not pad the record.

## Propagation decision

Every `Evolution Record` ends with a propagation decision.

Allowed outcomes:

- update canon now
- update operational surfaces now
- open an ADR path
- defer with a named boundary
- no-op with reason

This section exists to prevent the failure mode `learning captured but not
propagated`.

## Relationship to other surfaces

- **PRs** carry the bounded learning trace and link to the durable artifact when
  one exists.
- **ADRs** still hold structural decision rationale.
- **`docs/guidance/`** holds the learning rule and the durable records.
- **`continuity/`** is not the default lane for task-level reflection.

## Anti-bloat constraint

Preserve durable learning. Do not narrate every task.

If no guardrail, propagation target, or research delta exists, a short skip or
no-op trace is healthy.

If an origin artifact arrives with business or client framing, preserve the
substance but rename it into repo-native language before canonizing it.

## See also

- `docs/onboarding/trace-climb.md`
- `docs/guidance/evolution-records/README.md`
- `docs/guidance/structural-reflection-and-evolution.md`
- `.cursor/skills/github-automation/SKILL.md`

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
