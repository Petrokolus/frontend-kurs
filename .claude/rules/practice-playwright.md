---
paths:
  - "**/*.spec.ts"
---

# Playwright E2E

## Hva vi tester

- Happy paths: klarer brukeren å gjøre det den skal?
- Tilgangsstyring: riktige sider per rolle, blokkering av utilgjengelige sider
- Integrasjoner: mottar vi data fra backend som forventet?
- Backendvalidering: vises feilmeldinger, skjules tekniske detaljer?

## Mappestruktur

```
tests/

├── global.setup.ts

├── accessibility/

│   └── <side>.spec.ts

└── functional/

├── utils/

├── components/

└── <rolle>/

├── utils/

│   ├── fixtures.ts

│   └── <tilgangsområde>.ts

├── components/

│   └── <tilgangsområde>.ts

├── test-data.ts

└── <tilgangsområde>.spec.ts
```

## Lagansvarsfordeling

| Lag       | Ansvar                          | Eksempel                     |
| --------- | ------------------------------- | ---------------------------- |
| Spec      | Hva brukeren kan gjøre          | "kan registrere tobakksalg"  |
| Util      | Hvordan man gjør det            | `navigerTilSkjema()`         |
| Component | Hva man interagerer med         | `submitKnapp()`              |
| Fixture   | Hvem man er og hvor man starter | Innlogget bruker på homepage |
| Test-data | Med hvilke verdier              | `{ orgNr: 123456789 }`       |

## Skriveflyt

1. Bruk Playwright codegen for å lage et programmatisk bilde av brukerflyten
2. Bruk agent med Playwright-skill for å skrive testen bedre
3. Vurder navngiving og struktur — lag gjenbrukbare components og utils
4. Del opp i små nok tester: én test, én oppførsel

## Viktige regler

- Én test dekker én oppførsel.
- Hver test rydder opp etter seg der det er mulig.
- Avhengige tester grupperes med `test.describe.serial`.
- Lang brukerflyt som timer ut: bruk `test.setTimeout(180_000)`.
- Begrens parallellisering: juster `workers` i `playwright.config.ts`.
- Prioriter robusthet over ytelse.
