# Pre-commit lint skip — skill-load recurrence

**Status:** applied
**Date:** 2026-05-10
**Trigger class:** required
**Scope:** workspace
**Origin trace:** Operator invoked `/trace-climb` after PR #196 CI failed on Biome formatting because `pnpm lint` was not run before commit. Operator's exact framing: "we always need to run lint before committing checks are failing".
**Activation trace:** none
**Related PR:** https://github.com/Mikeys-Tech-Lab/poc/pull/196

## Why this record exists

This is a recurrence of the lesson captured in
`docs/guidance/agent-pre-commit-verification.md` (originally from PR #74,
2026-03-16). The same failure pattern — local build passes, lint not run, CI
catches Biome formatting drift — happened again. The rule already exists in
multiple guidance surfaces. The agent did not load the surface that contains
the rule before committing.

The earlier record fixed *rule absence*. This record must fix *skill-loading
discipline*, which is a different layer.

## What was observed

- PR #196 was opened with four CSS files modified.
- `pnpm --filter site build` was run and passed; that was treated as
  sufficient verification.
- `pnpm lint` was never run locally before `git commit` and `git push`.
- CI's "Lint, Unit, Build, Type Check, E2E" job failed within 14 seconds on a
  single Biome formatter error: a trailing blank line in `atmosphere.css`
  introduced by a `StrReplace` that removed a CSS rule and left a residual
  blank line behind.
- The `git-commit` skill was listed in the agent's available skills with the
  description "Use before every `git commit` in this workspace." It was not
  loaded before the commit was made.

## Missed assumptions

1. **Build pass implies lint pass.** Same assumption as PR #74. A passing
   `pnpm build` says nothing about Biome formatting; lint runs before build
   in CI and is independently gated.
2. **Skill availability implies skill activation.** A skill being listed in
   the available-skills surface does not mean it has been read. The agent
   must explicitly load it before the action it governs.
3. **An edit that "looks clean in the diff" is formatter-clean.** A
   `StrReplace` that deletes a block can leave whitespace artifacts. Visual
   review of the patch does not substitute for running the formatter.

## Missed guidance

The guidance was not missing — it was not loaded:

- `.cursor/skills/git-commit/SKILL.md` step 1: "Lint passes: run
  `pnpm lint`."
- `docs/guidance/agent-pre-commit-verification.md`: a full reflection on
  exactly this failure mode, including the "For future agents" checklist.
- `AGENTS.md` § Tool preferences names Biome and `pnpm lint` / `pnpm lint:fix`
  as the declared tooling.

What was missing was an *invocation contract* — an explicit expectation in
`AGENTS.md` that the relevant skill must be loaded before the action it
governs, not merely listed as available.

## Structural gap

Class of failure: **available-but-unloaded guidance**. A rule that exists in
a skill the agent could have read, but did not, is operationally equivalent
to no rule at all. The workspace's safety boundary explicitly forbids
coercive enforcement (e.g. blocking pre-commit hooks), so the loading
discipline must be carried by the agent's own behavior, anchored in canon.

## Proposed evolution

1. Add an explicit clause in `AGENTS.md` requiring the agent to load the
   matching skill before performing actions the skill governs (commit, PR,
   release, deployment), and naming `git-commit` as the canonical pre-commit
   skill.
2. Strengthen the `git-commit` skill description so its "use before every
   git commit" language is harder to skim past.
3. Keep the existing `agent-pre-commit-verification.md` as historical
   reference; do not duplicate its checklist.

## Research delta

None.

## Propagation decision

**Update canon now.** The failure is a canon-level invocation gap, not a
local fix. `AGENTS.md` is the single source of truth for agent behavior;
that is where the loading expectation belongs. Adapter files derive from it.

## Surfaces updated

- `AGENTS.md` — added skill-loading clause under "How agents should behave
  in this repo".
- `.cursor/skills/git-commit/SKILL.md` — sharpened the "When to use" line so
  the obligation reads as a precondition, not advice.
- `apps/site/src/styles/atmosphere.css` — the actual lint fix that triggered
  the climb (trailing blank line removed via `pnpm lint:fix`).

## Verification

- `pnpm lint` exits 0 locally before the next push on this branch.
- CI "Lint, Unit, Build, Type Check, E2E" passes on PR #196 after the fix
  commit.
- Future agent sessions: the loading clause in `AGENTS.md` is part of the
  always-applied workspace rule surface, so it is in-context for every turn
  without needing to be explicitly attached.

## PR-visible learning trace

Recurrence of the 2026-03-16 pre-commit lint lesson. Rule already existed;
the failure was skill-loading, not rule absence. Canon updated to require
explicit loading of the governing skill before commit/PR/release actions.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
