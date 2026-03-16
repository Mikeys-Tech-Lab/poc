# Agent Pre-Commit Verification — Reflection

**Source:** Post-PR reflection from publication refinements (PR #74)  
**Date:** 2026-03-16

## Context

During the publication refinements work, we added:

- Accessibility icon to the "What This Work Is" heading (both registers)
- StillEvolvingNote component for the About the Author "still evolving" passage
- Atmospheric aside styling (frosted glass, pastel accents)

Commits were pushed without running `pnpm lint`. CI failed on Biome formatting in `astro.config.mjs`, `screendump.test.ts`, and `atmosphere.css`. A follow-up commit applied `pnpm lint:fix` to resolve.

## Assumptions made (and why they were wrong)

1. **Build pass implies CI pass.**  
   We ran `pnpm build` and it succeeded. CI also runs `pnpm lint` before build. Lint was never run locally. The git-commit skill listed "Build passes" and "Tests pass" but did not explicitly require "Lint passes."

2. **Edited files match Biome format.**  
   New or modified `.mjs`, `.ts`, and `.css` files were assumed to conform to Biome's formatter. Biome has specific rules for line length, `:is()` selector wrapping, and array formatting. Without running `pnpm lint`, drift went unnoticed.

3. **MDX heading + component would work.**  
   For the accessibility icon, we tried `### <InlineAccessibilityLabel />` expecting the component to render inside the heading with a stable `id="accessibility"` anchor. MDX/Starlight flattened or lost the anchor. We iterated through explicit `<h3>`, then settled on inline HTML with `### <span>...</span>` containing the SVG. The pattern is documented in the astro-starlight skill.

## Mistakes

1. **Committed without running lint.**  
   The pre-commit checklist did not include lint. We followed build and (where applicable) test, but not lint. CI caught it; the operator had to wait for a fix.

2. **No local CI alignment.**  
   We did not run the same sequence CI runs: lint → unit tests → build → type check → E2E. Running that sequence locally before push would have caught the lint failure.

3. **Inline HTML duplication.**  
   The accessibility icon markup is duplicated in both practitioner and orientation `what-this-is.mdx` files. A shared component was abandoned when it didn't render correctly in the heading context. The duplication is acceptable for a one-off but could be revisited if the pattern recurs.

## Evolution (what we changed)

1. **git-commit skill:** Added "Lint passes" to the pre-commit checklist. Run `pnpm lint` before commit. If format issues exist, run `pnpm lint:fix` then `pnpm lint` to verify.

2. **astro-starlight skill:** Added "MDX headings with icons" to Known pitfalls. When an icon is needed in an MDX heading, use inline HTML (`### <span>...</span>` with SVG). Component-in-heading can lose the anchor or flatten. Duplicate across registers if needed.

3. **This document:** Captures the reflection so future agents (or operators on other machines) see the reasoning and avoid repeating the same assumptions.

## For future agents

Before every commit:

1. Run `pnpm lint`. If it fails, run `pnpm lint:fix` then `pnpm lint` again.
2. Run `pnpm build` if you changed assets, config, content, or frontmatter.
3. Run `pnpm test` if you changed tooling code.

CI runs lint first. Align local verification with CI so you fail fast and avoid pushing broken checks.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0).
