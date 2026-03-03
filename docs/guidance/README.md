# Guidance

This directory contains descriptive guidance docs for the Practice of Clarity workspace.

These documents are descriptive, not prescriptive, and must not introduce gating, scoring, or enforcement mechanisms.

## Canonical sources

- `AGENTS.md` is the single source of truth for agent behavior.
- Cursor rules (`.cursor/rules/*.mdc`) and skills (`.cursor/skills/*/SKILL.md`) derive from `AGENTS.md`.
- Claude (`.claude/CLAUDE.md`) and Copilot (`.github/copilot-instructions.md`) are thin pointers to `AGENTS.md`.

## Anti-misuse boundary

This workspace documents reasoning, not people. Reports, traces, and tooling output must not be aggregated, ranked, or attached to individuals. If any artifact in this repo is repurposed for surveillance, punitive monitoring, or performance evaluation, it has been misused.

## Change process

- GitHub Flow: feature branches from `main`, PRs with squash merge.
- PRs include summary, context trace, test plan, and checklist.
- Conventional Commits: `type(scope): subject`.
- Documentation evolution discipline: every PR updates all affected documentation in the same PR. See `AGENTS.md` § Documentation evolution discipline for the full rule and specific obligations by change type.
