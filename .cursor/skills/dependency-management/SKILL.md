---
name: dependency-management
description: Guides dependency version management, Dependabot configuration, and upgrade workflows. Use when adding, updating, or auditing dependencies in the workspace.
---

# Dependency Management

## When to use

- Adding or updating dependencies in any workspace package
- Configuring or modifying Dependabot
- Reviewing Dependabot PRs
- Auditing dependencies for security or currency
- Troubleshooting dependency resolution or lockfile issues

## Dependabot configuration

The Dependabot config lives at `.github/dependabot.yml`. It uses two ecosystem entries:

| Entry | Ecosystem | Directories | What it covers |
|---|---|---|---|
| npm | npm | `/`, `/apps/site`, `/tools/ai-guidance` | All workspace packages via a single `directories` list |
| github-actions | github-actions | `/` | All workflow action versions |

Using a single npm entry with `directories` (plural) avoids the lockfile conflict problem where separate entries generate PRs that all modify `pnpm-lock.yaml`.

### How it works

- Checks weekly (Monday) for version updates
- Minor and patch updates are grouped into single PRs to reduce noise
- Major updates get individual PRs for careful review
- Astro ecosystem packages (`astro*`, `@astrojs/*`, `@catppuccin/*`) are grouped together
- Vitest packages (`vitest`, `@vitest/*`) are grouped together
- Remaining minor/patch updates use `group-by: dependency-name` to consolidate the same dependency across directories into one PR
- Security updates are grouped into a single PR via `applies-to: security-updates`
- GitHub Actions minor/patch updates are grouped together
- Commit messages use `chore(deps):` to follow Conventional Commits
- PRs are labeled `dependencies` (npm) or `dependencies` + `ci` (GitHub Actions)
- `versioning-strategy: increase` bumps the lower bound in `package.json` to document the minimum tested version

### Reviewing Dependabot PRs

1. Check the changelog/release notes linked in the PR
2. For major updates: read the migration guide before merging
3. Run `pnpm install` locally after checkout
4. Run `pnpm test` and `pnpm run build` to verify nothing broke
5. If tests fail, check if the breaking change requires code updates
6. Squash merge to `main` once verified

### Known limitations

- Dependabot uses `npm` ecosystem identifier even for pnpm repos. It reads `package.json` and `pnpm-lock.yaml` correctly.
- Grouped PRs may contain updates to multiple packages. Review the full diff, not just the title.
- Cross-directory grouping (`group-by: dependency-name`) applies to version updates only; security updates use their own group.

## Adding dependencies

When adding a new dependency:

1. Use `pnpm add <package>` (or `pnpm add -D <package>` for dev dependencies)
2. Always add to the specific workspace package, not the root: `pnpm --filter <package> add <dep>`
3. Use caret ranges (`^`) for semver-compatible updates (default)
4. After adding, verify: `pnpm install`, `pnpm test`, `pnpm run build`
5. Check if the new dependency's directory is covered by Dependabot. If you add a new workspace package, add its path to the `directories` list in `.github/dependabot.yml`.

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
- Dependabot security updates are enabled for automatic patching of known vulnerabilities
- Grouped security updates consolidate patches into fewer PRs
- If a security alert requires immediate action, don't wait for the weekly cycle — upgrade manually

### CI security scanning

Four security scanning workflows run on pushes to `main` and on PRs:

| Workflow | File | What it checks |
|---|---|---|
| Secret Scan | `secret-scan.yml` | gitleaks CLI scans for accidentally committed secrets |
| Supply Chain | `supply-chain.yml` | Shai-Hulud 2.0 Detector scans for compromised npm packages |
| CodeQL | `codeql.yml` | Static analysis for security vulnerabilities in JS/TS |
| Scorecard | `scorecard.yml` | OSSF supply chain security posture scoring |

gitleaks uses the MIT-licensed CLI directly (not the commercial gitleaks-action) to avoid org license requirements. The CLI version is pinned in the workflow and must be updated manually. CodeQL and Scorecard also run on a weekly schedule.

### Updating pinned tool versions

Some tools are pinned outside of Dependabot's reach:

| Tool | Where pinned | How to update |
|---|---|---|
| gitleaks CLI | `GITLEAKS_VERSION` env var in `secret-scan.yml` | Check [gitleaks releases](https://github.com/gitleaks/gitleaks/releases), update the version string |
| GitHub Actions | Action `@v4` tags in workflow files | Dependabot handles minor/patch updates automatically |

## Version policy

- **Node.js**: track active LTS. Keep the repo’s minimum supported version in `package.json` `engines.node` and revisit periodically. Do not adopt current/development releases.
- **pnpm**: track latest stable 10.x. Evaluate major versions (e.g., 11.x) when they stabilize.
- **Astro/Starlight**: track latest stable 5.x. Evaluate Astro 6.x when it exits beta.
- **Vitest**: track latest stable 4.x.
- **TypeScript**: track latest stable 5.x. Evaluate 6.x when it exits beta.

When a major version upgrade is available, create a dedicated branch and PR for it. Do not bundle major upgrades with other changes.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/dependency-management/SKILL.md
