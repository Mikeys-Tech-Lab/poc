# Renovate Operations Reference

This file holds repo-local reference material for the `renovate-operations` skill. It does not replace live Renovate documentation.

## Current repo posture

- Base preset: `config:best-practices`
- Queue aid: `:dependencyDashboard`
- Commit style: semantic commits with `chore(deps)`
- Routine posture: grouped non-major updates auto-merge after required checks pass
- Security posture: Renovate consumes GitHub vulnerability alerts and auto-merges passing fix PRs using the lowest fixed version
- Major posture: dashboard approval required before PR creation or merge
- Manual exception path: failing checks, config migrations, or upgrades that require code changes

## Live-doc contract

Before editing `renovate.json`, re-check:

1. upgrade best practices
2. automerge behavior
3. vulnerability alerts
4. package rules
5. any specific matcher sections used by the change

## Repo surfaces that usually move together

- `renovate.json`
- `.cursor/skills/dependency-management/SKILL.md`
- `docs/guidance/dependency-update-operations.md`
- `AGENTS.md`
- `docs/decisions/README.md`
- latest ADR in `docs/decisions/`

## Decision trail

- `docs/decisions/0004-renovate-primary-dependency-engine.md`
- `docs/decisions/0005-renovate-automerge-posture.md`

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
