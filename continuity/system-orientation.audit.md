# System Orientation Audit
## Critique That Shaped The Architecture Anchor

**Author:** Mikey Sebastian Drozd  
**Pronouns:** he/him · they/them  
**Website:** https://practiceofclarity.eu  
**Source:** https://github.com/Mikeys-Tech-Lab/poc/blob/main/continuity/system-orientation.audit.md  
**Copyright:** © 2026 Mikey Sebastian Drozd  
**License:** [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).

---

## Purpose

This document captures the critique that materially shaped
`system-orientation.md`.

It exists to preserve the reasoning around the architecture, not only the
resulting wording.

---

## Core judgment

The architecture becomes materially clearer once the system is named as four
distinct but interdependent layers:

- seeds
- practice of clarity
- mandate lenses
- continuity

This avoids collapsing everything into "seeds" and prevents continuity
documents from being mislabeled as structural anchors.

---

## Key findings

### 1. Continuity is not a seed

Documents such as `system-orientation.md` and this audit are important, but
they are not seeds themselves.

They are temporal anchors:

- they preserve system intent
- they capture architecture decisions
- they support continuity during rollout

They belong in `continuity/`, not in `seeds/`.

### 2. Mandate lenses are their own package family

The earlier architecture still left mandate lenses partially outside the root
surface.

That was structurally incomplete.

`mandateLenses/` is required so the root surface can coherently expose:

- structural anchors
- temporal anchors
- applied packages

### 3. Package by lens, not by artifact type

Separating portable seeders from lenses as independent package families would
weaken lineage and create unnecessary fragmentation.

The stronger model is:

- one folder per lens
- `lens.md` as the canonical application artifact
- `context-seeder.md` as a derivative, portable delivery form
- `README.md` as the local entry point

### 4. Migration must respect lineage

`Sensible Defaults` already exists in archive lineage.

Pretending the new package is greenfield would sever trace.

The correct move is:

- use the archive version as baseline
- evolve the new root package from that baseline
- later remove superseded copies once the new package is stable

### 5. Status is better than premature sub-bucketing

Continuity should begin as one tree with explicit lifecycle headers rather than
too many folders invented in advance.

This keeps the package flexible while the architecture is still becoming real.

---

## Constraints added by this audit

- Prefer `README.md` consistently for package entry points.
- Keep `context-seeder.md` explicitly derivative.
- Treat `mandateLenses/SensibleDefaults/` as the target canonical package
  during migration.
- Keep transient reflection out of `continuity/`.

---

## Open risks

- The root package surface can still become too large before the public surface
  is ready.
- Portable context seeders can drift into hidden authority if they stop
  pointing back to canonical sources.
- Continuity documents can become doctrine if they stop preserving visible
  reasoning and start acting as settled authority.

---

## Immediate consequence

The architecture is settled enough to stop planning abstractly and start
building real packages:

- continuity docs first
- one real mandate lens package
- canonicalization and cleanup after the new package works
