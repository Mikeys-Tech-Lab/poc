# Testing Strategy

How this workspace verifies structure without pretending to certify meaning.

## Core contract

CI owns structure.

Human/source review owns meaning.

Advisory AI review may assist, but it does not decide.

This distinction is part of the Practice of Clarity. A passing test suite can
show that the public node is structurally intact. It cannot show that an article
is true, clear, grounded, politically responsible, pedagogically effective, or
ready for publication.

## What CI should verify

CI should protect deterministic contracts that a machine can check without
claiming interpretation:

- buildability
- routing
- redirects
- internal links and visible anchors
- register availability
- route-specific fallback behavior
- activation prompt wiring
- selected accessibility and reflow contracts
- guidance drift invariants
- license surface notices
- selected boundary phrases when the protected boundary is explicit

These checks protect the inspectable public node. They do not certify the public
meaning of the writing.

## What CI must not claim

CI must not be treated as proof of:

- article truth
- rhetorical quality
- source interpretation
- pedagogical fit
- publication readiness
- political clarity
- whether a register actually teaches well
- whether a public essay is structurally sufficient

Those judgments require human/source review. They may be supported by advisory
AI, but advisory output is draft reasoning, not evidence.

## Content boundary tests

Exact prose assertions are allowed only when they protect a named public
boundary.

Good uses include legal notices, safety boundaries, activation contracts,
anti-surveillance language, non-authority boundaries, non-framework boundaries,
and other phrases where loss of the wording would change the public contract.

Avoid adding tests that pin ordinary article paragraphs. If a test cannot name
the boundary it protects, it is probably testing for tests' sake.

Source contract tests may verify source data structure, source ID declarations,
public `https://` href shape, and absence of private drafting metadata from
public content frontmatter. They must not claim that a source proves an article,
that source interpretation is correct, or that a page is publishable.

Live source URL reachability belongs to publication verification, not normal
Vitest checks. See `content-register-source-workflow.md` for the public content
intake boundary.

## Advisory AI boundary

The workspace may use advisory AI review for broader drift, missing reflection,
or content-risk visibility.

That review must remain:

- non-blocking
- grounded in inspectable repo traces
- explicitly non-authoritative
- scoped to changed material when possible

Do not add a blocking LLM CI gate for article quality without a separate
decision record that names the dataset, criteria, cost model, failure behavior,
and human review boundary.

## Adding tests

Before adding a test, name:

1. the user-facing or repo-facing contract it protects
2. the failure it should catch
3. why a deterministic check can verify that failure
4. whether the test will fail for useful reasons

If those cannot be named, prefer a review checklist, guidance note, or advisory
review prompt over a blocking test.

## Current posture

The current PoC test surface is meaningful because it mostly verifies contracts
around the public site rather than pretending to judge the articles themselves.

The main maintenance risk is expanding substring or paragraph-level checks
without naming the boundary they protect. That would create brittle tests while
spending review attention on low-signal failures.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
