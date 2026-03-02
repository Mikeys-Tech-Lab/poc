---
title: How to use this repo
description: Quick orientation for developers and contributors.
---

## Quick start

- Start with the seeds: `seeds/A Living Practice of Clarity.md`
- If you are under time pressure: `docs/practices/sensible-defaults.md`
- If you are dealing with disagreement: `seeds/A Bridge Between Conflicting Nodes.md`

## Repo structure

| Path | What it is |
|---|---|
| `seeds/` | Development-only canonical sources for the practice |
| `docs/practices/` | Practice documents and operational lenses |
| `AGENTS.md` | Canonical AI agent guidance |
| `.cursor/rules/` | Cursor-native rules (always-apply + file-scoped) |
| `.cursor/skills/` | Cursor project skills (astro, tooling, github) |
| `docs/` | Governance, architecture, and capability reports |
| `tools/ai-guidance/` | TypeScript tooling for capability alignment checks |
| `apps/site/` | This Astro Starlight site |

## Seeds are not site content

The `seeds/` directory contains development-only sources. They inform the practice but are not imported directly into the site. The site content evolves independently.

## Contributing

Changes follow GitHub Flow: feature branch, pull request with trace and test plan, squash merge to main.

Commits use Conventional Commits: `<type>(<scope>): <subject>`

See `docs/governance/` for full conventions.
