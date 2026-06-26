---
paths:
  - "**/*.{ts,tsx}"
---

# TypeScript-regler

## Grunnregler

- Alltid strict TypeScript. Ingen `any` uten kommentar som forklarer hvorfor.
- Ingen type assertions (`as`) uten eksplisitt begrunnelse i kommentar.
- Kjør ESLint og TypeScript-sjekker før commit.

## Variabler

- Bruk `const` over `let` der det er mulig. Aldri `var`.
- Navn skal være presise og beskrivende. Unngå fyllord som `data`, `info`, `value`.
- Boolske variabler prefixes med `is`, `has` eller `should`: `isRead`, `hasAccess`.

## Konstanter og enums

Vi bruker ikke enums — de er deprecated i TypeScript.
Bruk `const` med `as const` i stedet:

```ts
const STATUS = {
  TO_DO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];
```

Consten skrives i UPPER_CASE, innhold i UPPER_CASE, typen i PascalCase i entall.

## Funksjoner

- Alltid eksplisitte type-definisjoner på funksjoner og komplekse objekter.
- Funksjoner navngis på formatet `[verb][substantiv]`: `fetchBruker()`, `hentData()`, `formaterDato()`.
- Hooks prefixes alltid med `use`: `useConfig()`, `useAuthContext()`.
- Event-handlers prefixes med `on` eller `handle`: `onClick()`, `handleChange()`.

## Kommentarer

Kode skal leses som prosa — unngå kommentarer som forklarer _hva_ koden gjør.
Kommentarer er tillatt når:

- Du gjør et ukonvensjonelt workaround
- Du implementerer en spesifikk forretningsregel
- Du implementerer sikkerhetstiltak som frysing av lockfiler

Unngå å disable ESLint-regler med kommentarer. Refaktorer heller koden.
JSDocs er tillatt for komplekse funksjoner og komponenter.
