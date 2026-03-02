---
title: How to use this repo
description: Quick orientation for developers and contributors.
---

## Quick start

- Start with the seeds: [`seeds/A Living Practice of Clarity.md`](https://github.com/Mikeys-Tech-Lab/poc/blob/main/seeds/A%20Living%20Practice%20of%20Clarity.md)
- If you are under time pressure: [`docs/practices/sensible-defaults.md`](https://github.com/Mikeys-Tech-Lab/poc/blob/main/docs/practices/sensible-defaults.md)
- If you are dealing with disagreement: [`seeds/A Bridge Between Conflicting Nodes.md`](https://github.com/Mikeys-Tech-Lab/poc/blob/main/seeds/A%20Bridge%20Between%20Conflicting%20Nodes.md)

## Repo structure

| Path | What it is |
|---|---|
| [`seeds/`](https://github.com/Mikeys-Tech-Lab/poc/tree/main/seeds) | Development-only canonical sources for the practice |
| [`docs/practices/`](https://github.com/Mikeys-Tech-Lab/poc/tree/main/docs/practices) | Practice documents and operational lenses |
| [`AGENTS.md`](https://github.com/Mikeys-Tech-Lab/poc/blob/main/AGENTS.md) | Canonical AI agent guidance |
| [`.cursor/rules/`](https://github.com/Mikeys-Tech-Lab/poc/tree/main/.cursor/rules) | Cursor-native rules (always-apply + file-scoped) |
| [`.cursor/skills/`](https://github.com/Mikeys-Tech-Lab/poc/tree/main/.cursor/skills) | Cursor project skills (astro, tooling, github) |
| [`docs/`](https://github.com/Mikeys-Tech-Lab/poc/tree/main/docs) | Guidance, architecture, and capability reports |
| [`tools/ai-guidance/`](https://github.com/Mikeys-Tech-Lab/poc/tree/main/tools/ai-guidance) | TypeScript tooling for capability alignment checks |
| [`apps/site/`](https://github.com/Mikeys-Tech-Lab/poc/tree/main/apps/site) | This Astro Starlight site |

## Seeds are not site content

The `seeds/` directory contains development-only sources. They inform the practice but are not imported directly into the site. The site content evolves independently.

## Contributing

Changes follow GitHub Flow: feature branch, pull request with trace and test plan, squash merge to main.

Commits use Conventional Commits: `<type>(<scope>): <subject>`

See [`docs/guidance/`](https://github.com/Mikeys-Tech-Lab/poc/tree/main/docs/guidance) for full conventions.
