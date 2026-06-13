# PoC Continuity
## Temporal Anchors For The Root Canon

**Author:** Mikey Sebastian Drozd  
**Pronouns:** he/him · they/them  
**Website:** https://practiceofclarity.eu  
**Source:** https://github.com/Mikeys-Tech-Lab/poc/blob/main/continuity/README.md  
**Copyright:** © 2026 Mikey Sebastian Drozd  
**License:** [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).

---

This package holds the temporal anchors for the Practice of Clarity root
surface.

It exists to preserve:

- system intent
- architecture decisions
- rollout direction
- critique that materially shaped continuity documents

This package is canonical at the repo root, but export-controlled.

That means:

- files here may become public-adjacent
- not every file here is automatically exported
- lifecycle status decides what is still forming and what is ready to travel

## Status model

Use these stages consistently:

- `draft` - forming, incomplete, not ready to rely on
- `review` - structurally coherent, still under active critique
- `ready` - stable enough to promote or export
- `published` - promoted into the public site surface

## What belongs here

- `system-orientation.md` - the primary architecture anchor
- `canonical-readability-requirement.md` - runtime access invariant for
  canonical artifacts
- `vision-anchor.md` - the long-arc orientation anchor
- `guidance-architecture.md` - the layered continuity view of the guidance
  system stack
- `*.audit.md` files that directly support continuity documents and need to
  stay attached to them during rollout
- later, durable continuity evidence if some audit artifacts become stable
  reference points

## What does not belong here

- seeds
- mandate lenses
- chat residue
- exploratory notes that do not preserve system intent beyond a single
  conversation

Those belong elsewhere:

- seeds -> `../seeds/`
- mandate lenses -> `../mandateLenses/`
- non-canonical reflection -> outside the canonical root surfaces

## Continuity rule

Continuity artifacts are not authority.

They are temporal anchors:

- they preserve what the system is trying to remain
- they record why key decisions were made
- they reduce silent drift as the PoC evolves

If a continuity document stops preserving reasoning and starts acting as
doctrine, it has drifted.
