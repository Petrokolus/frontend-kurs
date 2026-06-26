---
paths:
  - "**/*.tsx"
---

# React-mønstre

## Komponenter

- Bruk alltid funksjonelle komponenter. Ikke skriv klassekomponenter.
- Ved eksisterende klassekomponenter: skriv om til funksjonelle ved berøring.
- Én komponent per fil, eksportert med samme navn som filen.
- Komponentnavn er substantiv i PascalCase: `<SakerTabell>`, `<LoggInnKnapp>`.
- Unngå fyllord i navn: ikke `<SakerTabellKomponent>`, ikke `<LoggInn>`.
- Bruk `@hdir/ui`-komponenter før du vurderer andre biblioteker eller egne løsninger.

## Props og komposisjon

- Eksplisitte props over spreading av store objekter.
- Foretrekk komposisjon over arv.
- Unngå tight coupling mellom UI og datahenting.

## Hooks

- `useCallback` og `useMemo` kun når begrunnet med ytelse — ikke som standard.
- Unngå unødvendige `useEffect` — vurder Server Components eller derived state først.
- Unngå skjulte sideeffekter som modifiserer ekstern tilstand.
- Foretrekk rene funksjoner der det er mulig.

## Ytelse og mønstre

For detaljerte ytelsesregler, re-render-optimalisering, bundle-størrelse og
avanserte mønstre: bruk `vercel-react-best-practices`-skillen.
