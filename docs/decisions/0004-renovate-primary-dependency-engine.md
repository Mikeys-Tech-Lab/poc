# 0004 — Renovate as the primary dependency update engine

**Status:** accepted
**Date:** 2026-03-29
**PR:** pending

## Context

The repo's dependency queue had become hard to reason about. Open PRs mixed routine non-major updates, major upgrades, and security work in the same surface. Release Please then turned frequent dependency merges into background patch-release churn.

The previous Dependabot configuration also depended on a hand-maintained directory list in `.github/dependabot.yml`. That was workable while the workspace had only a few packages, but it created a structural footgun. New workspace packages could fall outside automated version-update coverage unless someone remembered to update the list.

This repo needed a dependency model that could keep routine work flowing, hold majors visibly, preserve security prioritization, and follow monorepo shape without fragile directory bookkeeping.

## Decision

1. **Renovate becomes the primary dependency update engine for routine version updates.**

2. **Dependabot is narrowed to GitHub-native security update roles only.** It no longer drives routine version-update PR flow for npm packages or GitHub Actions.

3. **The dependency queue is split into three policy buckets:**
   - **Security:** visible immediately, manual review, no automerge
   - **Non-major routine:** grouped, bounded, and auto-merged after CI
   - **Major:** held behind dashboard approval and reviewed deliberately

4. **Routine dependency coverage must follow the monorepo automatically.** The repo must not rely on a hand-maintained package-directory list for routine version updates.

5. **Release-noise is part of the dependency policy.** Grouping and cadence must keep dependency automation from turning Release Please into constant background churn.

## Alternatives considered

**Keep Dependabot as the primary update engine and tighten the config.** Rejected: grouping and limits could reduce noise, but the queue would still lack a first-class dashboard and a strong major-update holding surface. It would also preserve the hand-maintained directory coverage pattern for routine updates.

**Run Renovate and Dependabot side by side for routine version updates.** Rejected: two tools competing for the same routine queue creates ambiguity, duplicate surface area, and drift in operator expectations. The problem is not only update volume. It is the shape of the queue.

**Leave routine updates manual and keep security-only automation.** Rejected: this would reduce bot noise at the cost of reintroducing human babysitting and delayed maintenance. The repo would drift until the next painful cleanup cycle.

## Consequences

**What improves:**
- Routine dependency work gets a bounded queue with explicit policy.
- Major updates stay visible without blocking low-risk flow.
- The repo gains automatic routine coverage for future workspace packages.
- The reasoning for the queue model becomes inspectable instead of tribal memory.

**What becomes explicit:**
- Renovate app setup is now part of the repo's operational contract.
- Dependency automation has to be documented across canon, skills, onboarding, and architecture surfaces.
- Security updates and routine version updates are no longer treated as the same class of work.

**What becomes harder:**
- Initial setup is more involved than a GitHub-native-only model.
- The first pass requires cleanup of existing Dependabot routine PRs so the new queue can start clean.

## References

- `renovate.json`
- `.github/dependabot.yml`
- `docs/guidance/dependency-update-operations.md`
- `docs/infra/renovate-app-setup.md`
- `AGENTS.md`

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
