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

The Dependabot config lives at `.github/dependabot.yml`. It covers three package directories:

| Directory | Ecosystem | What it covers |
|---|---|---|
| `/` | npm | Root workspace, pnpm-lock.yaml |
| `/apps/site` | npm | Astro Starlight frontend |
| `/tools/ai-guidance` | npm | Capability alignment tooling |

Additionally, `github-actions` is monitored for any future CI workflows.

### How it works

- Checks weekly (Monday) for version updates
- Minor and patch updates are grouped into single PRs to reduce noise
- Major updates get individual PRs for careful review
- Astro ecosystem packages (`astro*`, `@astrojs/*`) are grouped together
- Vitest packages (`vitest`, `@vitest/*`) are grouped together
- Commit messages use `chore(deps):` to follow Conventional Commits
- PRs are labeled (`dependencies`, plus area labels like `astro` or `tooling`)

### Reviewing Dependabot PRs

1. Check the changelog/release notes linked in the PR
2. For major updates: read the migration guide before merging
3. Run `pnpm install` locally after checkout
4. Run `pnpm test` and `pnpm run build` to verify nothing broke
5. If tests fail, check if the breaking change requires code updates
6. Squash merge to `main` once verified

### Known limitations

- Dependabot does not natively understand pnpm workspaces the same way it understands npm workspaces. Each directory with a `package.json` needs its own entry.
- Dependabot uses `npm` ecosystem identifier even for pnpm repos. It reads `package.json` and `pnpm-lock.yaml` correctly.
- Grouped PRs may contain updates to multiple packages. Review the full diff, not just the title.

## Adding dependencies

When adding a new dependency:

1. Use `pnpm add <package>` (or `pnpm add -D <package>` for dev dependencies)
2. Always add to the specific workspace package, not the root: `pnpm --filter <package> add <dep>`
3. Use caret ranges (`^`) for semver-compatible updates (default)
4. After adding, verify: `pnpm install`, `pnpm test`, `pnpm run build`
5. Check if the new dependency's directory is covered by Dependabot. If you add a new workspace package, add a corresponding entry to `.github/dependabot.yml`.

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

## Version policy

- **Node.js**: track active LTS (currently >=24). Do not adopt current/development releases.
- **pnpm**: track latest stable 10.x. Evaluate major versions (e.g., 11.x) when they stabilize.
- **Astro/Starlight**: track latest stable 5.x. Evaluate Astro 6.x when it exits beta.
- **Vitest**: track latest stable 4.x.
- **TypeScript**: track latest stable 5.x. Evaluate 6.x when it exits beta.

When a major version upgrade is available, create a dedicated branch and PR for it. Do not bundle major upgrades with other changes.
