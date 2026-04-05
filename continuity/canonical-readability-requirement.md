# Canonical Readability Requirement
## Runtime Access Invariant For Canonical Artifacts

**Author:** Mikey Sebastian Drozd  
**Pronouns:** he/him · they/them  
**Website:** https://practiceofclarity.eu  
**Source:** https://github.com/Mikeys-Tech-Lab/poc/blob/main/continuity/canonical-readability-requirement.md  
**Copyright:** © 2026 Mikey Sebastian Drozd  
**License:** [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).

---

## Core invariant

Canonical artifacts must be directly readable on their primary surface.

The system does not operate on inferred knowledge of its artifacts.

It requires direct access to them.

---

## Purpose

This document defines the runtime readability constraint for the Practice of
Clarity system.

It exists to prevent a structural mismatch between:

- a system that requires visible, traceable reasoning
- an infrastructure layer that prevents direct access to canonical artifacts

This is not a claim that one specific public route is broken today.

It is a stronger rule:

- canonical artifacts must remain directly readable at runtime on their primary
  surface

Current article accessibility may be evidence of present behavior.
It is not the definition of the requirement.

---

## What this applies to

This requirement applies to canonical artifacts, including:

- seeds
- mandate lenses such as `lens.md`
- context seeders such as `context-seeder.md`
- continuity anchors when they are part of runtime grounding

If the repository is the canonical source, the requirement applies there.

If some future surface becomes canonical for those artifacts, the requirement
follows that surface.

---

## Surface distinction

The system may use more than one public surface.

### Human-facing publication surface

Purpose:

- reading
- orientation
- articles
- human entry

This surface may encode register and entry expectations.
It does not establish operational grounding by itself.

### Canonical runtime surface

Purpose:

- direct machine-readable access to canonical artifacts
- seeds
- mandate lenses
- context seeders
- continuity anchors when they are part of runtime grounding

These surfaces may overlap.
They do not have to.

If the repository is canonical, repository readability is non-negotiable.

Frontend readability is helpful, but secondary unless the frontend itself is
chosen as the canonical runtime surface.

---

## Readability definition

A canonical artifact is readable when:

- it can be retrieved via a direct HTTP GET request
- it returns HTTP 200 with the artifact content
- it does not require authentication
- it does not require JavaScript execution
- it does not require interactive challenges
- it does not require browser-specific rendering

Readable means directly retrievable in machine-usable form, not merely visible
in a browser.

## Verification

```bash
curl https://<canonical-path>
```

Failure to meet these conditions means the artifact is not readable for this
system.

This lets the system check reality instead of arguing about interpretation.

---

## Canonical surface clarification

Human-facing rendered repository views such as GitHub `blob/` or `tree/` pages
are not canonical runtime surfaces.

Canonical runtime access requires direct raw file URLs or an equivalent direct
artifact URL suitable for agents.

Otherwise people will paste repository UI links and think the system can load
them correctly when it cannot.

---

## Runtime access vs training

Opening a canonical surface for runtime reading is not the same thing as making
it available for model training.

Training:

- compresses reasoning into latent representations
- removes direct traceability to source artifacts
- introduces delay and distortion between source and behavior

The system depends on runtime access instead.

That keeps:

- reasoning inspectable
- outputs traceable to source
- drift detectable and correctable

---

## Observed failure mode

If canonical artifacts cannot be read directly:

- agents infer the system from partial input
- they reconstruct reasoning from patterns instead of source
- they produce outputs that appear aligned without actually being grounded

This is not partial success.

It is structural failure masked by fluent output.

---

## Cloudflare clarification

Cloudflare is relevant only when it interferes with direct readability of
canonical artifacts.

It is not the subject of this document.
It is one possible point of failure among others.

If a JavaScript challenge, managed challenge, CAPTCHA, or similar interstitial
prevents direct retrieval of a canonical artifact, readability has failed for
this system.

---

## Relationship to context seeders

Context seeders depend on this constraint.

They are expected to:

- load canonical artifacts
- confirm what was loaded
- refuse operation if source artifacts are unavailable

If direct readability fails, the seeder cannot honestly claim alignment.

This is the runtime enforcement mechanism of the same rule.
This requirement is enforced operationally by the seeder contract, not by trust
alone.

---

## Current repo reality

The repository is part of the canonical runtime surface.

That means:

- local checked-out paths must remain directly readable
- public canonical repo routes should remain directly retrievable in raw form
- the article surface may introduce the system, but it does not replace the
  canonical repo surface

The article surface may introduce people to the system.
The canonical repo surface must remain the place the system actually reads.

---

## Final constraint

If the system cannot:

1. fetch canonical artifacts
2. confirm what was loaded
3. trace reasoning back to those artifacts

then it is not operating within this system.

It is simulating it.

If the system cannot read itself, it cannot operate.
