# 0007 — Trace Climb durable learning flow

**Status:** accepted
**Date:** 2026-04-06
**Supersedes:** none
**PR:** pending

## Amendment — 2026-06-11

The command adopted here as `Trace Climb` was renamed to `Trace, Reflect and
Evolve`. The decision, rationale, and naming below are preserved as the
historical record of the original adoption on 2026-04-06. The rename carried its
own trace, exactly as Decision item 2 and the Consequences section anticipated.

The living surfaces moved with the rename:

- `docs/guidance/trace-reflect-and-evolve.md`
- `docs/onboarding/trace-reflect-and-evolve.md`
- `.cursor/skills/trace-reflect-and-evolve/SKILL.md`

The artifact name `Evolution Record` is unchanged. This ADR keeps its filename
and historical title so the original decision stays inspectable. The dated
durable record for the rename lives in `docs/guidance/evolution-records/`.

## Context

The workspace already had several pieces of reflective discipline:

- `AGENTS.md` required structural reflection and documentation evolution
- `.cursor/skills/github-automation/SKILL.md` and
  `docs/onboarding/contributing.md` already treated Close phase as more than
  "open the PR"
- `.github/pull_request_template.md` already required context trace
- `docs/decisions/README.md` already separated decision rationale from PR
  evolution trace

What it lacked was a governed close-phase path for turning branch-local
reflection into durable, inspectable learning with an explicit propagation
decision.

Without an explicit decision, the workspace would keep three failure modes:

1. non-trivial work could expose a durable lesson without a stable landing lane
2. PRs could show what changed without showing whether future behavior changed
3. reflection could stay conversational instead of becoming canon, skills, docs,
   tests, or an ADR path

Because this change introduces a new cross-surface workflow whose reversal would
require multi-file coordination and whose rationale is likely to matter later,
it meets the ADR threshold.

## Decision

1. **Adopt `Trace Climb` as the repo-native close-phase learning command for
   non-trivial work.** It classifies work as `required`, `recommended`, or
   `skip allowed`.
2. **Adopt `Evolution Record` as the current working durable artifact name.**
   The naming remains revisable, but any rename requires its own trace.
3. **Use `docs/guidance/evolution-records/` as the default durable learning
   lane.** Do not use raw chat logs or `continuity/` as the default repository
   for task-level learning artifacts.
4. **Require a bounded learning trace in PRs for non-trivial work.** The PR must
   show whether durable learning was preserved, linked, or intentionally
   skipped.
5. **Require a propagation decision when durable learning is captured.** The
   artifact must say whether the result updates canon, operational surfaces,
   opens an ADR path, defers with a named boundary, or resolves as a no-op.

## Alternatives considered

**Keep using only PR context trace.** Rejected: PR context explains how work
evolved, but it does not by itself create a durable learning lane or force a
propagation decision.

**Put task-level learning into `continuity/`.** Rejected: `continuity/` is for
temporal anchors and architecture memory, not the default home for branch-level
close-phase learning.

**Rely on conversational memory or external persistent memory tooling.**
Rejected: the workspace explicitly prefers inspectable repo artifacts over
opaque memory layers for canonical learning.

**Add helper tooling before proving the manual flow.** Rejected for now: Stage 1
proves the governed workflow first. Helper tooling remains optional if the
manual path later proves insufficient.

## Consequences

**What improves:**
- Durable learning now has a named command, a default landing lane, and a
  bounded PR-visible trace.
- Reflection can now climb from incident to pattern to guardrail without
  depending on chat continuity.
- The workspace gains a clearer boundary between ADR rationale, PR evolution
  trace, and durable learning artifacts.

**What becomes harder:**
- Non-trivial work now carries another judgment call during Close phase.
- The command, onboarding surfaces, skills, and PR template must stay in sync or
  the workflow will drift.
- Future renames of the command or artifact require deliberate migration rather
  than casual wording edits.

## References

- [`AGENTS.md`](../../AGENTS.md)
- [`docs/guidance/trace-reflect-and-evolve.md`](../guidance/trace-reflect-and-evolve.md)
- [`docs/guidance/evolution-records/README.md`](../guidance/evolution-records/README.md)
- [`docs/guidance/evolution-records/template.md`](../guidance/evolution-records/template.md)
- [`docs/guidance/evolution-records/2026-04-06-guidance-system-audit-and-trace-climb-rollout.md`](../guidance/evolution-records/2026-04-06-guidance-system-audit-and-trace-climb-rollout.md)
- [`docs/onboarding/trace-reflect-and-evolve.md`](../onboarding/trace-reflect-and-evolve.md)
- [`.cursor/skills/trace-reflect-and-evolve/SKILL.md`](../../.cursor/skills/trace-reflect-and-evolve/SKILL.md)
- [`.cursor/skills/github-automation/SKILL.md`](../../.cursor/skills/github-automation/SKILL.md)
- [`.github/pull_request_template.md`](../../.github/pull_request_template.md)

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
