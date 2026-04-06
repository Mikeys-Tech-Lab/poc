## Summary

<!-- What does this PR add or change? Bullet list. -->

## Context — how this work evolved

<!-- This section is a reasoning trace. Someone reading this PR should understand
     how the work started, what decisions were made, what changed during implementation,
     and what was learned. This is not optional. -->

### Starting point

<!-- What prompted this work? What was the state before? -->

### Key decisions

<!-- What was decided and why? List the significant choices. -->

### Evolution during implementation

<!-- What changed from the original intent? What broke and was fixed?
     Be specific: name the mistake, its cause, and the correction. -->

### What was not verified

<!-- Be honest about gaps. This is not weakness — it is clarity. -->

## Trace

- **Assumptions**:
- **Limits**:
- **Not verified**:

## Learning trace

- **Trigger class**: `required` | `recommended` | `skip allowed`
- **Origin trace**:
- **Activation trace**:
- **Durable artifact**: `No durable learning` | `Evolution Record` | `ADR` | direct surface updates
- **Propagation**:

## Test plan

<!-- What was tested? What was not? -->

### Evidence

<!-- How can results be reproduced? If no CI, state that and list the local commands.
     Example: "No CI configured. Results from local execution. Reproduce with: pnpm test && pnpm run build" -->

## Checklist

- [ ] Commits follow Conventional Commits (`type(scope): subject`)
- [ ] Updated `docs/architecture/workspace.md` if repo structure changed
- [ ] Build passes locally (`pnpm run build`)
- [ ] Tests pass locally (`pnpm test`)
- [ ] No gating, scoring, or enforcement language introduced
- [ ] Context reflection included in PR description
- [ ] Learning trace included in PR description
- [ ] PR description updated after final push

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
