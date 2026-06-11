# Trace, Reflect and Evolve

This topic explains how non-trivial work becomes durable learning in the
workspace.

It summarizes the workflow. The authoritative procedure lives in
`docs/guidance/trace-reflect-and-evolve.md`.

## What it is

Use `Trace, Reflect and Evolve` after non-trivial work when the branch exposed a lesson that
should be inspectable after the chat is gone.

The command classifies the work as:

- `required`
- `recommended`
- `skip allowed`

When durable learning is needed, the default artifact is an `Evolution Record`
in `docs/guidance/evolution-records/`.

## When it runs

Typical `required` cases:

- messy or failed tasks
- architecture changes
- migrations
- guidance or skill gaps
- repeated friction with a shared pattern

Typical `recommended` cases:

- meaningful course corrections
- durable content-pattern lessons
- non-trivial work that future contributors will likely need to understand

Typical `skip allowed` cases:

- trivial typo or copy fixes
- formatting-only work
- narrowly local edits with no durable lesson and no propagation target

## What it produces

`Trace, Reflect and Evolve` can produce:

- a short skip or no-op learning trace
- an `Evolution Record`
- direct updates to canon, skills, docs, PR template, or tests
- an ADR handoff when the lesson is really a structural decision

## What it does not do

- it does not preserve raw chat logs as canon
- it does not write a durable record for every task
- it does not default task-level learning into `continuity/`

## Read next

- `docs/guidance/trace-reflect-and-evolve.md`
- `docs/guidance/evolution-records/README.md`
- `docs/onboarding/contributing.md`
- `docs/decisions/README.md`

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
