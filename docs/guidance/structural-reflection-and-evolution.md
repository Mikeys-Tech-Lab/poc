# Structural Reflection and Evolution

**Source:** Practice of Clarity workspace guidance  
**Date:** 2026-03-16

## Principle

Reflection in this workspace must be structural.

A reflection is incomplete if it stops at the local bug, the local file, or the local fix. It must climb:

1. from the incident
2. to the underlying pattern
3. to the rule or guardrail that should prevent recurrence
4. to the workspace surfaces that must evolve

This is how the workspace becomes evolutionary architecture rather than a pile of patches.

## Required shape

When writing a reflection, retrospective, or evolution note, include:

1. **Incident**: what happened in concrete terms
2. **Pattern**: what class of failure it belongs to
3. **Guardrail**: what principle, invariant, or decision rule should exist
4. **Surface updates**: which canonical docs, skills, rules, tests, or checks must change
5. **Verification**: how the new rule will be checked in future work

## What this prevents

- Local fixes that do not change future behavior
- Tests that protect the wrong requirement
- Guidance that records anecdotes without extracting principles
- Repeated mistakes with different file paths

## Example

**Too local:** "The selector was wrong, so it was replaced."

**Structural:** "An optional accessibility preference was implemented as a global baseline reset. The rule is that optional preferences are additive overrides that preserve the baseline when off. The evolution is to encode that rule in canonical guidance, affected skills, and tests that verify baseline -> override -> restored baseline."

## Surface order

When a structural lesson is discovered, update in this order:

1. `AGENTS.md` if the lesson affects agent behavior or workspace-wide discipline
2. affected rules or skills that operationalize the behavior
3. guidance docs that explain the lesson and its trace
4. tests or verification steps that enforce the intended contract

If the lesson does not change any future behavior, it is observation, not evolution.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
