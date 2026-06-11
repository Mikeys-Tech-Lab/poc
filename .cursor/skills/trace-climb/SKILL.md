---
name: trace-climb
description: Turns non-trivial work into durable learning. Use when the operator says "Trace Climb", during close phase for meaningful work, after messy or failed tasks, or before a PR needs a bounded learning trace and possible Evolution Record.
---

# Trace Climb

Adaptation of `AGENTS.md` for post-task reflection, durable learning capture,
and propagation.

## When to use

- The operator says `Trace Climb`
- A non-trivial task is entering Close phase
- The work was messy, failed, architectural, migratory, or exposed guidance gaps
- A PR needs an inspectable learning trace beyond ordinary context
- Reasoning-time corrections during the work changed the plan, revealed a
  missing guardrail, or showed that the agent's own operating contract was
  incomplete

## Trigger classification

Classify the work before writing anything durable.

### Required

Use `Trace Climb` when the work exposed a durable lesson that should change
future behavior.

Examples:

- messy or failed tasks
- architecture changes
- migrations
- guidance or skill gaps
- repeated friction with a shared pattern
- reasoning-time corrections that expose missing runtime guidance
- research delta worth preserving

### Recommended

Use it when the work is non-trivial and likely to help future contributors, even
if it may not need immediate guardrail changes.

### Skip allowed

Skip the durable artifact for trivial or narrowly local work with no durable
lesson and no propagation target. In that case, produce a short skip or no-op
learning trace instead.

## Workflow

1. Identify the trigger class: `required`, `recommended`, or `skip allowed`.
2. Capture the **origin trace**: the prompt, handover, issue, or task artifact
   that started the work.
3. Capture **activation trace** only if a command or lens materially changed the
   framing, such as `/sensible-defaults`.
4. Capture **reasoning-time evolution**: mistakes, review corrections, failed
   checks, operator interventions, and plan changes that happened during the
   work and changed future behavior.
5. Decide whether the work produced durable learning.
6. If yes, write or update an `Evolution Record` in
   `docs/guidance/evolution-records/`.
7. End the record with a propagation decision.
8. Carry a bounded summary or link into the PR learning trace.

## Record rules

- Preserve substantive origin handovers when they materially shaped the work.
- For routine prompts, record concise provenance instead of full transcript
  capture.
- Rename preserved origin artifacts into repo-native language when needed.
- Do not treat raw chat logs as canonical artifacts.
- Do not move task-level learning into `continuity/` by default.
- Do not flatten reasoning-time corrections into "fixed during review." If a
  correction changed the agent's future operating contract, update the skill,
  guidance, or check that should have prevented it.

## Required sections

Use the template in `docs/guidance/evolution-records/template.md`.

At minimum, cover:

- origin trace
- activation trace, if material
- reasoning-time evolution, if it changed the work
- what was observed
- missed assumptions
- missed guidance
- structural gap
- proposed evolution
- propagation decision
- surfaces updated
- verification
- PR-visible learning trace

## Propagation decision

Every durable record must end by choosing one of these outcomes:

- update canon now
- update operational surfaces now
- open ADR path
- defer with named boundary
- no-op with reason

This is how the skill prevents `learning captured but not propagated`.

## Boundaries

- `Trace Climb` is not a generic retrospective ritual.
- It is not required for every tiny edit.
- Preserve durable learning. Do not narrate every task.
- If no guardrail, propagation target, or research delta exists, a short skip
  trace is the healthy result.

## Related surfaces

- `docs/guidance/trace-climb.md`
- `docs/guidance/evolution-records/README.md`
- `.cursor/skills/github-automation/SKILL.md`
- `.github/pull_request_template.md`

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/trace-climb/SKILL.md
