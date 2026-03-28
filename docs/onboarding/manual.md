# Manual Onboarding

This page covers the same ground as the agent-assisted onboarding, written for humans reading directly. If you are using an AI-assisted editor (Cursor, Claude Code, GitHub Copilot), say "onboard me" in chat for setup and workspace orientation, or "Evolution Arc" for the repo's history and reasoning trace.

## Choose your path

**Just want to run it locally?** Go to [Local setup](local-setup.md). Install prerequisites, run `pnpm install && pnpm run local`, done.

**Want to understand the workspace?** Read these three in order:
1. [Workspace overview](workspace-overview.md) — what lives where
2. [AI guidance architecture](ai-guidance.md) — how AI agents are guided and why
3. [Security and public repo hygiene](security.md) — what is safe to commit and say

**Want to understand how this workspace became what it is?** Read [Evolution Arc](evolution-arc.md). That path starts with the curated trace map and then points you into ADRs, guidance docs, architecture, changelog, and commits.

**Ready to contribute?** Add:
4. [Contributing](contributing.md) — branching, commits, PRs

**Need the full picture?** Also read:
5. [Infrastructure and environments](infrastructure.md) — deployment model and protection layers

## Topic index

The full topic index with prerequisites and descriptions is at the [README](README.md) in this directory. AI agents read that file to discover topics dynamically. You can use it the same way.

## What to read first

If you are new to this repo and reading without AI assistance, this is the recommended order:

1. **[Local setup](local-setup.md)** — get it running. No external dependencies beyond Node.js and pnpm. Takes a few minutes.

2. **[Workspace overview](workspace-overview.md)** — understand the monorepo structure. Three versioned packages, a docs site, and a tooling package. The tree view shows what lives where.

3. **[AI guidance architecture](ai-guidance.md)** — this repo has an unusual feature: a canonical AI guidance file (`AGENTS.md`) that all AI agents read. Rules fire automatically, skills are invoked per task. Understanding this explains many of the repo's conventions.

4. **[Security and public repo hygiene](security.md)** — before you commit anything or open a PR, read this. Short version: no secrets, IPs, or internal paths in any public-facing text. Four CI security scans run automatically.

5. **[Contributing](contributing.md)** — GitHub Flow, Conventional Commits, feature lifecycle with a reflect-before-PR step. PRs are reasoning traces, not just changelogs.

6. **[Infrastructure and environments](infrastructure.md)** — three deployment environments with layered protection. This page is intentionally high-level. The deep docs are in `docs/infra/`.

## Key files to know

| File | What it is |
|---|---|
| `AGENTS.md` | Canonical AI agent guidance. The single source of truth. |
| `docs/guidance/evolution-arc.md` | Curated map of the repo's trace surfaces for the `Evolution Arc` path. |
| `.local.example.md` | Template for operator-specific config. Copy to `.local/config.md`. |
| `docs/architecture/workspace.md` | Canonical architecture diagram. Updated with every structural change. |
| `docs/guidance/README.md` | Principles and workflow conventions overview. |

## Getting help

If you are working in an AI-assisted editor, the agent can answer questions about this repo by reading the docs and guidance files. If you are working without AI assistance, the docs in this directory and the files linked above are the starting points.
