# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the Practice of Clarity workspace.

An ADR captures the **rationale** behind a structural decision: what was decided, what was considered, and why alternatives were rejected. It is a trace artifact, not a specification.

## When to write an ADR

Write an ADR when:

- The decision changes URL structure, content architecture, or public API shape
- Reversing the decision would require multi-file coordination
- The decision involves a hard break (no backward compatibility)
- Someone might reasonably ask "why?" in 6 months

Routine choices, obvious defaults, and purely local module decisions do not need ADRs.

## When NOT to write an ADR

ADRs are for structural decisions, not retroactive justification. They are being misused if they become:

- Required paperwork after every minor refactor
- A gate for approvals or code review
- A compliance artifact attached to individuals
- A retroactive narrative written after the fact to justify a decision that was never actually deliberated

If ADRs add process friction instead of preserving reasoning, the practice has drifted.

## Relationship to PRs and other documentation

- **PR descriptions** hold the implementation evolution trace (what happened during the work, including mistakes and corrections).
- **ADRs** hold the decision rationale (what was decided, what was rejected, and why).
- The ADR links to the PR. The PR may link back to the ADR. Neither duplicates the other.
- The Sensible Defaults lens (`docs/practices/sensible-defaults.md`) surfaces delivery risk. When it identifies a significant structural decision, that decision may warrant an ADR.

## Numbering policy

- Numbering starts at `0001` and is zero-padded to four digits.
- Numbers are never reused, even if an ADR is superseded or deprecated.
- Accepted ADRs are immutable. When a decision changes, a new ADR supersedes the old one with an explicit link.

## Template

Each ADR is a single Markdown file named `NNNN-short-title.md`. Use this template:

```markdown
# NNNN — Title

**Status:** proposed | accepted | superseded | deprecated
**Date:** YYYY-MM-DD
**Supersedes:** (link, if applicable)
**PR:** (link to implementing PR)

## Context

What pressure, ambiguity, or structural need triggered this decision.

## Decision

What was decided, stated clearly.

## Alternatives considered

Each alternative with why it was rejected. (Named assumptions per Practice discipline.)

## Consequences

What changes, what breaks, what becomes possible, what becomes harder.

## References

Links to seeds, PRs, related ADRs, or external sources. Not a duplication of PR content — a pointer.
```

### Format notes

- **Alternatives always include rejection reasoning.** The Practice requires named assumptions and visible trade-offs.
- **The PR link replaces implementation detail.** Do not duplicate the PR body in the ADR.
- **No scoring or compliance framing.** Consistent with the misuse boundaries in Sensible Defaults and Practice Foundations.

## Decisions

| Number | Title | Status | Date |
|--------|-------|--------|------|
| [0001](0001-root-locale-and-register-restructure.md) | Root locale and register restructure | Accepted | 2026-03-06 |

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
