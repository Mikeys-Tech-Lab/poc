# Evolution Records

This directory holds durable learning artifacts produced by `Trace Climb`.

The current working artifact name is `Evolution Record`.

That name is a strong current recommendation, not a claim that the naming can
never evolve. If the workspace renames it later, that rename needs its own
trace.

## What belongs here

- durable learning from non-trivial work
- guidance-system audits that changed workspace behavior
- repeated friction that produced a shared guardrail
- research delta worth preserving for future repo work

## What does not belong here

- raw chat logs
- routine task narration
- continuity-only architecture anchors
- ADRs

If the work has no durable lesson or propagation target, use a short skip or
no-op learning trace instead of creating a record here.

## Filename pattern

Use:

- `YYYY-MM-DD-short-title.md`

The date captures when the learning was preserved. The short title captures what
changed.

Start from `template.md` when creating a new record. It defines the minimum
shape without turning the directory into a ritual logbook.

## Runtime propagation

Every record declares a `Runtime propagation` field: the cheapest effective layer
where the lesson changes a future reasoning runtime, or `archive-only` when no
runtime change is warranted. `archive-only` is a valid outcome, not a failed
climb.

Distill the smallest reusable lesson and carry only that, plus a pointer back to
the record, onto the chosen runtime surface (pointer-not-payload). The archive
holds the full trace, the record holds the distilled lesson, and runtime surfaces
hold the smallest reusable constraint. `docs/guidance/trace-climb.md` defines the
ladder and the decision rule.

## Relationship to other surfaces

- **`docs/guidance/trace-climb.md`** defines when to write a record and what it
  must contain.
- **PR descriptions** carry the bounded learning trace and link here when a
  record exists.
- **ADRs** still hold structural decision rationale and rejected alternatives.
- **`continuity/`** remains the wrong default lane for task-level durable
  learning.

Do not maintain a hand-written file inventory here. The directory contents are
the source of truth for which records currently exist.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
