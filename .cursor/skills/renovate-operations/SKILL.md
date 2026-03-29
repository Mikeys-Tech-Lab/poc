---
name: renovate-operations
description: Grounds Renovate configuration, Renovate PR review, and config migration handling in live Renovate documentation. Use when modifying `renovate.json`, reviewing Renovate PRs, tuning automerge or vulnerability policy, or when the user mentions Renovate setup, migrations, dashboards, or dependency queue behavior.
---

# Renovate Operations

## When to use

- Modifying `renovate.json`
- Reviewing Renovate PRs, including config migration PRs
- Tuning automerge, vulnerability alerts, grouping, or dashboard policy
- Investigating unexpected Renovate behavior
- Updating docs or skills that describe Renovate behavior in this repo

## Core rule

Do not edit Renovate config from memory alone.

Before changing `renovate.json`, re-check live Renovate docs for the exact features you are using. The repo policy may be stable, but Renovate config names, matcher syntax, and defaults can move.

## Required live-doc grounding

Read the current versions of these docs before changing Renovate behavior:

1. `https://docs.renovatebot.com/upgrade-best-practices/`
2. `https://docs.renovatebot.com/key-concepts/automerge/`
3. `https://docs.renovatebot.com/configuration-options/#vulnerabilityalerts`
4. `https://docs.renovatebot.com/configuration-options/#packagerules`
5. Any matcher-specific section you rely on, such as `matchPackageNames`, `matchDepTypes`, or `matchUpdateTypes`

If a config migration PR exists, inspect its diff and compare it against the docs before deciding whether to merge, edit, or supersede it.

## Repo-specific policy

- `renovate.json` is the primary dependency update policy.
- Dependabot remains the GitHub-native alerting surface.
- Major updates stay behind Dependency Dashboard approval.
- Routine non-major updates are intended to auto-merge after required checks pass.
- Vulnerability PRs are intended to auto-merge after required checks pass, using the lowest fixed version by default.
- Failing PRs, code-breaking upgrades, and config migrations are exception paths that may require manual intervention.

## Workflow

1. Read `renovate.json`.
2. Refresh the live Renovate docs listed above.
3. Compare the repo config with any live Renovate PRs or migration PRs.
4. Decide whether the repo wants:
   - policy change
   - syntax migration only
   - both
5. Update the config.
6. Update the affected docs and skills in the same PR.
7. Run repo verification:
   - `pnpm lint`
   - `pnpm test` if tooling behavior changed
   - `pnpm build`
8. If working on an open PR, update the PR description after pushing.

## Documentation ripple

When Renovate behavior changes, check these surfaces:

- `AGENTS.md`
- `.cursor/skills/dependency-management/SKILL.md`
- `docs/guidance/dependency-update-operations.md`
- `docs/infra/renovate-app-setup.md`
- `docs/onboarding/ai-guidance.md`
- `docs/architecture/workspace.md`
- ADRs in `docs/decisions/` if the decision meaningfully changes policy

## Current references

- For repo-specific policy details, see [reference.md](reference.md)

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
