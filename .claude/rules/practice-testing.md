---
paths:
  - "**"
---

# Teststrategi

## Mål

Riktige tester skal gi trygghet til å deploye direkte til prod.
Tester skal gi verdi — ikke skrives for å nå en dekningsgrad.

## Når skrive tester

- Alltid etter å ha fikset en bug.
- Vent til funksjonell flyt er satt før du tester komponenter under aktiv endring.
- Funksjoner i utils-filer skal som regel alltid testes.

## Hva som skal testes

- Egen UI-logikk og interaksjoner
- UI-oppførsel på ulike inputs: gyldig, ugyldig, tomme felt
- Skjema-validering (f.eks. zod-regler)
- Grenseverdier og edge cases
- Tilgangsmatrise: riktige sider og UI-elementer per rolle
- Backendvalidering: vises feilmeldinger korrekt?

## Verktøy

- **Enhetstester:** React Testing Library
- **E2E:** Playwright — se `practice-playwright.instructions.md`

## Prioriter robusthet over dekningsgrad

Tester skal være hjelpsomme, ikke en byrde.
