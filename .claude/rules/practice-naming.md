---
paths:
  - "**/*.{ts,tsx}"
---

# Navngiving

## Generelt

- Domeneord i saksbehandlingsapplikasjoner skrives på norsk: `leggtilVedtaksinnstilling()`.
- Etablerte mønstre og nøkkelord skrives på engelsk: `fetchFoo`, `useBar`.
- Ikke bruk æ, ø, å i variabelnavn — bruk e, o, a.
- Prioriter lange, beskrivende navn over korte og sammentrykte.

## Filer og mapper

- Kebab-case: `my-table.tsx`, `viktig-mappe/`.

## Funksjoner og variabler

- camelCase med liten forbokstav.
- Format: `[verb][substantiv]` — `fetchBruker()`, `hentData()`, `formaterDato()`.
- Boolske variabler: `isRead`, `hasAccess`, `shouldValidate`.
- Hooks: alltid `use`-prefiks — `useConfig()`, `useAuthContext()`.
- Event-handlers: `on`- eller `handle`-prefiks — `onClick()`, `handleChange()`.

## Komponenter og objekter

- PascalCase, alltid substantiv: `<SakerTabell>`, `<LoggInnKnapp>`.
- Unngå fyllord: ikke `<SakerTabellKomponent>`, ikke `data`, ikke `info`.

## Konstanter

- UPPER_SNAKE_CASE: `VIKTIG_KONSTANT`, `MAX_LIMIT`.
