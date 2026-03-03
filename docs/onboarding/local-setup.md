# Local Setup

How to get the workspace running on your machine.

## Prerequisites

- **Node.js** — check with `node --version`. The repo uses the version specified in CI workflows. If unsure, check `.github/workflows/deploy-dev.yml` for the pinned version.
- **pnpm** — check with `pnpm --version`. This is the only supported package manager. Do not use npm or yarn.

If either is missing, install them before continuing. The repo does not prescribe an installation method.

## Install and run

```bash
pnpm install

pnpm run local
```

This starts the Astro Starlight docs site at `http://localhost:4321`.

Other commands:

| Command | What it does |
|---|---|
| `pnpm run build` | Production build of the docs site |
| `pnpm run preview` | Preview the production build locally |
| `pnpm test` | Run tooling tests (Vitest) |
| `pnpm run test:coverage` | Run tests with coverage |

## Operator configuration

This repo uses a local config file for operator-specific values: GitHub account, GPG signing key, SSH alias, deployment details. These values are gitignored and never committed.

1. Copy the template: `cp .local.example.md .local/config.md`
2. Fill in your values. The template at `.local.example.md` explains each field.
3. AI agents read `.local/config.md` at runtime for operator-specific preferences.

If you are only running the site locally and not deploying, you can skip the infrastructure sections of the config. The GitHub account and GPG signing sections are needed for committing.

## What you do not need for local development

- Deployment secrets (SSH keys, server credentials) — these are only needed for CI/CD
- Cloudflare access — not relevant locally
- GitHub App tokens — only needed for release automation

The site builds and runs locally with no external dependencies beyond Node.js and pnpm.
