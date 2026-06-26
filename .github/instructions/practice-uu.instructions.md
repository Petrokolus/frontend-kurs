---
applyTo: "**/*.tsx"
name: Universell utforming
description: "UU-krav, testprinsipper og kjente falske positiver"
---

# Universell utforming

## Mål

Alle brukere skal kunne bruke applikasjonen uavhengig av funksjonsnedsettelse.
UU-feil oppdages helst under utvikling — ikke i produksjon.

## Under utvikling

- Test med tastatur: kan du nå og bruke alle interaktive elementer?
- Test med skjermleser: leses innhold og labels opp korrekt?
- Bruk axe-core via Playwright accessibility-tester for automatisk skanning.
- UU-tester kjøres per side i `tests/accessibility/<side>.spec.ts`.

## Kjente falske positiver

Ikke marker disse som brudd uten manuell verifisering:

| Komponent                   | Verktøy             | Rapportert feil             | Vurdering                                   |
| --------------------------- | ------------------- | --------------------------- | ------------------------------------------- |
| Autocomplete                | Wave                | Broken ARIA reference       | Fungerer korrekt manuelt                    |
| Autocomplete nedtrekksliste | Siteimprove         | aria-expanded på div        | Skjermleser OK                              |
| Modal                       | Wave                | Empty button                | Lukke-knapp utenfor modal — ikke fokuserbar |
| Diverse                     | axe/W3C/Siteimprove | aria-label på div uten role | Ikke feil i HTML5                           |

## Tekststørrelse

200% tekststørrelse skal støttes. Test på maskinnivå og i Chrome.
