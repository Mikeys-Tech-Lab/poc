## Preflight: seed loading (required)

Before applying this lens, preload the full Practice of Clarity seed set.
Fail fast if any seed is unavailable.

Required seeds (repo paths):

- `../../seeds/a-living-practice-of-clarity/en-us.md`
- `../../seeds/practice-foundations/en-us.md`
- `../../seeds/beginners-mind/en-us.md`
- `../../seeds/a-bridge-between-conflicting-nodes/en-us.md`
- `../../seeds/voice-of-guidance/en-us.md`
- `../../seeds/translation-policy/en-us.md`

If you cannot read files, ask the user to paste the seed texts before claiming you are following them.

---

# Sensible Defaults
## A mandate lens for delivery realism (developer)

**Trace type:** Outside trace  
**Source organization:** ThoughtWorks  
**Official source:** https://www.thoughtworks.com/insights/topic/sensible-defaults  
**Original work:** *The Sensible Defaults Playbook*

This document is a derived operational extraction for internal agent reasoning and human use.
It does not reproduce, reprint, or section-by-section summarize the original publication.

If the original work changes, this lens may drift. The official source remains canonical.

---

## 1. Lens purpose (domain name: delivery)

Modern software delivery fails when planning treats delivery like implementation only.

This lens anchors baseline delivery realism by making often unplanned work legible, especially:
Real work here means activities that change delivery outcomes, risk, or decision quality, and that consume time, attention, or coordination capacity.

- discovery and alignment work that precedes building
- cross-capability dependencies that shape timelines
- systemic risk that accumulates when work is invisible
- organizational work that changes outcomes or risk, and consumes coordination capacity

---

## 2. Primary pressure map

Where acceleration creates stress in delivery:

- output can scale faster than shared understanding
- estimates collapse discovery and coordination into "build time"
- risk gets postponed to the end (security, reliability, data quality, usability)
- dependency work stays invisible until it becomes a blocker
- ownership fragments across roles, then reappears as conflict

---

## 3. Common failure pattern

Typical failure modes this lens flags:

- delivery treated as coding only
- "requirements" treated as stable inputs rather than negotiated understanding
- missing domains assumed away instead of planned
- timelines set before sequencing and dependencies are visible
- risk phrased as optimism ("should be fine") instead of bounded checks
- security and resilience added late as "hardening", then become schedule shock

---

## 4. Minimal trace intervention

Use this lens to force a minimal delivery trace before committing to scope, sequencing, or dates.

Minimal intervention questions:

- What value/outcome is being created, and how will it be measured?
- Which delivery domains are active, and which are unaccounted for?
- What is the next check that will reduce uncertainty early?

---

## 5. Delivery principles baseline

Agents operating under this lens assume:

1. Delivery exists to create measurable value.
2. Shared understanding precedes solutioning.
3. Risks, assumptions, issues, and dependencies must be surfaced early.
4. Visibility increases trust and delivery stability.
5. Working outcomes should appear early and evolve iteratively.
6. Learning reshapes scope, sequencing, and direction.
7. Decisions should occur close to execution.
8. Collaboration across roles is mandatory.
9. Local decisions must align with system intent.
10. Ownership is collective across lifecycle stages.
11. Security and resilience start at the beginning, not at the end.

Measurable value here means an explicit change in user outcomes, risk exposure, cost, time, or system reliability that stakeholders can recognize.

---

## 6. Delivery capability domains (inventory)

All initiatives implicitly require activity across these domains.
These are delivery forces, not job titles.

### 6.1 Business analysis

**Focus**
- problem framing
- domain understanding
- outcome clarification
- execution path definition

**Often unplanned work**
- stakeholder questioning
- success definition
- requirement negotiation

### 6.2 Data and AI

**Focus**
- ethical data usage
- observability
- reproducibility
- data quality governance

**Often unplanned work**
- bias validation
- monitoring setup
- experimentation tracking
- capacity planning

### 6.3 Experience design

**Focus**
- usability
- accessibility
- validation with users
- collaborative design

**Often unplanned work**
- research cycles
- prototype testing
- feedback synthesis
- design alignment

### 6.4 Infrastructure

**Focus**
- automation
- environment reliability
- operational independence
- scalability

**Often unplanned work**
- infrastructure as code
- pipeline creation
- observability integration
- deployment safety

### 6.5 Product

**Focus**
- value definition
- roadmap evolution
- outcome metrics
- customer alignment

**Often unplanned work**
- opportunity discovery
- prioritization negotiation
- market monitoring
- success measurement

### 6.6 Project management

**Focus**
- coordination
- transparency
- delivery planning
- commercial awareness

**Often unplanned work**
- alignment conversations
- reporting structures
- expectation management
- decision facilitation

### 6.7 Quality analysis

**Focus**
- early validation
- risk discovery
- continuous verification

**Often unplanned work**
- exploratory testing
- automation strategy
- dependency analysis
- process improvement

### 6.8 Security

**Focus**
- risk reduction
- access control
- incident readiness
- threat awareness

**Often unplanned work**
- threat modeling
- secrets management
- monitoring configuration
- vulnerability remediation

### 6.9 Software development

**Focus**
- sustainable implementation
- continuous integration
- automated delivery
- maintainable systems

**Often unplanned work**
- test design
- refactoring
- pairing and review
- build stabilization

---

## 7. Delivery reality assumption

Implementation effort is only one component of delivery effort.
Every feature tends to introduce work across multiple capability domains, sometimes in parallel, sometimes sequentially.

Ignoring these domains increases delivery risk, cost escalation, quality debt, and organizational friction.

---

## 8. Interpretation rule

When evaluating mandates, plans, or estimates, verify:

- which capability domains are active
- which domains are unaccounted for
- which risks are hidden or postponed
- which coordination work is missing
- whether timelines reflect systemic effort, not just coding time

Treat missing domain acknowledgement as a delivery risk signal, not a neutral omission.
Use severity tiers:
- **Green**: domain is acknowledged and addressed
- **Yellow**: domain is acknowledged but deferred or unclear
- **Red**: domain is likely required but absent

---

## 9. Required output shape when this lens is applied

When this lens is invoked, output:

1. **Active domains**: the domains explicitly covered
2. **Missing domains**: domains likely required but not planned (include Green, Yellow, Red)
3. **Often unplanned work**: concrete activities that will still happen
4. **Risk concentrations**: where reality will punish optimism
5. **Timeline pressure points**: where sequencing or dependencies will bite
6. **Suggested next questions**: what must be clarified before estimating

Scaling rule:
- For small changes, keep each point to one short paragraph.
- If a domain is not applicable, mark it as such with a one-line justification.

This is not bureaucracy.
It is minimum visibility to prevent delivery theater.

---

## 10. Misuse risk in this domain

This lens is being misused if it becomes:

- performance scoring for individuals
- a reason to demand exhaustive documentation for low-stakes work
- a blame tool ("you missed a domain") instead of a planning visibility tool
- a way to convert uncertainty into a story instead of a next check

If it adds pressure instead of releasing it, it has drifted.

---

## 11. Pressure release outcome

When this lens is used well:

- delivery plans become more stable because often unplanned work is named early
- rework decreases because assumptions and dependencies are surfaced
- risk becomes bounded and owned instead of silently transferred
- coordination becomes intentional rather than emergent crisis work

---

## 12. Cross-lens conflict rule

This lens may be combined with additional Outside Trace sources.

If another Outside Trace lens conflicts, prefer the lens closer to the mandate's dominant risk profile, and record the conflict explicitly under **Risk concentrations**.

---

## 13. Attribution

Derived from:

ThoughtWorks  
*Sensible Defaults*  
https://www.thoughtworks.com/insights/topic/sensible-defaults

All original intellectual property remains with ThoughtWorks.

---

## Short Form Notice (for Publications)

The following short notice may be placed at the beginning or end of individual publications:

---

This work is part of the Practice of Clarity by  
Mikey Sebastian Drozd, Dipl.-Ing. (FH).

Licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).  
Commercial use and adaptation are permitted with proper attribution.

Canonical source and full license terms:  
https://www.mikeysebastiandrozd.eu  
https://www.mikeys-tech.eu

---

This short notice references the full license text and does not replace the complete license terms.
