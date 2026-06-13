# 0010 — Default reading register is the gentlest available

**Status:** accepted
**Date:** 2026-06-13
**Supersedes:** [0008 — Public reading register substrate](0008-public-reading-register-substrate.md) decision 2. Revises the default-register half of [0009 — Structural signals and route-scoped everyday activation](0009-structural-essays-and-route-scoped-everyday-activation.md) decision 5.
**PR:** pending

## Context

ADR 0008 kept `practitioner` as the effective default reading register for the
public site. That was the correct conservative choice while the register
substrate was new and `everyday` did not exist.

The content reality has since moved. `everyday` and `orientation` content now
exist across the entry surface (home, `about/*`, `signals/*`) and `orientation`
is wired on every other page through `RegisterContent`. The practice goal is to
lower the cost of entry, not to lead every first read with the densest voice.
Defaulting to `practitioner` makes a fresh visitor land in the most detailed
register before they have chosen to go deep.

One supporting property already holds and needs no new code: the `everyday` →
`orientation` visible fallback exists for an explicit `?register=everyday` on a
page without everyday content (ADR 0009 decision 7).

Register persistence needed one change. Before this ADR, the pre-paint script in
`ThemeProvider.astro` wrote `localStorage` only when a register was actually
requested — an explicit selection or a previously stored value. A silent
per-page default was never persisted. With `everyday` as the home default, that
left a seam: a reader who landed on the everyday home and followed a link to a
page without everyday saw `orientation` with no notice and no `?register=`
param, because nothing had been requested to fall back from. The register
appeared to change between pages with no explanation.

## Decision

1. The default reading register for a page is the gentlest register that page
   can actually render: `everyday` where it exists, otherwise `orientation`.
2. Concretely:
   - Routes with all three registers (`home`, `about/*`, `signals/*`) default to
     `everyday` (`THREE_REGISTER_AVAILABILITY.defaultRegister`).
   - All other routes default to `orientation`
     (`DEFAULT_REGISTER_AVAILABILITY.defaultRegister`).
3. `practitioner` remains the canonical substrate. It is the no-JS and pre-paint
   baseline rendered into the static HTML by the `RegisterContent` slot, the
   parse fallback (`DEFAULT_REGISTER`), and the explicit deep-reading choice. It
   is no longer the default reading register.
4. The availability sets are unchanged. `everyday` stays route-scoped and
   globally unavailable, exactly as ADR 0008 decision 5 and ADR 0009 decision 5
   established. This ADR changes only which available register is the default.
5. A persisted register — whether explicitly chosen or carried from the default
   a reader first landed on — wins over a page's per-page default, and the
   `everyday` → `orientation` fallback notice is unchanged.
6. The pre-paint script persists the resolved register on every load, not only
   when one was requested. The gentlest default a reader lands on becomes a
   sticky working preference: it carries across navigation, and on a page that
   cannot render it the existing fallback engages — `orientation` is shown with
   the visible "everyday is not available" notice and `?register=everyday`,
   identical to an explicit `everyday` choice. The first register a reader
   resolves is the one that sticks, so a reader who enters on a deep page
   (default `orientation`) keeps `orientation`, including on the home page.

## Alternatives considered

**Keep `practitioner` as the default (status quo from 0008).** Rejected. It
leads every first read with the densest register and raises the entry cost the
practice is trying to lower. The conservative reason for it (no `everyday`
content, new substrate) no longer holds.

**Default everyone to `everyday` globally.** Rejected. Most pages have no
`everyday` content. A global `everyday` default would either blank those pages
or silently fall back, and it would contradict the explicit-availability
discipline in ADR 0008 and ADR 0009. The fallback ladder reaches `everyday`
only where real content exists.

**Default entry pages to `everyday` and deep pages to `practitioner`.**
Rejected. That produces a jarring drop from the gentlest voice on entry pages to
the densest voice on deep pages. Since every deep page already renders
`orientation`, defaulting deep pages to `orientation` keeps the step between
pages small while still reserving `practitioner` for an explicit choice.

## Consequences

What improves:

- A fresh visitor enters at the gentlest register each page can offer, which
  matches the practice-first reading goal.
- The step between an entry page and a deeper page is one register
  (`everyday` → `orientation`) instead of two (`everyday` → `practitioner`).
- No-JS readers and crawlers still receive the `practitioner` substrate, so the
  canonical content and SEO baseline are unchanged.
- The visible register no longer changes silently between pages. A reader's
  gentle entry register carries forward, and where a page cannot render it the
  reader gets an explanation instead of a silent switch.

What changes or becomes harder:

- The static HTML baseline (`practitioner`) now differs from the default a
  JS-enabled reader sees. This divergence is accepted because `practitioner` is
  the canonical substrate and the gentler default is a client-resolved reading
  preference, not a content change.
- URL behavior shifts with the default. `practitioner` now adds
  `?register=practitioner` on pages where it is not the default, and
  `orientation` adds no param on the many pages where it is the default.
- Register tests assert per-page defaults rather than a single global default.
- Every visitor's first load now writes `localStorage` (the resolved register),
  not only readers who make an explicit choice.
- A reader who enters on an everyday page and browses into pages without
  everyday sees the fallback notice on each such page. The notice is dismissible
  and can be silenced with the accessibility "show register fallback notices"
  preference.
- The first register a reader resolves becomes sticky, so a deep-link entrant
  sees `orientation` on the home page rather than `everyday`.
- This refines the silent-default principle from
  [`2026-06-11-register-fallback-notice-absence-vs-invalid`](../guidance/evolution-records/2026-06-11-register-fallback-notice-absence-vs-invalid.md).
  The resolver still treats absence of input as the silent default. What changed
  is that only the very first load has no stored preference. Subsequent loads
  carry the persisted register and may show the unavailable fallback. The
  resolver-level lesson (absence is not invalidity) is unchanged.

## References

- [0008 — Public reading register substrate](0008-public-reading-register-substrate.md)
- [0009 — Structural signals and route-scoped everyday activation](0009-structural-essays-and-route-scoped-everyday-activation.md)
- [Register fallback notice: absence vs invalid input](../guidance/evolution-records/2026-06-11-register-fallback-notice-absence-vs-invalid.md)
- [`apps/site/src/lib/register-registry.js`](../../apps/site/src/lib/register-registry.js)
- [`apps/site/src/lib/route-map.js`](../../apps/site/src/lib/route-map.js)
- [`apps/site/src/components/ThemeProvider.astro`](../../apps/site/src/components/ThemeProvider.astro)

---
© 2026 Mikey Sebastian Drozd. Licensed under [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).
Source: https://github.com/Mikeys-Tech-Lab/poc
