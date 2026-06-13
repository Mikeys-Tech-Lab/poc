# docs/ai

Locally generated capability reports live here. They are **not committed**.

## What generates them

| File | Generator | Command |
|---|---|---|
| `capability-report.md` | `tools/ai-guidance/src/infra/capability-check.ts` | `pnpm capability:check` |
| `cursor-state.md` | `tools/ai-guidance/src/infra/cursor-check.ts` | `pnpm cursor:check` |

## Why they are not committed

These reports capture the local machine's capability state (tool versions and
manual-checklist items). That state is operator- and machine-specific and goes
stale quickly, so committing it is drift rather than a durable artifact. The
reports are gitignored (`docs/ai/*.md`, except this README) and regenerated on
demand.

This README is the one committed file in `docs/ai/`. It keeps the directory
present so the generators have somewhere to write, and it documents the
contract.

Reports are for local operator alignment only. Do not aggregate, rank, or attach
them to individuals.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
