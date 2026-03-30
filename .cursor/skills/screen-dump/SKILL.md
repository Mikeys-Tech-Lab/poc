---
name: screen-dump
description: Export full-page screenshots for every current page, register, atmospheric theme, and viewport. Use when the user says screen dump, screendump, snapshot images, export screenshots, or asks for a versioned screenshot zip.
---
# Screen Dump

## When to use

- The user says `screen dump`, `screendump`, `snapshot images`, or `export screenshots`
- The user wants a versioned zip of the current publication surface
- The user wants the desktop, tablet, and mobile screenshots regenerated

## Instructions

1. Run `pnpm screendump` from the repo root.
2. Report the output folder and the versioned zip path from `.dist/`.
3. Do not commit `.dist/` artifacts unless the user explicitly asks.

## Failure handling

- If the command fails because Playwright Chromium is missing, run `pnpm --filter site exec playwright install chromium` and retry.
- If the command fails because the local build is broken, stop and report the build failure instead of producing partial output.
