# Practice of Clarity

A living practice of clarity designed for federation. Not a framework. Not a method. A set of seeds that grow differently in every context.

## Quick start

```bash
pnpm install
pnpm run local        # Start the docs site at localhost:4321
pnpm test             # Run tooling tests
pnpm run build        # Production build
```

## Repo structure

| Path | Role |
|---|---|
| `seeds/` | Development-only canonical sources for the Practice of Clarity |
| `Sensible Defaults.md` | Delivery realism lens (full text) |
| `AGENTS.md` | Canonical AI agent guidance (single source of truth) |
| `.cursor/rules/` | Cursor always-apply and file-scoped rules |
| `.cursor/skills/` | Cursor project skills (astro, node-tooling, git-commit, github-automation) |
| `.local/` | Operator-specific config (gitignored). Copy `.local.example.md` to `.local/config.md` |
| `apps/site/` | Astro Starlight frontend |
| `tools/ai-guidance/` | Capability alignment tooling (Node.js + Vitest) |
| `docs/architecture/` | Architecture docs with canonical workspace diagram |
| `docs/governance/` | Descriptive governance docs |

For the full architecture diagram, see [`docs/architecture/workspace.md`](docs/architecture/workspace.md).

## Seeds

The `seeds/` directory contains the canonical sources for the Practice of Clarity. These are development-only files and are not part of the site content tree. The Starlight site at `apps/site/` evolves its content independently.

Current seeds:

- **Practice Foundations** — core concepts of the Practice of Clarity
- **A Living Practice of Clarity** — structural and philosophical grounding

## AI guidance

All AI agents (Cursor, Claude Code, GitHub Copilot) follow the conventions in [`AGENTS.md`](AGENTS.md). Platform-specific adapters derive from that file. If an adapter conflicts, `AGENTS.md` wins.

## Licensing

- Code and tooling: [MIT License](LICENSE)
- Authored content (seeds, site pages, docs): [CC BY 4.0](LICENSE-CC-BY-4.0)

See individual files for applicable license.
