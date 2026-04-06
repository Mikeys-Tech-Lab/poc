# Guidance

This directory contains descriptive guidance docs for the Practice of Clarity workspace.

These documents are descriptive, not prescriptive, and must not introduce gating, scoring, or enforcement mechanisms.

## Canonical agent sources

- `AGENTS.md` is the single source of truth for agent behavior.
- Cursor rules (`.cursor/rules/*.mdc`) and skills (`.cursor/skills/*/SKILL.md`) derive from `AGENTS.md`.
- Claude (`.claude/CLAUDE.md`) and Copilot (`.github/copilot-instructions.md`) are thin pointers to `AGENTS.md`.

The public site remains the canonical human-facing expression and entry surface
for the practice.

## Anti-misuse boundary

This workspace documents reasoning, not people. Reports, traces, and tooling output must not be aggregated, ranked, or attached to individuals. If any artifact in this repo is repurposed for surveillance, punitive monitoring, or performance evaluation, it has been misused.

## Guidance docs

- [Evolution Arc](evolution-arc.md) — curated map of the repo's trace surfaces, source roles, and Mermaid-backed history path.
- [Trace Climb](trace-climb.md) — repo-native close-phase learning flow for turning non-trivial work into durable learning.
- [Evolution Records](evolution-records/README.md) — durable learning artifacts produced by `Trace Climb`.
- [Dependency update operations](dependency-update-operations.md) — target state, policy invariants, queue model, and backlog recovery order for dependency automation.
- [Licensing surface policy](licensing-surface-policy.md) — how the MIT / CC BY 4.0 split is expressed across tracked markdown-like source files and checked deterministically.
- [Structural reflection and evolution](structural-reflection-and-evolution.md) — the high-level rule for converting incidents into patterns, guardrails, and workspace changes.
- [Agent pre-commit verification](agent-pre-commit-verification.md) — reflection on lint-before-commit, accessibility override regressions, assumptions, and mistakes from publication refinements.

## Change process

- GitHub Flow: feature branches from `main`, PRs with squash merge.
- PRs include summary, context trace, learning trace, test plan, and checklist.
- Conventional Commits: `type(scope): subject`.
- Documentation evolution discipline: every PR updates all affected documentation in the same PR. See `AGENTS.md` § Documentation evolution discipline for the full rule and specific obligations by change type.
- Architecture Decision Records: significant structural decisions are recorded in `docs/decisions/`. See `docs/decisions/README.md` for criteria and template.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
