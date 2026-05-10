# Contributing

How work moves through this repo: branching, committing, and opening pull requests.

## GitHub Flow

All work happens on feature branches from `main`. No commits directly on `main`.

1. Create a feature branch from `main`
2. Make changes with atomic commits
3. Open a pull request
4. Squash merge back to `main`

## Branch naming

Format: `<type>/<scope>/<short-description>`

Examples:
- `feat/astro/add-dark-mode-toggle`
- `fix/docs/correct-sidebar-link`
- `chore/ai/update-onboarding`

Types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`

Scopes: `seedpack`, `ai`, `tooling`, `docs`, `astro`, `infra`

## Conventional Commits

Every commit message follows the format: `<type>(<scope>): <subject>`

Each commit does one thing. If you need to explain two unrelated changes, split them into separate commits.

Because this repo squash-merges PRs to `main`, PR titles should also use
Conventional Commit format. The default squash-merge title becomes the commit on
`main` that Release Please parses. Keep the title short and let the PR body
carry the longer reasoning trace.

The `git-commit` skill (`.cursor/skills/git-commit/SKILL.md`) has the full commit discipline. AI agents read it before every commit.

## Feature lifecycle

Non-trivial work follows three phases:

1. **Start** — create a branch, confirm scope
2. **Work** — atomic commits, push periodically
3. **Close** — reflect, cleanup, then PR

The Close phase matters. Before creating a PR:
- Run `pnpm license:check` and keep the markdown-like source license notices intact
- Run `pnpm run build` and check for zero warnings
- Search for unused exports, dead code, orphaned config
- Check that docs, skills, and rules are updated if the work introduced new patterns
- Verify naming conventions and file organization are consistent
- Run `Trace Climb` for non-trivial work and classify the branch as `required`, `recommended`, or `skip allowed`
- If `Trace Climb` is required or chosen, write or update an `Evolution Record` in `docs/guidance/evolution-records/` and carry the bounded learning trace into the PR

The `github-automation` skill (`.cursor/skills/github-automation/SKILL.md`) has the detailed lifecycle.

## Dependency updates

Routine dependency updates are not handled like ordinary feature work.

- Renovate is the primary engine for routine version updates.
- Dependabot is retained for GitHub-native security update surfaces.
- Non-major updates are grouped and may auto-merge after CI.
- Major updates stay in the Renovate Dependency Dashboard until reviewed deliberately.

Authoritative policy: [`docs/guidance/dependency-update-operations.md`](../guidance/dependency-update-operations.md)

## Pull request expectations

PRs are reasoning traces, not just changelogs. The description should explain:

1. **Summary** — what the PR adds or changes
2. **Context** — how the work evolved, what decisions were made, what went wrong
3. **Trace** — assumptions, limits, what was not checked
4. **Learning trace** — whether durable learning was preserved, linked, or intentionally skipped
5. **Test plan** — what was verified, what was not

Someone reading the PR should understand the full journey, not just the final state.

### Security scan before posting

Before creating or updating a PR description, scan the text for origin IPs, internal paths, SSH hostnames, client IDs, or key filenames. This is a public repo. PR descriptions are permanently archived.

Full PR conventions: [`AGENTS.md` § Repo workflow conventions](../../AGENTS.md)

## Automated releases

You do not need to bump versions manually. Release Please handles it:

1. Your PR title and the final squash-merge title on `main` use Conventional Commit format
2. Release Please creates a version bump PR automatically
3. When CI passes, the bump PR auto-merges
4. GitHub Releases are published with tags
5. Published releases trigger deployments

The `github-automation` skill has the full release details.

## Documentation evolution

Every PR updates all affected documentation in the same PR. There is no "update docs later." This applies to every surface: `AGENTS.md`, onboarding, architecture, infra, guidance, rules, skills, and adapters.

Significant structural decisions get an Architecture Decision Record in `docs/decisions/`. The criteria: URL or content architecture changes, multi-file reversals, hard breaks, or decisions someone might ask "why?" about in 6 months. See `docs/decisions/README.md` for the template.

See `AGENTS.md` § Documentation evolution discipline for the full rule and specific obligations by change type.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
