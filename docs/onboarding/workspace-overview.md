# Workspace Overview

What lives where, and how the pieces relate.

## Monorepo structure

This is a pnpm workspace with two packages and a shared root:

```
poc/
├── AGENTS.md                  # Canonical AI guidance
├── package.json               # Root workspace (CI/CD, docs, agent config)
├── pnpm-workspace.yaml        # Defines workspace packages
├── apps/
│   └── site/                  # Astro Starlight docs site (package: site)
├── tools/
│   └── ai-guidance/           # Capability alignment tooling (package: ai-guidance)
├── seeds/                     # Development-only Practice of Clarity sources
├── docs/
│   ├── onboarding/            # Newcomer paths (this directory)
│   ├── architecture/          # Canonical workspace diagram
│   ├── guidance/              # Principles and workflow conventions
│   ├── practices/             # Operational lenses (e.g., Sensible Defaults)
│   ├── infra/                 # Environment runbooks and protection layers
│   └── ai/                    # Generated capability reports
├── .cursor/
│   ├── rules/                 # Always-apply and file-scoped rules
│   └── skills/                # Per-task agent skills
├── .claude/                   # Claude Code adapter
├── .github/
│   ├── workflows/             # CI/CD, security scanning, releases
│   ├── copilot-instructions.md
│   └── dependabot.yml
└── .local/                    # Operator config (gitignored)
```

## Key relationships

- **`AGENTS.md`** is the canonical source. Rules, skills, and adapters derive from it.
- **`seeds/`** contains development-only source material. It never becomes site content.
- **`apps/site/`** is the Astro Starlight frontend. Its content evolves independently from seeds.
- **`tools/ai-guidance/`** produces capability reports written to `docs/ai/`.
- **`docs/`** is for repo-level documentation. It is not site content.
- **`.local/config.md`** holds operator-specific values (gitignored). Template: `.local.example.md`.

## Three versioned packages

Release Please tracks versions for three packages:

| Package | Path | What triggers a bump |
|---|---|---|
| `workspace` | `package.json` (root) | CI/CD, security, agent guidance, skills, rules, docs, repo config |
| `site` | `apps/site/package.json` | Content, theme, layout, Astro config |
| `ai-guidance` | `tools/ai-guidance/package.json` | Capability check logic, report format |

Commits are attributed to packages based on which files they change. The `github-automation` skill has the full versioning details.

## Architecture diagram

The canonical architecture diagram with all relationships is at [`docs/architecture/workspace.md`](../architecture/workspace.md). That document is updated with every structural change to the repo.

## What is not in this repo

- Production secrets, IPs, or credentials (these live in GitHub secrets and `.local/config.md`)
- Deployment infrastructure (managed externally on Infomaniak and Cloudflare)
- User data or databases (this is a static site workspace)
