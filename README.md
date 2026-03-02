# Practice of Clarity

A living practice of clarity designed for federation. Not a framework. Not a method. A set of seeds that grow differently in every context.

## Local setup

```bash
# Install dependencies
pnpm install

# Start the docs site locally (http://localhost:4321)
pnpm run local

# Production build
pnpm run build

# Preview the production build
pnpm run preview

# Run tooling tests
pnpm test

# Run tests with coverage
pnpm run test:coverage
```

### Operator configuration

This repo uses a local config pattern for operator-specific values (GitHub account, GPG key, SSH alias). These are gitignored and never committed.

1. Copy the template: `cp .local.example.md .local/config.md`
2. Fill in your values (GitHub account, GPG signing key, SSH host alias)
3. Agents read `.local/config.md` at runtime for operator-specific preferences

See [`.local.example.md`](.local.example.md) for the full template.

## Repo structure

| Path | Role |
|---|---|
| `seeds/` | Development-only canonical sources for the Practice of Clarity |
| `docs/practices/` | Practice documents and operational lenses |
| `AGENTS.md` | Canonical AI agent guidance (single source of truth) |
| `.cursor/rules/` | Cursor always-apply and file-scoped rules |
| `.cursor/skills/` | Cursor project skills (astro-starlight, node-tooling, git-commit, github-automation) |
| `.local/` | Operator-specific config (gitignored) |
| `apps/site/` | Astro Starlight frontend |
| `tools/ai-guidance/` | Capability alignment tooling (Node.js + Vitest) |
| `docs/architecture/` | Architecture docs with canonical workspace diagram |
| `docs/guidance/` | Descriptive guidance docs |
| `docs/ai/` | Capability alignment reports (generated) |

For the full architecture diagram and directory roles, see [`docs/architecture/workspace.md`](docs/architecture/workspace.md).

## AI agent support

This workspace provides checked-in guidance for three AI coding agents. All derive from a single canonical source.

| Agent | Guidance location | How it works |
|---|---|---|
| **Cursor** | `.cursor/rules/` + `.cursor/skills/` | Always-apply rules fire on every interaction. File-scoped rules fire on matching globs. Skills are invoked per task. |
| **Claude Code** | `.claude/CLAUDE.md` | Thin adapter pointing to `AGENTS.md`. |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Thin adapter pointing to `AGENTS.md`. |

[`AGENTS.md`](AGENTS.md) is the single source of truth. If any adapter conflicts with it, `AGENTS.md` wins.

### Recommended model configuration

For **Cursor**:

| Task type | Model | Mode |
|---|---|---|
| Architectural work, cross-cutting changes, new features | Claude Opus 4.6 | Max (thinking enabled) |
| Routine edits, single-file changes, formatting | Claude Sonnet 4.6 | Standard |
| Quick exploration, search, file lookup | Any fast model | Standard |

For **Claude Code**: use the highest available reasoning model with extended thinking.

For **GitHub Copilot**: use the default model; guidance is embedded in `.github/copilot-instructions.md`.

**Why Opus 4.6 with thinking as default**: this workspace has cross-cutting architecture (canonical guidance, adapters, tooling, conventions, frontend) where changes in one file ripple across many. The deeper reasoning prevents drift and catches contradictions. Switch to a faster model only when the task is clearly scoped to a single file or routine edit.

## Seeds

The `seeds/` directory contains the canonical sources for the Practice of Clarity. These are development-only files and are not part of the site content tree. The Starlight site at `apps/site/` evolves its content independently.

Current seeds:

- **Practice Foundations** — core concepts of the Practice of Clarity
- **A Living Practice of Clarity** — structural and philosophical grounding

## Licensing

- Code and tooling: [MIT License](LICENSE)
- Authored content (seeds, site pages, docs): [CC BY 4.0](LICENSE-CC-BY-4.0)

See individual files for applicable license.
