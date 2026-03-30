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
| `pnpm screendump` | Build the site, export desktop/tablet/mobile screenshots for both atmospheric themes, and create a versioned zip in `.dist/` |

## Operator configuration

This repo uses gitignored local config for operator-specific values such as GitHub account context, GPG signing preferences, SSH aliases, and deployment details. These values are never committed.

1. Copy the template: `cp .local.example.md .local/config.md`
2. Fill in your values. The template at `.local.example.md` explains each field.
3. Do not treat populated `.local/config.md` as a normal agent input. Agents use operator-mediated disclosure for runtime facts and treat `.local.example.md` as structure only.

If you are only running the site locally and not deploying, you can skip the infrastructure sections of the config. For AI-assisted work, keep the boundary clear:

- non-sensitive preferences may be disclosed intentionally
- operational facts should be shared minimally when needed
- sensitive infrastructure values should not transit AI tooling

## What you do not need for local development

- Deployment secrets (SSH keys, server credentials) — these are only needed for CI/CD
- Cloudflare access — not relevant locally
- GitHub App tokens — only needed for release automation

The site builds and runs locally with no external dependencies beyond Node.js and pnpm.
