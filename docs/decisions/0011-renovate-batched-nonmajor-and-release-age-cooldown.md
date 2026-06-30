# 0011 — Renovate batched non-major updates and release-age cooldown

**Status:** accepted
**Date:** 2026-06-30
**Supersedes:** refines [0005](0005-renovate-automerge-posture.md)
**PR:** pending

## Context

ADR 0004 made Renovate the primary update engine and ADR 0005 set the automerge posture: non-major auto-merges after checks, majors stay behind Dependency Dashboard approval, vulnerability PRs auto-merge at the lowest fixed version.

Two things prompted a refinement.

First, the npm non-major queue was split across four ecosystem groups (astro, test tooling, remaining dev tooling, remaining runtime). That produced several routine PRs per cycle for what is, operationally, the same decision: "apply safe non-major npm updates." The operator preference is to batch patch and minor into one queue when it is safe, and only break majors out for deliberate review.

Second, the automerge posture had no explicit release-age cooldown. It inherited the `security:minimumReleaseAgeNpm` cooldown from `config:best-practices` for npm only. Renovate's own upgrade best-practices recommend waiting before automerging third-party dependencies so a compromised or yanked release has time to be pulled from the registry before it can auto-merge.

## Decision

1. **All npm minor and patch updates batch into a single `npm non-major` group.** The four ecosystem-specific npm groups are removed. One batched PR per cycle replaces several.

2. **GitHub Actions non-major updates stay in their own group.** Action digest and version updates behave differently from application dependencies and should not be blocked behind, or block, the npm batch.

3. **Major updates remain separate and dashboard-gated.** Unchanged from ADR 0005.

4. **A release-age cooldown is now explicit.** `minimumReleaseAge` is set to 3 days repo-wide, with `internalChecksFilter: strict` so automerge actually waits out the cooldown rather than merging a pending release.

5. **Security fixes are exempt from the cooldown.** `vulnerabilityAlerts.minimumReleaseAge` is set to `null` so vulnerability remediation stays immediate. Security speed is not traded away for routine-update safety.

## Alternatives considered

**Group every non-major update, including GitHub Actions, into one PR (`group:allNonMajor`).** Rejected: it couples CI-runner action bumps to application dependency churn. A single failing item would block the whole batch across two unrelated change classes, and Actions updates deserve their own review surface.

**Keep the four ecosystem groups.** Rejected: the split created routine PR volume without a matching review benefit, since non-major npm updates are auto-merged after CI anyway. The granularity was cost without payoff for this repo's posture.

**Use a longer cooldown (14 days).** Considered and deferred. Renovate recommends 14 days for automerged third-party dependencies. The operator chose 3 days to keep routine flow moving while still dodging same-day yanked or compromised releases. This can be revisited if a supply-chain incident shows the window is too short.

**No cooldown.** Rejected: it leaves automerge exposed to brand-new releases, which is the exact window registries use to pull malicious publishes.

## Consequences

**What improves:**
- One batched npm non-major PR per cycle instead of several. Less queue noise, less Release Please churn.
- Automerge now has an explicit, inspectable supply-chain cooldown rather than an inherited preset default.
- Security remediation stays fast because it is explicitly exempt from the cooldown.

**What becomes explicit:**
- The batch boundary is "npm non-major" and "github-actions non-major", with majors and security on their own paths.
- The cooldown value is a deliberate trade, not an accident of preset inheritance.

**What becomes harder:**
- A batched npm PR mixes several packages, so a single bad update can hold the batch. CI strength carries more weight here, consistent with ADR 0005.
- Reading per-package changelogs is less granular than ecosystem-split PRs. Acceptable given non-major npm updates auto-merge after CI.

## References

- `renovate.json`
- `docs/guidance/dependency-update-operations.md`
- `.cursor/skills/renovate-operations/SKILL.md`
- `.cursor/skills/dependency-management/SKILL.md`
- `docs/decisions/0004-renovate-primary-dependency-engine.md`
- `docs/decisions/0005-renovate-automerge-posture.md`

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
