---
paths:
  - "**"
---

# Frontend-overblikk

## Stack

- **Framework:** Next.js (App Router) med TypeScript
- **Komponentbibliotek:** @hdir/ui — bruk alltid dette før du vurderer andre biblioteker
- **Testing:** React Testing Library for enhetstester, Playwright for E2E
- **Monitorering:** Application Insights via @hdir/app-insights

## Hva en frontend-oppgave innebærer

En frontend-oppgave er ikke ferdig når koden kompilerer. Den er ferdig når:

- Funksjonaliteten fungerer som forventet
- Koden følger navnekonvensjoner og kodestandarder
- Relevante tester er skrevet
- Universell utforming er ivaretatt
- Koden er selvdokumenterende uten unødvendige kommentarer

## Faser i en frontend-oppgave

1. **Forstå oppgaven** — kartlegg scope, avklar tvetydigheter før koding starter
2. **Planlegg** — hvilke komponenter, filer og mønstre er involvert?
3. **Implementer** — følg eksisterende mønstre, kirurgiske endringer
4. **Test** — enhetstester på logikk, E2E på kritiske brukerflyter
5. **Vurder UU** — er komponenter tilgjengelige for alle brukere?
6. **Review** — er koden selvdokumenterende, er navngiving presis?

## Detaljerte retningslinjer

Hver av disse filene utdyper ett aspekt:

- Typescript-regler → `lang-typescript.instructions.md`
- React-mønstre → `lang-react.instructions.md`
- Next.js-spesifikt → `framework-next.instructions.md`
- Navngiving → `practice-naming.instructions.md`
- Testing og teststrategi → `practice-testing.instructions.md`
- Playwright og E2E → `practice-playwright.instructions.md`
- Universell utforming → `practice-uu.instructions.md`

## Viktige prinsipper

- Foretrekk Server Components som standard i Next.js
- Unngå tight coupling mellom UI og datahenting
- Kode skal leses som prosa — navngiving er viktigere enn kommentarer
- Ikke installer pakker uten godkjenning
