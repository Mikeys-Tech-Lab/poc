# PoC Mandate Lenses
## Canonical Lens Package Family

**Author:** Mikey Sebastian Drozd  
**Pronouns:** he/him · they/them  
**Website:** https://practiceofclarity.eu  
**Source:** https://github.com/Mikeys-Tech-Lab/poc/blob/main/mandateLenses/README.md  
**Copyright:** © 2026 Mikey Sebastian Drozd  
**License:** [CC BY 4.0](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE-CC-BY-4.0). Repository code and tooling: [MIT](https://github.com/Mikeys-Tech-Lab/poc/blob/main/LICENSE).

---

This package holds applied Practice of Clarity packages.

Each mandate lens is a context-facing application layer that must stay
traceable to:

- the seed set
- the Practice of Clarity method
- its own reasoning and misuse boundaries

## Package rule

Package by lens, not by artifact type.

Each lens lives in its own folder and contains:

- `README.md` - local entry and lineage notes
- `lens.md` - canonical application artifact
- `context-seeder.md` - derivative portable delivery form

`context-seeder.md` is not an independent source of truth.
It is a portable way to seed the canonical lens into a live context.
It must always point back to canonical sources and never replace them.

Bridge articles may encode register and entry expectations for a lens.
They do not establish grounded lens operation on their own.

## Migration rule

During migration, a root mandate lens package may become the target canonical
package before older archive copies are removed.

That is the current state for `SensibleDefaults/`.
