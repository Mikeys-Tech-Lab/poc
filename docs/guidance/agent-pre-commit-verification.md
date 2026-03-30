# Agent Pre-Commit Verification — Reflection

**Source:** Post-PR reflection from publication refinements (PR #74)  
**Date:** 2026-03-16

## Context

During the publication refinements work, we added:

- Accessibility icon to the "What This Work Is" heading (both registers)
- StillEvolvingNote component for the About the Author "still evolving" passage
- Atmospheric aside styling (frosted glass, pastel accents)

Commits were pushed without running `pnpm lint`. CI failed on Biome formatting in `astro.config.mjs`, `screendump.test.ts`, and `atmosphere.css`. A follow-up commit applied `pnpm lint:fix` to resolve.

Later in the same area, an accessibility refinement for "Underline links" overreached. A global default-off CSS rule (`:root:not([data-a11y-links="underline"]) a`) was added in `a11y.css`. That did not merely keep the preference inactive; it erased the site's normal link styling across the page. The dev server was healthy. The regression was self-inflicted by an over-broad selector and a bad assumption about what "default off" should mean.

## Assumptions made (and why they were wrong)

1. **Build pass implies CI pass.**  
   We ran `pnpm build` and it succeeded. CI also runs `pnpm lint` before build. Lint was never run locally. The git-commit skill listed "Build passes" and "Tests pass" but did not explicitly require "Lint passes."

2. **Edited files match Biome format.**  
   New or modified `.mjs`, `.ts`, and `.css` files were assumed to conform to Biome's formatter. Biome has specific rules for line length, `:is()` selector wrapping, and array formatting. Without running `pnpm lint`, drift went unnoticed.

3. **MDX heading + component would work.**  
   For the accessibility icon, we tried `### <InlineAccessibilityLabel />` expecting the component to render inside the heading with a stable `id="accessibility"` anchor. MDX/Starlight flattened or lost the anchor. We iterated through explicit `<h3>`, then settled on inline HTML with `### <span>...</span>` containing the SVG. The pattern is documented in the astro-starlight skill.

4. **Overgeneralized from a local fix into a false universal.**  
   We turned one correction into a broad rule: "accessibility preferences are additive overrides, not baseline resets." That was too abstract and it overrode the explicit product contract for this workspace. The real requirement for underline-links was simpler: default links are not underlined, and the accessibility preference underlines all of them.

## Mistakes

1. **Committed without running lint.**  
   The pre-commit checklist did not include lint. We followed build and (where applicable) test, but not lint. CI caught it; the operator had to wait for a fix.

2. **No local CI alignment.**  
   We did not run the same sequence CI runs: lint → unit tests → build → type check → E2E. Running that sequence locally before push would have caught the lint failure.

3. **Inline HTML duplication.**  
   The accessibility icon markup is duplicated in both practitioner and orientation `what-this-is.mdx` files. A shared component was abandoned when it didn't render correctly in the heading context. The duplication is acceptable for a one-off but could be revisited if the pattern recurs.

4. **Used a global selector without checking the baseline state.**  
   The rule was written against all anchors on the page without first verifying which areas were intentionally underlined, intentionally plain, or component-specific. That changed behavior far beyond the accessibility panel.

5. **Test encoded the wrong requirement.**  
   A follow-up E2E test asserted that links should be non-underlined by default. That protected the bad assumption instead of the real contract. The correct assertion is narrower: a known non-underlined link stays non-underlined by default, and the accessibility preference underlines it when enabled.

## Evolution (what we changed)

1. **git-commit skill:** Added "Lint passes" to the pre-commit checklist. Run `pnpm lint` before commit. If format issues exist, run `pnpm lint:fix` then `pnpm lint` to verify.

2. **astro-starlight skill:** Added "MDX headings with icons" to Known pitfalls. When an icon is needed in an MDX heading, use inline HTML (`### <span>...</span>` with SVG). Component-in-heading can lose the anchor or flatten. Duplicate across registers if needed.

3. **Accessibility toggle rule:** Restored the explicit site contract. Default links are not underlined across the page; the accessibility preference underlines all links.

4. **Test posture:** Updated the E2E test to verify the real behavior boundary: links are not underlined by default across the page, force underline when on, and return to non-underlined when turned back off.

5. **astro-starlight skill:** Reframed the guardrail for accessibility preference work. Do not infer the contract from a generic principle; verify the workspace's intended default and preference-on states, then test both directions.

6. **This document:** Captures the reflection so future agents (or operators on other machines) see the reasoning and avoid repeating the same assumptions.

## Structural lesson

This incident is not only about lint order or a CSS selector. It exposed a deeper failure mode: a local fix was treated as sufficient before the underlying pattern had been named.

The structural pattern is:

- a local correction was overgeneralized into a false universal rule
- a follow-up test protected the bad assumption
- the guidance initially stayed too close to the incident

The structural rule is:

- verify the explicit product contract before turning a correction into guidance
- reflections must climb from incident to pattern to guardrail
- tests must verify the intended contract, not the shortcut that caused the regression

The broader discipline now lives in `docs/guidance/structural-reflection-and-evolution.md` and `AGENTS.md`.

## For future agents

Before every commit:

1. Run `pnpm lint`. If it fails, run `pnpm lint:fix` then `pnpm lint` again.
2. Run `pnpm build` if you changed assets, config, content, or frontmatter.
3. Run `pnpm test` if you changed tooling code.
4. If you changed accessibility preferences or theme CSS, verify both states manually:
   preference off matches the intended default, preference on matches the intended override, and toggling back off restores the intended default.
5. If you changed custom theme surfaces or controls, verify both atmospheric themes explicitly:
   dark and light must each be tuned on purpose. Do not treat "light inherited from dark tokens" as a completed design pass.
6. If the same preference or action appears in multiple UI surfaces, verify the model and label semantics stay aligned:
   do not expose four options in one place and five in another, and do not label a clipboard-first action as sharing.

CI runs lint first. Align local verification with CI so you fail fast and avoid pushing broken checks.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0).
