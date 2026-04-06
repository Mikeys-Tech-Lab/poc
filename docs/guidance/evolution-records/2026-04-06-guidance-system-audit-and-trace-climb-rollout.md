# Guidance System Audit And Trace Climb Rollout

**Status:** applied
**Date:** 2026-04-06
**Trigger class:** required
**Scope:** workspace
**Origin trace:** Operator Handover, Guidance System Audit and Evolution Command
**Activation trace:** `/sensible-defaults` was used during the spike because the
workspace change needed delivery-reality framing and explicit missing-domain
inspection
**Related PR:** pending

## Why this record exists

The workspace already had reflection, PR trace, ADRs, continuity, and guidance
drift checks. What it lacked was a governed command that turns branch-local
reflection into durable learning with an explicit propagation decision.

This record preserves the audit, the naming recommendation, and the rollout
decision that introduced `Trace Climb` and `Evolution Record` as the current
working pair.

## What was observed

The audit found these strong existing surfaces:

- `AGENTS.md` already defined structural reflection, close-phase governance, and
  documentation evolution discipline.
- `docs/guidance/structural-reflection-and-evolution.md` already required the
  incident -> pattern -> guardrail climb.
- `.cursor/skills/github-automation/SKILL.md` and
  `docs/onboarding/contributing.md` already required reflection before PR.
- `.github/pull_request_template.md` already required context trace.
- `docs/decisions/README.md` already separated ADR rationale from PR evolution
  trace.
- `continuity/README.md` already kept transient reflection out of continuity by
  default.
- `tools/ai-guidance/src/domain/guidance-drift-guard.ts` and
  `.github/workflows/guidance-drift-review.yml` already enforced and reviewed
  repo-entry contract drift.

## Missed assumptions

- Reflection discipline alone would automatically produce durable learning.
- PR context trace alone would make learning inspectable enough.
- Existing guidance drift checks already covered post-task learning flow.

## Missed guidance

The workspace had no explicit command for:

- classifying whether a task required durable learning capture
- preserving origin and activation trace without canonizing raw chat logs
- forcing a propagation decision after a learning artifact was written
- making the PR show whether learning was preserved, linked, or intentionally
  skipped

## Structural gap

The system could reflect, but it could not yet metabolize reflection into a
stable architectural loop.

The failure modes were:

- no durable learning trace
- reflection that never becomes architecture
- PRs that show change without system learning
- missing or stale guidance not being surfaced early enough
- agent forgetting to inspect its governance stack
- external developments not feeding back into rules or skills
- learning captured but not propagated

## Proposed evolution

Adopt a new repo-native command flow:

- **Command:** `Trace Climb`
- **Artifact:** `Evolution Record`
- **Default durable lane:** `docs/guidance/evolution-records/`

Trigger model:

- **Required:** messy or failed tasks, architecture changes, migrations,
  guidance or skill gaps, repeated friction with a shared pattern, or research
  delta worth preserving
- **Recommended:** other non-trivial work with meaningful course corrections or
  durable lessons
- **Skip allowed:** trivial or narrowly local work with no durable lesson and
  no propagation target

## Research delta

Recent PR review tools are getting better at full-context advisory review and
tool calling. That matters.

Recent persistent memory tooling also exists. That matters less here as a
canonical solution because this workspace already prefers inspectable repo
artifacts over opaque memory layers.

The adopted boundary is:

- use richer AI review as advisory context reading
- keep durable learning repo-local and inspectable

## Propagation decision

Update canon now and update operational surfaces now.

This rollout touches:

- `AGENTS.md`
- repo-entry docs and adapters
- `docs/guidance/`
- `docs/onboarding/`
- `.cursor/skills/`
- PR template
- deterministic guidance drift checks
- advisory review prompt and workflow context
- ADR and decision index

An ADR is part of this rollout because the new governed close-phase workflow and
durable artifact lane introduce a structural decision whose reversal would
require multi-file coordination and whose rationale is likely to matter later.

## Surfaces updated

Expected rollout surfaces:

- `docs/guidance/trace-climb.md`
- `docs/guidance/evolution-records/`
- `docs/onboarding/trace-climb.md`
- `AGENTS.md`
- `README.md`
- `docs/onboarding/README.md`
- `docs/onboarding/manual.md`
- `docs/onboarding/ai-guidance.md`
- `docs/onboarding/contributing.md`
- `docs/onboarding/workspace-overview.md`
- `docs/guidance/README.md`
- `docs/decisions/README.md`
- `docs/decisions/0007-trace-climb-durable-learning-flow.md`
- `docs/architecture/workspace.md`
- `.cursor/skills/trace-climb/SKILL.md`
- `.cursor/skills/github-automation/SKILL.md`
- `.claude/CLAUDE.md`
- `.github/copilot-instructions.md`
- `.github/pull_request_template.md`
- `tools/ai-guidance/src/infra/guidance-check.ts`
- `tools/ai-guidance/src/domain/guidance-drift-guard.ts`
- `tools/ai-guidance/src/__tests__/guidance-drift-guard.test.ts`
- `.github/prompts/guidance-drift-review.prompt.yml`
- `.github/workflows/guidance-drift-review.yml`

## Verification

After implementation, verify with:

- `pnpm guidance:check`
- `pnpm lint`
- `pnpm -r test`
- `pnpm build`
- `pnpm --filter site check`

Then confirm whether Stage 1 is sufficient or whether helper tooling is needed.

## PR-visible learning trace

This branch introduces `Trace Climb` and `Evolution Record` as the current
working pair for durable learning capture.

The initial learning artifact is this record. It preserves the audit, the
failure modes, the naming recommendation, and the propagation decision that
drove the rollout.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
