# Workspace Overview

What lives where, and how the pieces relate.

## Monorepo structure

This is a pnpm workspace with two packages and a shared root:

```
poc/
├── AGENTS.md                  # Canonical AI guidance
├── package.json               # Root workspace (CI/CD, docs, agent config)
├── pnpm-workspace.yaml        # Defines workspace packages
├── seeds/                     # Structural seed canon at repo root
├── continuity/                # Temporal anchors and architecture memory
├── mandateLenses/             # Canonical lens packages and context seeders
├── apps/
│   └── site/                  # Astro Starlight docs site (package: site)
├── tools/
│   └── ai-guidance/           # Capability alignment tooling (package: ai-guidance)
├── docs/
│   ├── onboarding/            # Repo-native onboarding and history paths
│   ├── architecture/          # Canonical workspace diagram
│   ├── guidance/              # Principles, workflow conventions, and durable learning records
│   ├── practices/             # Derived explainers and bridge docs
│   ├── infra/                 # Environment runbooks and protection layers
│   └── ai/                    # Generated capability reports
├── .cursor/
│   ├── rules/                 # Always-apply and file-scoped rules
│   └── skills/                # Per-task agent skills, including onboarding, Evolution Arc, Trace, Reflect and Evolve, and on-demand lens loading
├── .claude/                   # Claude Code adapter
├── .github/
│   ├── workflows/             # CI/CD, security scanning, releases
│   ├── copilot-instructions.md
│   └── dependabot.yml
├── renovate.json              # Renovate routine dependency policy
└── .local/                    # Operator config (gitignored)
```

## Key relationships

- **`AGENTS.md`** is the canonical source for agent behavior. Rules, skills, and adapters derive from it.
- **`seeds/`** contains the structural seed canon at the repo root. The site may host short seed orientations that point back to the repository texts, but `seeds/` does not become the site content tree.
- **`continuity/`** holds temporal anchors that preserve architecture and rollout direction over time.
- **`mandateLenses/`** holds canonical runtime lens packages. In each package, `lens.md` is canonical and `context-seeder.md` is derivative. These lens surfaces are loaded on demand, not as the default workspace bootstrap.
- **`apps/site/`** is the Astro Starlight frontend. Its content evolves independently from seeds.
- **`docs/practices/`** is descriptive and derived. It can bridge into a lens package, but it is not the runtime source of truth for that lens.
- **Default workspace bootstrap** is repo-native: `AGENTS.md`, `seeds/`, and `continuity/` ground fresh development chats before any on-demand lens is loaded.
- **`tools/ai-guidance/`** produces capability reports written to `docs/ai/`.
- **`docs/`** is for repo-level documentation. It is not site content. `docs/onboarding/` holds repo-native entry paths such as `onboard me`, `Evolution Arc`, and `Trace, Reflect and Evolve`, while `docs/guidance/evolution-arc.md` curates the history trace and `docs/guidance/trace-reflect-and-evolve.md` defines the durable learning flow.
- **`.local/config.md`** holds gitignored operator-specific local values. Template: `.local.example.md`. Populated local config is not a normal agent input.
- **`renovate.json`** drives routine dependency updates across the workspace. `.github/dependabot.yml` is narrowed to security-only behavior.

## Three versioned packages

Release Please tracks versions for three packages:

| Package | Path | What triggers a bump |
|---|---|---|
| `PoC` | `package.json` (root) | CI/CD, security, agent guidance, skills, rules, docs, repo config |
| `site` | `apps/site/package.json` | Content, theme, layout, Astro config |
| `ai-guidance` | `tools/ai-guidance/package.json` | Capability check logic, report format |

Commits are attributed to packages based on which files they change. The `github-automation` skill has the full versioning details.

## Architecture diagram

The canonical architecture diagram with all relationships is at [`docs/architecture/workspace.md`](../architecture/workspace.md). That document is updated with every structural change to the repo.

## What is not in this repo

- Production secrets, sensitive infrastructure details, or operator-local values in committed files (runtime values live in GitHub secrets or gitignored local files)
- Deployment infrastructure (managed externally on Infomaniak and Cloudflare)
- User data or databases (this is a static site workspace)

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
