# Dependency Update Operations

This document defines how dependency updates move through this repo now that Renovate is the primary update engine.

It is a guidance surface, not a gate. The point is to keep the queue legible, bounded, and reviewable.

## Target state

- Renovate is the primary dependency update engine for routine version updates.
- Dependabot is retained only for GitHub-native security update surfaces.
- The queue stays bounded by policy, not by human babysitting.

## Why this changed

The old queue shape mixed majors, routine non-majors, and security fixes into the same review surface. It also depended on a hand-maintained directory list in `.github/dependabot.yml`, which meant new workspace packages could fall out of update coverage silently.

This repo needed a model where:

- non-major updates flow automatically after CI
- major updates stay visible without clogging routine work
- security work is easy to identify and prioritize
- workspace coverage follows the monorepo shape without manual directory drift
- dependency updates do not create constant Release Please churn

## Policy invariants

- Non-major dependency work must not create an unbounded open PR queue.
- Major updates must remain visible and manually reviewable.
- Security updates must stay easy to identify and prioritize.
- New workspace packages must fall under routine update coverage automatically.
- Routine dependency flow must not turn release automation into constant background churn.

## Queue model

### Security updates

- Security updates stay visible immediately.
- No security update is auto-merged.
- Security fixes are reviewed manually.
- Dependabot remains the GitHub-native security surface. Its repo config is narrowed to security-only behavior.

### Non-major routine updates

- Renovate groups non-major updates by package family and ecosystem.
- Non-major updates are auto-merged after CI passes.
- npm updates inherit a minimum release age from Renovate best practices.
- The concurrent queue is capped so routine flow cannot sprawl indefinitely.

### Major updates

- Major updates are never auto-merged.
- Renovate holds them behind Dependency Dashboard approval.
- They are reviewed on purpose, not mixed into routine dependency flow.

## Repo contract

The repo-level config for this model lives in:

- `renovate.json`
- `.github/dependabot.yml`

`renovate.json` controls routine update flow. `.github/dependabot.yml` no longer drives routine version-update PRs.

## Release-noise boundary

Release Please remains the versioning and changelog engine. That means dependency automation must stay grouped and cadenced tightly enough that routine dependency merges do not create constant patch-release background motion.

The queue is considered healthy when:

- non-major PR volume stays small
- majors remain in the dashboard instead of the main PR list
- security work is easy to spot
- release PRs are a bounded consequence of intentional dependency movement, not constant churn

## Backlog recovery sequence

When the queue is messy, recover in this order:

1. Inventory open PRs and alerts into security, non-major, and major buckets.
2. Make sure the new Renovate policy is in place before touching the backlog.
3. Address open security alerts first.
4. Close or replace stale routine PRs once the new policy can recreate them cleanly.
5. Merge or recreate low-risk non-major updates under the grouped Renovate flow.
6. Move majors into dashboard-driven review instead of leaving them in the routine PR queue.
7. Enable or widen automerge only after the queue shape is clean and stable.

## Operator enablement

This repo config assumes the Renovate GitHub App is installed for the repository and allowed to open pull requests.

Setup details are in `docs/infra/renovate-app-setup.md`.

## References

- `AGENTS.md`
- `renovate.json`
- `.github/dependabot.yml`
- `docs/decisions/0004-renovate-primary-dependency-engine.md`

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
