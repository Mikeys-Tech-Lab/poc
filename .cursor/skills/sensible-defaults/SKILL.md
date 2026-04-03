---
name: sensible-defaults
description: Loads the Sensible Defaults mandate lens through its context seeder for delivery-reality analysis. Use when the user explicitly asks for Sensible Defaults, references mandateLenses/SensibleDefaults/context-seeder.md, or wants hidden delivery work surfaced in development or overall workspace changes.
---

# Sensible Defaults

Adaptation of `AGENTS.md` for on-demand loading of the first mandate lens.

## Bootstrap boundary

This skill is not the default workspace bootstrap.

Default repo-native bootstrap comes from:

- `AGENTS.md`
- `seeds/`
- `continuity/`

Load this skill only when the user or task explicitly calls for the
`Sensible Defaults` posture.

## When to use

- The user asks for `Sensible Defaults`
- The user references `mandateLenses/SensibleDefaults/context-seeder.md`
- A development or workspace change needs delivery-reality framing
- The task is about hidden work, missing delivery domains, planning compression,
  or timeline optimism

## Loading steps

1. Read `mandateLenses/SensibleDefaults/context-seeder.md`.
2. Read `mandateLenses/SensibleDefaults/lens.md`.
3. Confirm the root seed set in `seeds/` is readable before claiming the lens is
   active.
4. If the seeder, lens, or required seeds could not be read, do not claim
   operation under this lens.

## Output shape

When the user explicitly asks to apply Sensible Defaults, produce:

1. active domains
2. missing domains with `routine`, `elevated`, or `critical`
3. often unplanned work
4. risk concentrations
5. timeline pressure points
6. suggested next questions

Keep the output concise unless the user asks for depth.

## Misuse guard

Do not turn this lens into:

- compliance scoring
- surveillance
- performance evaluation
- pressure to sound certain

If it adds pressure instead of releasing it, it has drifted.

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).  
Source: https://github.com/Mikeys-Tech-Lab/poc/blob/main/.cursor/skills/sensible-defaults/SKILL.md
