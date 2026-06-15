# Frontend-kurs

Et introduksjonskurs i frontend-utvikling. Du vil lære hva frontend er, hvordan det henger sammen med et API, og hvordan du bygger et brukergrensesnitt slik du ville gjort det på jobb.

Kurset er bygget rundt et realistisk scenario: du har startet i en ny jobb og har fått i oppgave å bygge et foosball-managementsystem for kontoret. Du har fått tilgang til et ferdig API og et komponentbibliotek — jobben din er å koble det hele sammen i en fungerende applikasjon.

---

## Innhold

- [Forutsetninger](#forutsetninger)
- [Kom i gang](#kom-i-gang)
- [Oppgaver](#oppgaver)
  - [Del 1 – Grunnleggende](#del-1--grunnleggende)
  - [Del 2 – Mer selvstendig](#del-2--mer-selvstendig)

---

## Forutsetninger

Før du begynner må du ha installert følgende på maskinen din. Følg hvert steg nøye, og ikke hopp videre før du har bekreftet at hvert steg fungerer. Sitter du fast, spør kursholder eller personen ved siden av deg.

### 1. Node.js

Node.js er motoren som kjører JavaScript utenfor nettleseren. Vi bruker versjon **24.16.0 LTS**.

**Sjekk om du allerede har riktig versjon:**

Åpne terminalen og skriv:

```bash
node --version
```

Hvis du ser `v24.16.0`, er du klar. Gå til steg 2.

Hvis du ser en annen versjon eller får en feilmelding, installer Node.js slik:

1. Gå til [nodejs.org](https://nodejs.org)

<!-- SKJERMBILDE: nodejs.org startsiden med LTS-knappen markert -->

2. Klikk på knappen merket **"24.16.0 LTS"** (venstre knapp)

<!-- SKJERMBILDE: Installasjonsfilen som lastes ned -->

3. Åpne filen som lastes ned og klikk **Next**

<!-- SKJERMBILDE: Velkomstskjermen i Node.js-installatøren -->

4. Godta lisensvilkårene og klikk **Next** gjennom alle stegene. Ikke endre noe — standardvalgene er riktige.

<!-- SKJERMBILDE: Siste steg med Finish-knappen -->

5. Klikk **Finish** når installasjonen er ferdig.

6. Lukk terminalen, åpne en ny, og kjør:

```bash
node --version
```

Du skal nå se `v24.16.0`.

---

### 2. pnpm (via Corepack)

pnpm er pakkebehandleren vi bruker i kurset. Den er tryggere og mer effektiv enn npm, blant annet fordi den ikke lar pakker kjøre ukjent kode uten at du godkjenner det eksplisitt. Vi bruker pnpm versjon 11.

Vi installerer pnpm gjennom **Corepack**, som følger med Node.js og lar deg aktivere ulike pakkebehandlere på en kontrollert måte.

**Kjør følgende kommando i terminalen:**

> **Windows:** Du må kanskje åpne terminalen som administrator. Søk etter "Terminal" eller "PowerShell" i startmenyen, høyreklikk og velg **"Kjør som administrator"**.

```bash
corepack enable
```

<!-- SKJERMBILDE: Terminal med corepack enable kjørt -->

Bekreft at pnpm er tilgjengelig:

```bash
pnpm --version
```

Du skal se noe som `11.x.x`.

---

### 3. Visual Studio Code

Vi anbefaler Visual Studio Code (VS Code) som kodeeditor. Den er gratis og har god støtte for TypeScript og React.

**Sjekk om du allerede har VS Code:**

Søk etter "Visual Studio Code" i programmene dine. Hvis den er installert, gå til steg 4.

Hvis ikke:

1. Gå til [code.visualstudio.com](https://code.visualstudio.com)

<!-- SKJERMBILDE: VS Code sin nedlastingsside -->

2. Klikk på den store blå nedlastingsknappen for ditt operativsystem
3. Åpne filen som lastes ned og følg instruksjonene

---

### 4. VS Code-utvidelser

Disse utvidelsene gjør det enklere å skrive React og TypeScript.

1. Åpne VS Code
2. Trykk `Ctrl+Shift+X` (Windows) / `Cmd+Shift+X` (Mac) for å åpne utvidelsespanelet

<!-- SKJERMBILDE: VS Code med utvidelsespanelet åpent -->

3. Søk opp og installer følgende utvidelser én etter én:

| Utvidelse                     | Hva den gjør                    |
| ----------------------------- | ------------------------------- |
| **ESLint**                    | Varsler deg om feil i koden     |
| **Prettier - Code formatter** | Formaterer koden automatisk     |
| **Tailwind CSS IntelliSense** | Gir autofullfør for CSS-klasser |

<!-- SKJERMBILDE: ESLint-utvidelsen i søkeresultatet med Install-knappen -->

---

## Kom i gang

Når alle forutsetningene er på plass, følger du disse stegene for å starte prosjektet.

### Steg 1 — Klon prosjektet fra GitHub

1. Åpne terminalen
2. Naviger til mappen der du vil lagre prosjektet, for eksempel:

```bash
cd repos/kurs
```

3. Klon repoet:

```bash
git clone <url-til-repoet>
```

4. Gå inn i prosjektmappen:

```bash
cd frontend-kurs
```

---

### Steg 2 — Åpne prosjektet i VS Code

```bash
code .
```

VS Code åpner seg med prosjektmappen. Hvis kommandoen ikke fungerer, åpne VS Code manuelt og velg **File → Open Folder**, naviger til `frontend-kurs`-mappen og klikk **Velg mappe**.

<!-- SKJERMBILDE: VS Code åpnet med frontend-kurs-mappen -->

---

### Steg 3 — Åpne terminalen i VS Code

Klikk på **Terminal** i menyen øverst → **New Terminal**.

En terminal åpner seg nederst i VS Code. Sjekk at du er i riktig mappe:

```bash
pwd
```

Du skal se en filsti som slutter på `frontend-kurs`. Hvis ikke, spør kursholder eller personen ved siden av deg.

<!-- SKJERMBILDE: VS Code med terminal åpen nederst -->

---

### Steg 4 — Installer avhengigheter

```bash
pnpm install
```

Dette laster ned alle bibliotekene prosjektet trenger. Det kan ta litt tid første gang. Når det er ferdig ser du noe som:

```
Done in Xs
```

---

### Steg 5 — Start utviklingsserveren

```bash
pnpm dev
```

Du skal se noe som ligner på dette:

```
▲ Next.js 16.x.x
- Local: http://localhost:3000
✓ Ready in Xs
```

<!-- SKJERMBILDE: Terminal med pnpm dev kjørende -->

---

### Steg 6 — Åpne applikasjonen

Åpne nettleseren og gå til:

```
http://localhost:3000
```

Du skal nå se velkomstsiden til kurset.

<!-- SKJERMBILDE: Velkomstsiden i nettleseren -->

Er du her, er alt satt opp korrekt og du er klar til å begynne på oppgavene!

> **Viktig:** Utviklingsserveren må kjøre i terminalen mens du jobber. Lukk den ikke.
> Trenger du en ny terminal, åpne en ny fane med `+`-ikonet i terminalfeltet i VS Code.

---

## Oppgaver

Kurset er delt i to deler. I **del 1** er oppgavene nøye instruert med forklaringer, teori og kodesnippets du kan ta utgangspunkt i. I **del 2** er instruksjonene kortere — her forventes det at du bruker det du har lært og slår opp i dokumentasjonen selv.

---

## Del 1 – Grunnleggende

### Oppgave 1 – Vis alle spillere

**Hva du skal lære:** HTML/JSX, React-komponenter, props, TypeScript-typer, iterering med `.map()`, og henting av data fra API med server components.

I React bygger vi brukergrensesnitt av komponenter — gjenbrukbare byggeklosser som hver har sitt eget ansvar. En komponent er egentlig bare en funksjon som returnerer JSX (HTML-lignende kode):

```
function Hilsen() {
  return <p>Hello, world!</p>;
}
```

For å gjøre en komponent gjenbrukbar sender vi inn data via props (properties). Props fungerer som argumenter til funksjonen:

```
function Hilsen({ navn }: { navn: string }) {
  return <p>Hei, {navn}!</p>;
}

// Bruk:
<Hilsen navn="Ola" />
<Hilsen navn="Kari" />
```

> 🚧 Naviger til mappen src/app/spillere. Der finner dere tre filer som dere skal få lov til å prøve å fullføre:

- spiller-card.tsx - filen som er tenkt å vise litt informasjon om hver enkelt spiller
- spillere-liste.tsx - filen som sørger for at vi får en liste med SpillerCards, én for hver spiller
- page.tsx - filen som forteller Next at her er det en side vi vil kunne navigere til. Her vil vi som regel ikke ha noe logikk, men det er et fint sted å legge komponenter som vi vil vise på siden.
---

### Oppgave 2 – Spillerdetaljer (UFERDIG)

**Hva du skal lære:** Filbasert routing i Next.js, dynamiske route-parametere, lenking mellom sider med `<Link>`, og tilgjengelighet (`alt`-tekst på bilder).

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 3 – Opprett spiller (UFERDIG)

**Hva du skal lære:** HTML-skjemaer i React, `useState` for skjematilstand, kontrollerte inputs, sende data til API med `fetch`, og tilgjengelighet i skjemaer.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 4 – Hooks i praksis (UFERDIG)

**Hva du skal lære:** Hva en hook er og reglene for hooks, `useState` til interaktiv tilstand, `useEffect` til sideeffekter, og `useRef` til direkte DOM-tilgang.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 5 – Opprett spiller med React Hook Form (UFERDIG)

**Hva du skal lære:** Installere og bruke en tredjeparts React-pakke, fordelen med `react-hook-form` over manuell state, og skjemavalidering.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 6 – Rediger spiller (UFERDIG)

**Hva du skal lære:** Gjenbruke komponenter, bruke en dialog/modal, forhåndsutfylle skjema med eksisterende data, og sende PATCH-kall til API.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 7 – Slett spiller (UFERDIG)

**Hva du skal lære:** DELETE-kall mot API, bekreftelsesdialog, og oppdatere visningen etter sletting.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 8 – Filtrering og sortering av spillere (UFERDIG)

**Hva du skal lære:** URL search params til filtrering, forskjellen på lokal og URL-basert tilstand, og server-side sortering.

> 🚧 Oppgavetekst skrives her.

---

## Del 2 – Mer selvstendig

### Oppgave 9 – Kamphistorikk (UFERDIG)

Lag en ny side som viser kamphistorikk i en tabell med paginering.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 10 – Registrere en kamp (UFERDIG)

Lag et skjema for å registrere resultatet av en kamp mellom to spillere.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave 11 – Dashboard (UFERDIG)

Implementer et dashboard i henhold til UX-skissen fra UX-kurset.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Suspense og loading (UFERDIG)

Legg til `loading.tsx` og `<Suspense>`-grenser med skeleton-komponenter. Gjøres først nøye instruert på spillersiden, deretter selvstendig på kampsiden.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – ELO og plasseringsbadge (UFERDIG)

Beregn ELO-rating basert på kamphistorikk og vis gull/sølv/bronse-badge på spillerkortene.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Booke kamper (UFERDIG)

Lag et system for å planlegge fremtidige kamper med tid og deltakere.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Betting på kamper (UFERDIG)

Legg til mulighet for å tippe utfall på planlagte kamper.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Error og not-found på spillerdetaljer (UFERDIG)

Legg til `not-found.tsx` hvis spilleren ikke finnes, og `error.tsx` for generelle feil.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Tester med Vitest (UFERDIG)

Noen tester i prosjektet feiler. Få dem til å bli grønne!

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Innlogging (UFERDIG)

Legg til autentisering og beskytt sider som krever innlogging.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Filtrering på kamper med debounce (UFERDIG)

Legg til filtrering på kampsiden med debounce for å unngå for mange API-kall.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Breadcrumbs med usePathname (UFERDIG)

Implementer breadcrumb-navigasjon ved hjelp av `usePathname`.

> 🚧 Oppgavetekst skrives her.

---

### Oppgave – Zod-validering (UFERDIG)

Legg til Zod for skjemavalidering i kombinasjon med `react-hook-form`.

> 🚧 Oppgavetekst skrives her.
