---
name: dependency-management
description: Guides dependency version management, Dependabot configuration, and upgrade workflows. Use when adding, updating, or auditing dependencies in the workspace.
---

# Dependency Management

## When to use

- Adding or updating dependencies in any workspace package
- Configuring or modifying Renovate or Dependabot
- Reviewing Dependabot PRs
- Reviewing Renovate PRs
- Auditing dependencies for security or currency
- Troubleshooting dependency resolution or lockfile issues

## Target model

- `renovate.json` is the primary dependency update policy.
- `.github/dependabot.yml` is retained only for GitHub-native security update surfaces.
- Routine version updates do not belong in Dependabot anymore.

This split exists because the repo needs:

- bounded routine PR volume
- visible majors without queue sprawl
- security updates that are easy to identify and prioritize
- automatic routine coverage for future workspace packages
- less Release Please churn from scattered dependency merges

## Renovate configuration

The Renovate config lives at `renovate.json`.

### How it works

- Checks on a weekly cadence to keep routine merges batched
- Uses `config:best-practices` as the base preset
- Batches all npm minor and patch updates into a single non-major group
- Keeps GitHub Actions non-majors in their own group
- Auto-merges bounded non-major updates after CI passes
- Holds majors behind Dependency Dashboard approval
- Applies a 3-day `minimumReleaseAge` cooldown before automerge, with `internalChecksFilter: strict`, as a supply-chain guard
- Keeps concurrent routine PR volume capped
- Uses semantic commit messages so Release Please can trace dependency work cleanly

### Current grouping posture

- All npm non-majors (minor and patch) batch into one `npm non-major` group
- GitHub Actions non-majors are grouped together, separate from npm
- Lock file maintenance runs as its own low-risk stream
- Major updates are never grouped into routine flow; they stay dashboard-gated
- Security fixes are exempt from the release-age cooldown so remediation stays immediate

### Major updates

- Major updates are never auto-merged
- Major updates require explicit Dependency Dashboard approval
- Review them on purpose, not in the background queue

## Dependabot configuration

The Dependabot config lives at `.github/dependabot.yml`.

It is now security-only:

- npm security updates only
- GitHub Actions security updates only
- `open-pull-requests-limit: 0` disables routine version-update PRs while preserving security-update behavior
- Security PRs are labeled for visibility and reviewed manually

## Reviewing dependency PRs

### Routine Renovate PRs

1. Check the changelog or release notes linked in the PR
2. Confirm the PR matches the expected grouping boundary
3. Let CI finish before taking action
4. If the update is non-major and CI is green, the repo policy may auto-merge it
5. If the PR reveals a behavioral break, disable or narrow the matching rule rather than silently tolerating queue drift

### Security PRs

1. Review security PRs first
2. The repo may auto-merge vulnerability PRs after checks pass when the Renovate config allows it
3. Confirm the PR is a straightforward vulnerability fix and not a disguised migration
4. If a fix fails checks or needs code changes, treat it as a manual exception instead of widening the rule casually
5. Keep major upgrades and config migrations out of the “merge it automatically” mental model

## Backlog recovery

When the dependency queue becomes noisy again, recover in this order:

1. Bucket all open work into security, non-major, and major
2. Fix security work first
3. Close or replace stale routine PRs after the repo policy is correct
4. Let grouped non-major flow resume
5. Hold majors in the dashboard instead of leaving them in the open PR queue
6. Only widen automerge after the queue is stable

## Adding dependencies

When adding a new dependency:

1. Use `pnpm add <package>` (or `pnpm add -D <package>` for dev dependencies)
2. Always add to the specific workspace package, not the root: `pnpm --filter <package> add <dep>`
3. Use caret ranges (`^`) for semver-compatible updates (default)
4. After adding, verify: `pnpm install`, `pnpm test`, `pnpm run build`
5. Check whether the new package belongs in an existing Renovate grouping rule. If you add a new workspace package or a noisy dependency family, update `renovate.json` so the queue shape stays intentional.

## Upgrading dependencies manually

For immediate upgrades (not waiting for Dependabot):

```bash
# Check outdated packages across the workspace
pnpm outdated -r

# Update a specific package
pnpm --filter <workspace> update <package>

# Update all packages in a workspace (respect semver ranges)
pnpm --filter <workspace> update

# Update to latest (ignoring semver ranges) — use with caution
pnpm --filter <workspace> update --latest
```

After upgrading, always run tests and build before committing.

## Security

- Dependabot alerts are enabled for vulnerability notifications
- Dependabot security updates remain enabled as the GitHub-native security surface
- Renovate is not the routine security bottleneck. Security work skips normal queue expectations and is handled first
- If a security alert requires immediate action, don't wait for the weekly cycle — upgrade manually

### Transitive security overrides

When a transitive dependency carries a vulnerability and its direct parents cap it below the fixed version, use a pnpm override in `pnpm-workspace.yaml` (`overrides:`) to force the patched version. Verify the build and tests pass under the override before relying on it, because forcing a transitive bump can break a parent that expected the older API.

Current overrides:

| Package | Pinned to | Reason | Remove when |
|---|---|---|---|
| `esbuild` | `0.28.1` | GHSA-g7r4-m6w7-qqqr (dev-server file read). `astro` and `vite` cap esbuild below `0.28.1`. | `astro`/`vite` widen their esbuild range to include the fix, then `pnpm update` resolves it natively. |

### CI security scanning

Four repo security scanning workflows run on pushes to `main` and on PRs:

| Workflow | File | What it checks |
|---|---|---|
| Secret Scan | `secret-scan.yml` | gitleaks CLI scans for accidentally committed secrets |
| Supply Chain | `supply-chain.yml` | Shai-Hulud 2.0 Detector scans for compromised npm packages |
| CodeQL | `codeql.yml` | Static analysis for security vulnerabilities in JS/TS |
| Scorecard | `scorecard.yml` | OSSF supply chain security posture scoring |

gitleaks uses the MIT-licensed CLI directly (not the commercial gitleaks-action) to avoid org license requirements. The CLI version is pinned in the workflow and must be updated manually. CodeQL and Scorecard also run on a weekly schedule. A fifth live scan (`security-scan-live.yml`) runs after deployments and on manual dispatch.

### Updating pinned tool versions

Some tools are pinned outside of Dependabot's reach:

| Tool | Where pinned | How to update |
|---|---|---|
| gitleaks CLI | `GITLEAKS_VERSION` env var in `secret-scan.yml` | Check [gitleaks releases](https://github.com/gitleaks/gitleaks/releases), update the version string |
| GitHub Actions | Workflow `uses:` references | Renovate handles routine update PRs according to `renovate.json` |

## Enablement

This repo config assumes the Renovate GitHub App is installed for the repository. Setup steps live in `docs/infra/renovate-app-setup.md`.

For Renovate-specific config changes, live-doc grounding, config migration PRs, and safe automerge tuning, use `.cursor/skills/renovate-operations/SKILL.md`.

## Version policy

- **Node.js**: track active LTS. Keep the repo’s minimum supported version in `package.json` `engines.node` and revisit periodically. Do not adopt current/development releases.
- **pnpm**: track latest stable 11.x. Evaluate 12.x when it stabilizes.
- **Astro/Starlight**: track latest stable 5.x. Evaluate Astro 6.x when it exits beta.
- **Vitest**: track latest stable 4.x.
- **TypeScript**: track latest stable 5.x. Evaluate 6.x when it exits beta.

When a major version upgrade is available, create a dedicated branch and PR for it. Do not bundle major upgrades with other changes.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/dependency-management/SKILL.md
