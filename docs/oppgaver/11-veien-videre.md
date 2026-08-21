<!-- nav:start -->
[← Oppgave 10](./10-dashboard.md) · [Oversikt](../../README.md#oppgaver)
<!-- nav:end -->

## Veien videre

Gratulerer, du har fullført kurset! Du har bygget en komplett applikasjon fra bunnen av: komponenter, dataflyt, skjemaer, navigasjon, filtrering og et dashboard. Det er mye å være stolt av.

Hvis du vil fortsette å lære, har vi samlet noen forslag til hva du kan jobbe med videre. Disse er ikke ferdig instruerte oppgaver. Her må du lese deg opp selv, eksperimentere og finne ut av ting på egenhånd. Det er slik det er på jobb, og det er slik man virkelig lærer.

Plukk det som interesserer deg mest.

---

#### Feilhåndtering med `error.tsx` og `not-found.tsx`

Hva skjer hvis brukeren navigerer til `/spillere/99999`, en spiller som ikke finnes? I dag krasjer siden. Next.js har to spesialfiler for å håndtere dette pent: `not-found.tsx` vises når du kaller `notFound()` fra `next/navigation`, og `error.tsx` fanger uventede feil og lar brukeren prøve på nytt.

**Start med:** [Error Handling i Next.js-dokumentasjonen](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

---

#### Skjemavalidering med Zod

React Hook Form validerer feltene, men reglene er spredt rundt i koden som strenger og tall. Zod lar deg beskrive hele skjemaet som et TypeScript-objekt på ett sted, og du får automatisk ut den riktige TypeScript-typen. Det er standarden de fleste prosjekter bruker i dag.

**Start med:** [Zod-dokumentasjonen](https://zod.dev) og søk etter `zodResolver` fra pakken `@hookform/resolvers`.

---

#### Breadcrumb-navigasjon

En breadcrumb viser brukeren hvor i applikasjonen de er: `Hjem / Spillere / Erik Solberg`. `usePathname` fra `next/navigation` gir deg den nåværende URL-en som en streng, og du kan dele den opp og bygge en navigasjonskomponent av den.

**Start med:** [`usePathname` i Next.js-dokumentasjonen](https://nextjs.org/docs/app/api-reference/functions/use-pathname)

---

#### Rangeringsbadge på spillerkort

Alle spillere har en rating. Del ratingen inn i nivåer som bronse, sølv, gull, platinum og diamant, og lag en visuell wrapper rundt hvert spillerkort som styler kortet basert på nivået. Dette er en stilfordypning: hvordan bruker du Tailwind og betinget rendering til å lage et system som ser bra ut og er lett å vedlikeholde?

**Start med:** Bestem hvilke ratinggrenser som hører til hvilket nivå, lag en hjelpefunksjon som returnerer nivået for en gitt rating, og bruk den i `SpillerCard` til å sette riktige klasser.

---

#### Innlogging

Akkurat nå kan hvem som helst opprette, redigere og slette spillere. Med autentisering kan du beskytte disse sidene slik at bare innloggede brukere får tilgang. Next.js middleware lar deg sjekke om brukeren er logget inn før siden lastes.

**Start med:** [Better Auth](https://www.better-auth.com) er et moderne autentiseringsbibliotek med god støtte for Next.js App Router.

---

#### Tester med Vitest

Tester gir deg trygghet til å endre kode uten å være redd for å ødelegge noe. Vitest er et raskt testrammeverk som passer godt med Next.js. Start med å skrive enhetstester for rene funksjoner, som `slugify` i `readme-renderer.tsx` eller sorteringslogikken fra oppgave 8.

**Start med:** [Vitest-dokumentasjonen](https://vitest.dev) og [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for komponenttester.

<!-- nav:start -->
[← Oppgave 10](./10-dashboard.md) · [Oversikt](../../README.md#oppgaver)
<!-- nav:end -->
