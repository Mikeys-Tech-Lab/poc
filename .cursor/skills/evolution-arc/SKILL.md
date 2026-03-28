---
name: evolution-arc
description: Guides users through the history, reasoning trace, and structural evolution of this workspace. Use when the user says "Evolution Arc", asks how the repo got here, wants workspace history, decision rationale, ADR context, release history, or implementation trace.
---

# Evolution Arc

Adaptation of `AGENTS.md` for guided repo history and reasoning trace.

## When to use

- User says `Evolution Arc`, `show me the evolution arc`, `how did this repo get here`, or similar
- User asks how the workspace evolved over time
- User wants to understand why the repo is shaped this way
- User wants a guided trace across ADRs, guidance docs, changelog entries, or commits

## Voice

Ask which register the user wants before assuming tone:

- **Practitioner**: technical and architectural language is fine
- **Orientation**: plainer language, slower pacing, same structure

The register changes voice, not the facts or the trace.

## Opening behavior

Start with a short note, then use `AskQuestion` with these two questions:

1. **Register**
   - `Practitioner`
   - `Orientation`
2. **Arc path**
   - `Quick arc`
   - `Architecture evolution`
   - `Guidance and agent evolution`
   - `Release and delivery evolution`
   - `Specific question`

If the user picks `Specific question`, ask for the question immediately after the initial selection.

## Source order

Use repo-local trace surfaces first, in this order:

1. `docs/guidance/evolution-arc.md` for the curated map and Mermaid diagrams
2. `AGENTS.md` for canon and evolution discipline
3. `docs/architecture/workspace.md` for current structure
4. `docs/decisions/README.md` and ADRs in `docs/decisions/`
5. `docs/guidance/structural-reflection-and-evolution.md`
6. `docs/guidance/agent-pre-commit-verification.md`
7. `CHANGELOG.md`
8. commit history when chronology needs more detail

## Secondary sources

PR descriptions, review threads, and discussions are secondary expansion surfaces.

Use them only when:

- the user asks for them explicitly, or
- the repo-local trace is insufficient for the question

If you use them, label them as secondary trace surfaces rather than implying they are part of the core contract.

## Storytelling shape

For each segment of the arc, explain:

- what changed
- why it changed
- what tension, constraint, or contradiction shaped it
- what remained unresolved or changed later
- which sources grounded the explanation

Do not turn the response into a commit dump. Turn chronology into reasoning.

## Visual storytelling

Use Mermaid when it improves understanding:

- source maps
- chronology
- relationship between ADRs, guidance, implementation, and releases

Keep diagrams text-based, inspectable, and versionable.

Do not invent exact dates, causal claims, or implementation details that the sources do not show.

## Boundaries

- Separate observation from inference.
- If a source is current-state only, say so.
- If the trace has a gap, name it.
- If an answer comes from outside repo-local trace surfaces, label it clearly.
- `Evolution Arc` is a guided history path. It is not a substitute for local setup or contribution onboarding.

## Relationship to onboarding

- Use `onboard me` when the user needs setup, structure, or contributor orientation.
- Use `Evolution Arc` when the user needs history, rationale, or an inspectable reasoning path through the repo.
- If a user starts with onboarding and then asks how the workspace became what it is, move to this skill.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/evolution-arc/SKILL.md
