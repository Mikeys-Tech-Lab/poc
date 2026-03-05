---
name: node-tooling
description: Guides Node.js + TypeScript + pnpm tooling development for this workspace. Use when creating scripts, adding dependencies, writing tests, or working with the tools/ai-guidance package. Enforces functional style, TDD, and version verification.
---

# Node Tooling

## When to use

- Creating or editing TypeScript/JavaScript tooling scripts
- Adding or updating dependencies via pnpm
- Writing or running Vitest tests
- Working in `tools/ai-guidance/` or any future tooling package
- Setting up pnpm workspaces or monorepo config

## Capability alignment

Before relying on any pnpm, Node, or library feature:

1. Check `package.json` and `pnpm-lock.yaml` for installed versions.
2. Run `pnpm --version`, `node --version`, or `npx vitest --help` to verify.
3. If not checkable, produce a manual checklist and mark the result unknown.

## Functional structure

```
src/
  domain/    # Pure types + logic. No IO imports.
  infra/     # IO layer: fs, http, process, gh CLI.
```

- Domain modules take data and return data.
- IO lives in `src/infra/` as a thin shell.
- Keep domain logic independently testable.

## Testing

- Use Vitest for unit tests across all packages.
- Both `tools/ai-guidance` and `apps/site` have Vitest configs. `pnpm test` at root runs both.
- `apps/site` uses `happy-dom` for DOM-dependent tests (opt-in per file via `// @vitest-environment happy-dom`). Pure logic tests run in the default `node` environment.
- Store test fixtures alongside tests or in a `__fixtures__/` directory.
- Do not rely on network calls in tests. Use fixtures for deterministic results.
- Coverage should be meaningful for domain logic.
- E2E tests for the site use Playwright (Chromium only). See the `astro-starlight` skill for details.

## Dependency management

```bash
pnpm add <package>            # Add runtime dependency
pnpm add -D <package>         # Add dev dependency
pnpm add --filter <pkg> <dep> # Add to specific workspace package
```

Do not make up version numbers. Verify the package exists before adding.

## Common commands

```bash
pnpm test              # Run unit tests (all packages)
pnpm coverage          # Run tests with coverage (ai-guidance)
pnpm --filter site test:e2e  # Run E2E tests (requires prior build)
pnpm cursor:check      # Check Cursor capability signals
pnpm capability:check  # Aggregate capability checks
```

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/node-tooling/SKILL.md
