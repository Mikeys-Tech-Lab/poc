# Sensible Defaults: Delivery Realism Lens

**Author:** Mikey Sebastian Drozd  
**Website:** https://mikeys-tech.eu  
**License:** CC BY 4.0. See `LICENSE-CC-BY-4.0` in the repository root.

## Preflight

This lens only works after you have read every file in `seeds/`. List the directory, then read each file. If any seed is missing, stop and load it before applying the lens. Do not summarize from memory.

If you cannot read files, ask the user to paste the seed texts before claiming you are following them.

If you are using an LLM to apply this lens, treat the output as a draft trace. Verify claims against the plan, repo, or artifacts. Do not invent details.

## Source

**Trace type:** Outside trace  
**Lineage:** Public delivery realism practice across industry  

This is an independent operational lens. It is not a reproduction of any single publication.

## Core discipline (from seeds)

1. **Trace over assertion.** Every claim exposes its reasoning path: what was decided, assumed, uncertain, and how it will be checked. If a summary loses the trace, it has lost the clarity.
2. **Named assumptions.** Hidden premises create drift. State them, do not hide them.
3. **Beginner's mind.** Treat conclusions as provisional until the path is visible. "I don't know yet" is a commitment to do the next honest step: verify, bound the risk, name what is missing, decide with declared uncertainty.
4. **Contradiction as data.** Tension is documented and integrated, not erased or flattened.
5. **Structural honesty.** Separate observation from inference. Cite what you are responding to. Name your limits, including what you did not check.

## Delivery realism principle

Implementation effort is only one component of delivery effort. Every feature tends to introduce work across multiple work domains. Ignoring these domains increases delivery risk, cost escalation, quality debt, and organizational friction.

Delivery exists to create a visible change: an explicit shift in user outcomes, risk exposure, cost, time, or system reliability that the people involved can recognize.

## Delivery principles baseline

1. Shared understanding precedes solutioning.
2. Risks, assumptions, issues, and dependencies need to be surfaced early.
3. Visibility increases trust and delivery stability.
4. Working outcomes should appear early and evolve iteratively.
5. Learning reshapes scope, sequencing, and direction.
6. Decisions should occur close to execution.
7. Collaboration across roles is necessary for delivery stability.
8. Local decisions need to align with system intent.
9. Security and resilience start at the beginning, not at the end.

## Nine work domains

All initiatives implicitly require activity across these domains. These are delivery forces, not job titles. Each has "often unplanned work" that needs to be made visible:

1. **Business analysis**: problem framing, outcome clarification, questioning, requirement negotiation
2. **Data and AI**: ethical data usage, operational visibility, bias validation, monitoring, capacity planning
3. **Experience design**: usability, accessibility, research cycles, prototype testing, shared language
4. **Infrastructure**: automation, environment reliability, IaC, pipeline creation, deployment safety
5. **Product**: outcome definition, direction updates, opportunity discovery, success checks
6. **Coordination**: planning, transparency, shared-understanding conversations, setting expectations
7. **Quality analysis**: early validation, risk discovery, exploratory testing, automation strategy
8. **Security**: risk reduction, access control, threat modeling, secrets management, vulnerability remediation
9. **Software development**: sustainable implementation, CI/CD, test design, refactoring, build stabilization

## Minimal trace intervention

Before committing to scope, sequencing, or dates, force these questions:

- What outcome is being created, and how will it be checked?
- Which delivery domains are active, and which are unaccounted for?
- What is the next check that will reduce uncertainty early?

## Interpretation rule

When evaluating mandates, plans, or estimates:

- Identify which work domains are active
- Flag which domains are unaccounted for
- Surface hidden or postponed risks
- Identify missing coordination work
- Verify timelines reflect systemic effort, not just coding time

Treat missing domain acknowledgement as a delivery risk signal, not a neutral omission.

## Delivery exposure levels

These labels describe delivery exposure, not team performance.

- **Routine**: domain acknowledged and addressed
- **Elevated**: domain acknowledged but deferred or unclear
- **Critical**: domain likely required but absent

## Default output shape (when lens is explicitly invoked)

When asked to apply Sensible Defaults to a plan, estimate, or mandate, output:

1. **Active domains**: domains explicitly covered
2. **Missing domains**: domains likely required but not planned (Routine / Elevated / Critical)
3. **Often unplanned work**: concrete activities that will still happen
4. **Risk concentrations**: where reality will punish optimism
5. **Timeline pressure points**: where sequencing or dependencies will bite
6. **Suggested next questions**: what needs to be clarified before estimating

Sizing: for small changes, keep each point to one short paragraph. If a domain is not applicable, mark it with a one-line justification.

If enforced across all work, the lens has drifted.

## Tone and style (from seeds)

- No hype. No prestige language. No ideological labeling.
- Short paragraphs. Precise language. Structural clarity over persuasive flourish.
- Use em dashes only when they improve structural clarity. Do not use them as default emphasis or rhetorical stacking. Prefer shorter sentences and visible structure over flourish.
- Restraint is not silence. Say less, more carefully, so what you say can be used.

## Misuse guard

This lens is being misused if it becomes:

- compliance scoring, surveillance, or performance evaluation
- exhaustive documentation for low-stakes work
- a blame tool instead of a planning visibility tool
- a way to convert uncertainty into narrative instead of a next check

If it adds pressure instead of releasing it, it has drifted.

## Cross-lens conflict

If another Outside Trace lens conflicts, prefer the lens closer to the mandate's dominant risk profile and record the conflict explicitly under Risk concentrations.

## Short Form Notice (for Publications)

The following short notice may be placed at the beginning or end of individual publications:

---

This work is part of the Practice of Clarity by  
Mikey Sebastian Drozd, Dipl.-Ing. (FH).

Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).  
Commercial use and adaptation are permitted with proper attribution.

Canonical source and full license terms:  
LICENSE-CC-BY-4.0

Official reference:  
https://creativecommons.org/licenses/by/4.0/

---

This short notice references the full license text and does not replace the complete license terms.
