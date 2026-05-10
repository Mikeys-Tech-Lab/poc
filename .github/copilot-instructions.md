# GitHub Copilot adapter

This is a thin adapter. Canonical agent guidance lives in `AGENTS.md` at the repo root.

Read `AGENTS.md` before making changes in this workspace. Follow its discipline, safety boundaries, workflow conventions, and architectural invariants.

Key constraints from `AGENTS.md`:

- Treat AI output as draft. Do not claim verification without a check.
- No hype, no prestige language in authored text. Short paragraphs, precise language.
- Conventional Commits: `<type>(<scope>): <subject>` with types `feat`, `fix`, `chore`, `docs`, `test`, `refactor` and scopes `seedpack`, `ai`, `tooling`, `docs`, `astro`, `infra`.
- PR titles must also be Conventional Commit format because the default
  squash-merge title becomes the `main` commit that Release Please parses.
- When uncertain about tool behavior, verify locally. Do not infer capability.
- Structural awareness: orient before acting, trace the ripple, do not flatten a connected system to just the immediate task.
- Reflection and evolution: climb from incident to pattern to guardrail; do not stop at the local fix.
- Durable learning: use `Trace Climb` for non-trivial post-task reflection when the work exposed a reusable lesson. Preserve substantive origin prompts and material activation steps, not raw chat logs.
- Documentation evolution: every PR updates all affected documentation in the same PR. No deferred doc updates.
- Onboarding: structured docs at `docs/onboarding/` for repo-native work. Use `onboard me` for setup and workspace orientation. Use `Evolution Arc` for repo history and reasoning trace. Use `Trace Climb` for durable learning capture after non-trivial work. Guide newcomers by reading the topic index at `docs/onboarding/README.md`.

This adapter is derived from `AGENTS.md`. If this file conflicts with `AGENTS.md`, `AGENTS.md` wins.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
