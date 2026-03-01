# Governance

This directory contains descriptive governance docs for the Practice of Clarity workspace.

These documents are descriptive, not prescriptive, and must not introduce gating, scoring, or enforcement mechanisms.

## What is canonical

`AGENTS.md` (repo root) is the single source of truth for agent behavior.

Everything else is an adapter:

| Artifact | Role |
|---|---|
| `.cursor/rules/*.mdc` | Cursor-native rules (derived from `AGENTS.md`) |
| `.cursor/skills/*/SKILL.md` | Cursor project skills (stack-specific guidance) |
| `.claude/*` | Claude Code adapter (thin pointer to `AGENTS.md`) |
| `.github/copilot-instructions.md` | GitHub Copilot adapter (thin pointer to `AGENTS.md`) |

If an adapter conflicts with `AGENTS.md`, `AGENTS.md` wins.

## Anti-misuse boundary

This guidance system must not be used for:

- compliance scoring or certification
- surveillance or punitive monitoring
- performance evaluation or HR instrumentation
- required gates for approvals, staffing, or funding
- dashboard inputs for oversight or cross-team comparison

If it adds pressure instead of releasing it, it has drifted.

## Change process

Changes follow GitHub Flow:

1. Create a feature branch from `main`.
2. Open a pull request with:
   - Summary of the change
   - Minimal trace (assumptions and limits)
   - Test plan (what was verified, what was not)
   - Checkbox: updated `docs/architecture/workspace.md` if structure changed
3. Squash merge to `main`.

## Commit conventions

Conventional Commits with area-based scopes.

Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`

Scopes: `seedpack`, `ai`, `tooling`, `docs`, `astro`

Each commit does one thing. If you need to explain two unrelated changes, split them.
