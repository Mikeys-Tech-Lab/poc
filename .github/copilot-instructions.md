# GitHub Copilot adapter

This is a thin adapter. Canonical agent guidance lives in `AGENTS.md` at the repo root.

Read `AGENTS.md` before making changes in this workspace. Follow its discipline, safety boundaries, workflow conventions, and architectural invariants.

Key constraints from `AGENTS.md`:

- Treat AI output as draft. Do not claim verification without a check.
- No hype, no prestige language in authored text. Short paragraphs, precise language.
- Conventional Commits: `<type>(<scope>): <subject>` with types `feat`, `fix`, `chore`, `docs`, `test`, `refactor` and scopes `seedpack`, `ai`, `tooling`, `docs`, `astro`.
- When uncertain about tool behavior, verify locally. Do not infer capability.

This adapter is derived from `AGENTS.md`. If this file conflicts with `AGENTS.md`, `AGENTS.md` wins.
