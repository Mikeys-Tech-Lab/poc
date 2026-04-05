# Licensing Surface Policy

How the repo's license split is expressed across source surfaces.

## Why this exists

This workspace has a structural license split:

- Code and tooling are licensed under `MIT`.
- Authored content is licensed under `CC BY 4.0`.

That split already exists at the repo root in `LICENSE` and
`LICENSE-CC-BY-4.0`. This policy exists so agents and contributors do not rely
on memory when deciding how the split should appear in source files.

## Two different layers

Do not conflate these:

- **Rendered site notices** are reader-facing. They belong to the frontend
  experience and may appear automatically on public pages.
- **Source notices** are repo-facing. They make the licensing contract visible in
  the source itself and keep the split inspectable across guidance, docs, seeds,
  and other authored surfaces.

The rendered notice does not replace the source notice. The source notice does
not replace the rendered notice.

## Current rule

All tracked markdown-like source files in this repo must carry an explicit
license notice:

- `.md`
- `.mdx`
- `.mdc`

This includes public writing, seeds, continuity, mandate lenses, onboarding
docs, guidance docs, ADRs, skills, rules, adapters, changelogs, and repo
gateways such as `README.md`.

The current contract is intentionally simple. It does not ask contributors to
decide file-by-file whether a markdown surface is "authored enough" to deserve a
notice. If it is a tracked markdown-like source surface, it gets a notice.

## Notice form

Use a non-rendered source notice so public reading surfaces do not change:

- In `.md` and `.mdc`: HTML comments
- In `.mdx`: MDX block comments

Keep the wording aligned with the repo split:

- `Copyright © 2026 Mikey Sebastian Drozd.`
- `Licensed under CC BY 4.0. Repository code and tooling: MIT.`

If a file already carries a fuller explicit header with author, source, and
license metadata, that satisfies the rule. Do not duplicate it with a second
notice.

## Exclusions

This rule is for tracked markdown-like source files only.

It does not apply to:

- generated build artifacts
- gitignored local files
- code files governed by the root code/tooling license
- frontend-rendered license components

## Verification

Run `pnpm license:check` to verify the current contract.

This check is deterministic. It does not decide which texts are "important." It
only verifies that tracked markdown-like source files expose the license split
explicitly.

## Evolution rule

If the repo later decides this rule is too broad or too narrow, change the
policy here and update the checker in the same PR.

Do not silently relax the practice through one-off exceptions.

<!--
Copyright © 2026 Mikey Sebastian Drozd.
Licensed under CC BY 4.0. Repository code and tooling: MIT.
-->
