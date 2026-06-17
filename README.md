# Frontend-kurs

Et introduksjonskurs i frontend-utvikling. Du vil lære hva frontend er, hvordan det henger sammen med et API, og hvordan du bygger et brukergrensesnitt slik du ville gjort det på jobb.

Kurset er bygget rundt et realistisk scenario: du har startet i en ny jobb og har fått i oppgave å bygge et foosball-managementsystem for kontoret. Du har fått tilgang til et ferdig API og et komponentbibliotek — jobben din er å koble det hele sammen i en fungerende applikasjon.

---

<details>
<summary>Forutsetninger</summary>

Før du begynner må du ha installert følgende på maskinen din. Følg hvert steg nøye, og ikke hopp vidu før du har bekreftet at hvert steg fungerer. Sitter du fast, spør kursholder eller personen ved siden av deg.

### 1. Git

Git er versjonskontrollsystemet vi bruker til å lagre og dele kode. Vi antar at du har git fra tidligere kurs — sjekk med:

```bash
git --version
```

Hvis du ikke har git installert, last det ned fra [git-scm.com/install](https://git-scm.com/install) og spør om hjelp om du trenger det.

---

### 2. Node.js

Node.js er motoren som kjører JavaScript utenfor nettleseren. Vi bruker versjon **24.16.0 LTS**.

**Sjekk om du allerede har riktig versjon:**

Åpne terminalen og skriv:

```bash
node --version
```

Hvis du ser `v24.16.0`, er du klar. Gå til steg 2.

Hvis du ser en annen versjon eller får en feilmelding, installer Node.js slik:

1. Gå til [nodejs.org](https://nodejs.org) og trykk på "Get Node.js" knappen.

![Node.js Homepage with "Get Node js" button highlighted](nodejs_homepage.png)

2. Klikk på knappen merket **"Windows installer (.msi)"**

![Node js download page with windows installer button highlighted](nodejs_download_page.png)

OBS. Dersom du har Mac endrer du til "macOS i den blå firkanten og trykker på "macOS installer (.pkg)". Stegene vidu er de samme.

![Node js download page with macOS installer button highlighted](nodejs_download_page_mac.png)

3. Åpne filen som lastes ned og klikk **Next**

![Node js setup wizard with "Next" button highlighted](nodejs_setup_wizard_homepage.png)

4. Godta lisensvilkårene og klikk **Next** gjennom alle stegene. Ikke endre noe — standardvalgene er riktige.

![License agreement with "Next" button highlighted](nodejs_license_agreement.png)
![Destination folder for node.js](nodejs_destination_folder.png)
![Node js Custom Setup](nodejs_custom_setup.png)
![Node js tools for Native Modules](nodejs_tools_for_native_modules.png)

PS. Du velger selv om du vil installere "Tools for Native Modules". Det er ikke nødvendig, men da har du det liggende skulle du trenge det senere.
Dersom du velger å installere "Tools for Native Modules", vil du få opp følgende vindu når du har fullført insstallasjonen av Node.js. Følg instruksjonene i vinduet, til du ser "Type ENTER to exit:" Da er installasjonen fullført.

![Node js tools for native modules install](nodejs_tools_for_native_modules_install.png)

5. Klikk **Install** og deretter **Finish** når installasjonen er ferdig.

![Node js installation](nodejs_installation.png)
![Node js installation complete](nodejs_installation_complete.png)

6. Åpne en terminal og kjør kommandoen:

```bash
node --version
```

Du skal nå se `v24.16.0`.

---

### 3. pnpm (via Corepack)

pnpm er pakkebehandleren vi bruker i kurset. Den er tryggere og mer effektiv enn npm, blant annet fordi den ikke lar pakker kjøre ukjent kode uten at du godkjenner det eksplisitt. Vi bruker pnpm versjon 11.

Vi installerer pnpm gjennom **Corepack**, som følger med Node.js og lar deg aktivere ulike pakkebehandlere på en kontrollert måte.

**Kjør følgende kommando i terminalen:**

> **Windows:** Du må kanskje åpne terminalen som administrator. Søk etter "Terminal" eller "PowerShell" i startmenyen, høyreklikk og velg **"Kjør som administrator"**.

```bash
corepack enable
```

Denne kommandoen gir ingen outout. Det er normalt.

Bekreft at pnpm er tilgjengelig:

```bash
pnpm --version
```

Dersom du ikke har kjørt pnpm via Corepack før, vil du få opp et spørsmål om å installere pnpm. Skriv `Y` og trykk Enter.

Du vil da se noe som dette:

```bash
❯ corepack enable
❯ pnpm --version
! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-11.7.0.tgz
? Do you want to continue? [Y/n]

11.7.0
```

---

### 4. Visual Studio Code

Vi anbefaler Visual Studio Code (VS Code) som kodeeditor. Den er gratis og har god støtte for TypeScript og React.

**Sjekk om du allerede har VS Code:**

Søk etter "Visual Studio Code" i programmene dine. Hvis den er installert, gå til steg 4.

Hvis ikke:

1. Gå til [code.visualstudio.com/Download](https://code.visualstudio.com/Download)

![vs code download page](vs_code_download_page.png)

2. Klikk på den store blå nedlastingsknappen for ditt operativsystem.
3. Åpne filen som lastes ned og følg instruksjonene.
   ![VS Code setup wizard license agreement](vs_code_setup_wizard_licence_agreement.png)
   ![VS Code additional tasks](vs_code_additional_tasks.png)
   ![VS Code install](vs_code_install.png)
   ![VS Code installation complete](vs_code_installation_complete.png)

---

### 5. VS Code-utvidelser (Valgfritt)

Disse utvidelsene gjør det enklere å skrive React og TypeScript.

1. Åpne VS Code
2. Trykk `Ctrl+Shift+X` (Windows) / `Cmd+Shift+X` (Mac) for å åpne utvidelsespanelet

3. Søk opp og installer følgende utvidelser én etter én:

| Utvidelse                     | Hva den gjør                    |
| ----------------------------- | ------------------------------- |
| **ESLint**                    | Varsler deg om feil i koden     |
| **Prettier - Code formatter** | Formaterer koden automatisk     |
| **Tailwind CSS IntelliSense** | Gir autofullfør for CSS-klasser |

![vs code extension eslint](vs_code_extension_eslint.png)
![vs code extension prettier](vs_code_extension_prettier.png)
![vs code extension tailwind](vs_code_extension_tailwind.png)

</details>

---

<details>
<summary>Kom i gang</summary>

Når alle forutsetningene er på plass, følger du disse stegene for å starte prosjektet.

### Steg 1 — Fork prosjektet på GitHub

For at du skal kunne lagre arbeidet ditt, må du lage din egen kopi av dette kurs-repoet på din egen GitHub. Dette kalles å **forke**.

1. Gå til [github.com/Petrokolus/frontend-kurs](https://github.com/Petrokolus/frontend-kurs)
2. Logg inn på GitHub (eller opprett en bruker hvis du ikke har en)
3. Klikk på **Fork**-knappen øverst til høyre på siden og følg instruksjonene.

![github repo fork](github_repo_fork.png)

Du har nå din egen kopi av repoet under din GitHub-bruker.

---

### Steg 2 — Klon din fork

1. Åpne terminalen
2. Naviger til mappen der du vil lagre prosjektet, for eksempel:

```bash
cd repos/kurs
```

3. Klon **din** fork (bytt ut `<brukernavn>` med ditt GitHub-brukernavn):

```bash
git clone https://github.com/<brukernavn>/frontend-kurs.git
```

4. Gå inn i prosjektmappen:

```bash
cd frontend-kurs
```

---

### Steg 3 — Åpne prosjektet i VS Code

```bash
code .
```

VS Code åpner seg med prosjektmappen. Hvis kommandoen ikke fungerer, åpne VS Code manuelt og velg **File → Open Folder**, naviger til `frontend-kurs`-mappen og klikk **Velg mappe**.

---

### Steg 4 — Åpne terminalen i VS Code

Klikk på **Terminal** i menyen øverst → **New Terminal**.

En terminal åpner seg nederst i VS Code. Sjekk at du er i riktig mappe:

```bash
pwd
```

Du skal se en filsti som slutter på `frontend-kurs`. Hvis ikke, spør kursholder eller personen ved siden av deg.

![vs code with terminal open](vs_code_with_terminal_open.png)

---

### Steg 5 — Installer avhengigheter

```bash
pnpm install
```

Dette laster ned alle bibliotekene prosjektet trenger. Det kan ta litt tid første gang. Når det er ferdig ser du noe som:

```
Done in Xs
```

---

### Steg 6 — Start utviklingsserveren

```bash
pnpm dev
```

Du skal se noe som ligner på dette:

```
▲ Next.js 16.x.x
- Local: http://localhost:3000
✓ Ready in Xs
```

---

### Steg 7 — Åpne applikasjonen

Åpne nettleseren og gå til:

```
http://localhost:3000
```

Du skal nå se velkomstsiden til kurset og du er klar til å begynne på oppgavene!

> **Viktig:** Utviklingsserveren må kjøre i terminalen mens du jobber. Lukk du terminalen, vil nettsiden slutte å fungere.
> Trenger du en ny terminal, åpne en ny fane med `+`-ikonet i terminalfeltet i VS Code.

</details>

---

## Oppgaver

Oppgavene starter nøye instruert med forklaringer, teori og kodesnippets du kan ta utgangspunkt i. Etter hvert blir instruksjonene kortere — da forventes det at du bruker det du har lært og slår opp i dokumentasjonen selv.

|     | Oppgave                                                                               |
| --- | ------------------------------------------------------------------------------------- |
| 1   | [Vis alle spillere](#oppgave-1-vis-alle-spillere)                                     |
| 2   | [Spillerdetaljer](#oppgave-2-spillerdetaljer)                                         |
| 3   | [Opprett spiller](#oppgave-3-opprett-spiller)                                         |
| 4   | [Hooks i praksis](#oppgave-4-hooks-i-praksis-uferdig)                                 |
| 5   | [Opprett spiller med React Hook Form](#oppgave-5-opprett-spiller-med-react-hook-form) |
| 6   | [Rediger spiller](#oppgave-6-rediger-spiller)                                         |
| 7   | [Slett spiller](#oppgave-7-slett-spiller-uferdig)                                     |
| 8   | [Filtrering og sortering](#oppgave-8-filtrering-og-sortering-av-spillere-uferdig)     |

---

## Oppgave 1 – Vis alle spillere

**Hva du skal lære:** HTML/JSX, React-komponenter, props, TypeScript-typer, iterering med `.map()`, og henting av data fra API med server components.

I React bygger vi brukergrensesnitt av komponenter — gjenbrukbare byggeklosser som hver har sitt eget ansvar. En komponent er egentlig bare en funksjon som returnerer JSX (HTML-lignende kode):

```typescript
function Hilsen() {
  return <p>Hello, world!</p>;
}
```

For å gjøre en komponent gjenbrukbar sender vi inn data via props (properties). Props fungerer som argumenter til funksjonen:

```typescript
type Props = {
  navn: string;
};

function Hilsen({ navn }: Props) {
  return <p>Hei, {navn}!</p>;
}

// Bruk:
<Hilsen navn={"Ola"} />
<Hilsen navn={"Kari"} />
```

Siden vi også skriver i TypeScript, så kan du se at vi definerer typen på alle props.

Naviger til mappen `src/app/spillere`. Der finner du tre filer du skal jobbe i:

- `spiller-card.tsx` — komponenten som viser informasjon om én spiller
- `spillere-liste.tsx` — liste-komponent som setter sammen SpillerCard-komponenter til en oversikt
- `page.tsx` — filen som definerer selve siden. Her henter vi data fra API-et og sender det videre som props til komponentene vi vil vise.

Vi går gjennom disse steg for steg i oppgavene under.

#### Oppgave 1a - Legg til en overskrift

Hvis du har applikasjonen oppe og går lokalt, slik som beskrevet i slutten av oppstartsguiden, så kan du allerede nå navigere i nettleseren til "Spillere" i sidemenyen. Der ser du det som nå finnes av innhold i page.tsx i spillere-mappen.

Alle sider trenger en overskrift! Naviger til page.tsx og legg til en passende overskrift. HTML har sitt eget element for overskrifter:

```typescript
<h1>Dette er en overskrift</h1>
```

Tailwind CSS nullstiller alle nettleserens innebygde styles — inkludert overskrifter. Det betyr at `<h1>` ikke automatisk ser stor og fet ut, slik den gjør når man bruker vanlig CSS. Du må legge til stilene selv via `className`:

```tsx
<h1 className="text-3xl font-bold">Dette er en overskrift</h1>
```

Dette er hvordan man styler ved hjelp av Tailwind CSS. Det kodesnutten over gjør:

- _text-3xl_: Setter font-størrelse til XXXL
- _font-bold_: Setter font-type til bold (fet skrift)

#### Oppgave 1b - Vis et SpillerCard på siden

Forsøk å vise litt mer enn bare overskriften på siden. Komponenter som vi lager i React kan importeres og deretter legges inn i page.tsx på samme måte som overskrift-taggen du nettopp har lagt til. Klarer du å importere og vise et SpillerCard på siden?

<details class="hint">
<summary>Hint</summary>

Vi importerer og bruker SpillerCard i spillere-liste.tsx.

</details>

#### Oppgave 1c - Bytt ut mockSpiller med en prop

`SpillerCard` har nå en hardkodet `mockSpiller` inni seg. Det betyr at kortet alltid viser samme spiller, uansett hvilken data vi sender inn. Det vil vi endre.

Øverst i `spiller-card.tsx` ser du at det allerede finnes en `Props`-type med et `spiller`-felt. Målet ditt er å:

1. Slette `mockSpiller`-konstanten
2. La `SpillerCard` ta imot `spiller` som prop i stedet
3. Oppdatere kommentaren i `spillere-liste.tsx` til å sende `spiller` inn

Når du er ferdig vil hvert kort vise sin egen spiller i stedet for alltid å vise Ola Nordmann.

<details class="hint">
<summary>Hint</summary>

Se på hvordan `SpillereListe` er satt opp — den tar imot `spillere` som prop på nøyaktig samme måte. Kopier mønsteret.

</details>

#### Oppgave 1d - Fyll på litt fler detaljer

Hvis du klarte å vise et SpillerCard på siden i forrige oppgave, så la du kanskje merke til at det ikke var så mye mer spennende informasjon enn navnet som vises. Prøv å vise noe mer informasjon i SpillerCard.

<details class="hint">
<summary>Hint</summary>

Usikker på hva slags informasjon du kan vise? Se hvilke verdier som finnes i et spiller-objekt ved å holde musepekeren over "Spiller" eller ved å bruke `Ctrl + venstreklikk`.

</details>

#### Oppgave 1e - Hent spillere

Vi har en lokal database med foosball-spillere! Innhold derfra kan hentes gjennom API-et på denne måten:

```ts
const result = await fetch("http://localhost:3000/api/spillere");
const spillere = await result.json();
```

Fordi `page.tsx` er en **server component** — en komponent som kjører på serveren, ikke i nettleseren — kan vi bruke `await` direkte i komponenten uten noe ekstra oppsett. Vi kommer tilbake til hva dette betyr i praksis i oppgave 3.

Når du har hentet spillerne, sitter du igjen med en liste. For å vise hvert element i en liste bruker vi `.map()`, som går gjennom hvert element og returnerer JSX:

```tsx
spillere.map((spiller) => <SpillerCard key={spiller.id} spiller={spiller} />);
```

`key` er et spesielt React-attributt som hjelper React å holde styr på hvilket element i listen som er hvilket. Bruk alltid en unik verdi — her passer `id` perfekt.

Prøv å hente spillerne fra API-et og bruk `.map()` til å vise en liste med alle spillerne!

---

## Oppgave 2 – Spillerdetaljer

**Hva du skal lære:** Filbasert routing i Next.js, dynamiske route-parametere, lenking mellom sider med `<Link>`, og tilgjengelighet (`alt`-tekst på bilder).

I oppgave 1 bygde vi en liste over alle spillere. Nå skal vi lage en detaljside for hver enkelt spiller og lenke til den, slik at man kan navigere til detaljsiden ved å klikke på et spillerkort i listen.

I denne oppgaven skal vi også bli kjent med **API-dokumentasjonen**, et verktøy du finner i sidemenyen under "API-dokumentasjon". Der kan du se alle tilgjengelige API-ruter, hva de returnerer, og teste dem direkte i nettleseren. Dette er noe du vil bruke mye på jobb, så det er lurt å bli komfortabel med det tidlig.

#### Oppgave 2a – Besøk detaljsiden

I Next.js er filstrukturen inni `app`-mappen direkte koblet til URL-strukturen. Enhver mappe med en `page.tsx`-fil representerer en side i applikasjonen, og URL-en til siden er basert på mappestrukturen. For eksempel:

| Fil                              | URL                                       |
| -------------------------------- | ----------------------------------------- |
| `app/spillere/page.tsx`          | `http://localhost:3000/spillere`          |
| `app/kamper/page.tsx`            | `http://localhost:3000/kamper`            |
| `app/kamper/sommerliga/page.tsx` | `http://localhost:3000/kamper/sommerliga` |

Dersom du ønsker å lage en side som tar hensyn til en variabel del av URL-en, som for eksempel en spiller-ID, kan du bruke firkantparenteser i mappenavnet.
Dette forteller Next.js at dette segmentet av URL-en er dynamisk og kan inneholde forskjellige verdier. For eksempel:

| Fil                            | URL                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| `app/spillere/[id]/page.tsx`   | `http://localhost:3000/spillere/1`, `http://localhost:3000/spillere/2`, osv.               |
| `app/kamper/[kampNr]/page.tsx` | `http://localhost:3000/kamper/1`, `http://localhost:3000/kamper/2`, osv.                   |
| `app/kamper/[liga]/page.tsx`   | `http://localhost:3000/kamper/sommerliga`, `http://localhost:3000/kamper/vinterliga`, osv. |

I dette tilfellet vil tekststrengen du putter inni klammeparaesene (`id`, `kampNr`, `liga`) være tilgjengelig som en variabel i `page.tsx`-filen gjennom `params`-objektet som Next.js automatisk sender inn i siden.

> **OBS:** Next.js tolker visse filnavn i `app`-mappen på en spesiell måte. `page.tsx` er ett av dem, men det finnes flere: `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` og `template.tsx`. Disse er reservert for Next.js og bør ikke brukes som navn på egne komponenter.

For å hjelpe du i gang har vi allerede laget en ferdig fil på `src/app/spillere/[id]/page.tsx`. Naviger til `http://localhost:3000/spillere/1`, `http://localhost:3000/spillere/2`, `http://localhost:3000/spillere/3` i nettleseren. Ser du hvordan tittelen endres basert på `id`-verdien i URL-en?

#### Oppgave 2b – Utforsk API-et i API-dokumentasjonen

Før vi skriver kode, la oss utforske hva API-et tilbyr. Klikk på **API-dokumentasjon** i sidemenyen.

Her finner du en oversikt over alle tilgjengelige API-ruter. Klikk på ruten `GET /api/spillere/{id}` og deretter på **"Try it out"**. Skriv inn en spiller-ID (f.eks. `1`) og klikk **"Execute"**. Du vil se nøyaktig hva API-et returnerer, og dette er dataen du skal bruke på detaljsiden.

På jobb vil du bruke API-dokumentasjon til å forstå hva som er tilgjengelig og hvordan dataen ser ut, før du begynner å kode. Gjør deg kjent med det!

#### Oppgave 2c – Hent og vis spillerdata

Nå som du vet hvordan API-et ser ut, er det på tide å bruke det i koden.

I oppgave 1 brukte vi fetch til å hente alle spillere. Nå skal vi hente én spiller basert på `id`-en i URL-en.

Prøv å hente spilleren fra API-et og vis detaljene på siden!

**HINT**: For å legge inn en variabel i en streng i JavaScript/TypeScript, kan du bruke template literals, som er tekst omgitt av backticks (` `) i stedet for vanlige anførselstegn. Inne i en template literal kan du sette inn variabler ved å bruke `${variabel}`-syntaksen. For eksempel:

```tsx
const id = 1;
const url = `/spiller/${id}`; // Resultatet blir "/spiller/1"
```

#### Oppgave 2d – Vis spillerens bilde

Hver spiller har et bilde tilgjengelig på `/spiller/{id}.png`. Legg til et bilde av spilleren øverst på detaljsiden.

Alle bilder på nettsider bør ha en `alt`-attributt. `alt`-teksten er en tekstlig beskrivelse av bildet som brukes av skjermlesere (for blinde og svaksynte), og vises dersom bildet ikke kan lastes:

```tsx
<img src="/spiller/1.png" alt="Profilbilde av Erik Solberg" />
```

Tenk på hva `alt`-teksten bør si: hva _formidler_ bildet? For et profilbilde er navnet på personen den viktigste informasjonen. Husk at du nå har tilgang til spillerens navn fra API-et!

#### Oppgave 2e – Lenk fra spillerlisten

Detaljsiden er fin, men ingen kommer seg dit uten en lenke! I Next.js bruker vi den ferdiglagde `<Link>`-komponenten fra `next/link` for å navigere mellom sider:

```tsx
import Link from "next/link";

<Link href="/spillere/1">Gå til Erik Solberg</Link>;
```

`<Link>` er på mange måter bare en vanlig `<a>`-tag, men den har noen fordeler som gjør navigasjonen raskere, blant annet "pre-fetching". Prefetching er at den begynner å laste inn siden den peker på, før du navigerer dit, slik at navigeringen føles raskere.

Gå til `spiller-card.tsx` og legg til en `<Link>` rundt kortet, slik at man kan klikke på et spillerkort og komme til detaljsiden for den spilleren.

---

## Oppgave 3 – Opprett spiller

**Hva du skal lære:** HTML-skjemaer i React, `useState` for skjematilstand, kontrollerte inputs, sende data til et API med `fetch`, og tilgjengelighet i skjemaer.

Nå som vi kan se alle spillerne, er det på tide å la brukeren legge til nye! I denne oppgaven skal du bygge et skjema for å opprette en ny spiller.

#### Server components og client components

Hittil har vi jobbet med **server components** — komponenter som kjøres på serveren og sender ferdig HTML til nettleseren. De er enkle og raske, men de kan ikke reagere på brukerinteraksjon som klikk eller tastetrykk.

For å håndtere interaksjon trenger vi en **client component** — en komponent som kjøres i nettleseren. Client components markeres med `"use client"` øverst i filen:

```tsx
"use client";

import { useState } from "react";
```

Uten `"use client"` kan du ikke bruke `useState`-hooken, event handlers som `onClick` eller `onChange`, eller andre ting som avhenger av at koden kjører i nettleseren. Et skjema der brukeren fyller inn data er et typisk eksempel på noe som må være en client component. Du kommer til å lære mer om hooks i oppgave 4.

Åpne filen `src/app/spillere/opprett-spiller-skjema.tsx`. Du vil se at den allerede har `"use client"` øverst og ett inputfelt for navn. Oppgaven din blir å fullføre skjemaet, men først skal du få en rask innføring i hvordan å bruke useState og event-handlers brukes i skjemaer.

#### useState og destrukturering

`useState` er en funksjon som returnerer en liste med én variabel og én funksjon for å oppdatere den. Vi henter ut begge ved hjelp av **destrukturering**:

```tsx
const [navn, setNavn] = useState("");
//     ^^^^  ^^^^^^^
//     |     Funksjonen som oppdaterer verdien
//     Den nåværende verdien
```

Dette er det samme som å skrive:

```tsx
const state = useState("");
const navn = state[0];
const setNavn = state[1];
```

Destrukturering er bare en snarvei for å hente ut elementer fra en liste. Navnene `navn` og `setNavn` velger vi selv, men konvensjonen er å kalle dem `noe` og `setNoe`.

#### Skjemaer og kontrollerte inputs

I React er det vanlig å bruke det vi kaller **kontrollerte inputs** — det vil si at React holder styr på hva brukeren har skrevet, ikke nettleseren. Vi gjør dette med `useState`:

```tsx
const [navn, setNavn] = useState("");

<input value={navn} onChange={(e) => setNavn(e.target.value)} />;
```

Her speiler `navn` alltid det som er i inputfeltet. Når brukeren skriver, kjøres `onChange`, som oppdaterer state, som oppdaterer feltet. Det er en liten sirkel, men det gir deg full kontroll.

Når vi har flere felter, er det praktisk å samle dem i ett objekt:

```tsx
const [skjema, setSkjema] = useState({
  navn: "",
  avdeling: "",
});

<input
  value={skjema.navn}
  onChange={(e) => setSkjema({ ...skjema, navn: e.target.value })}
/>;
```

`{ ...skjema, navn: e.target.value }` betyr: «ta alle verdiene fra det gamle skjema-objektet, men bytt ut `navn` med den nye verdien». Dette kalles en **spread** og er en vanlig måte å oppdatere objekter i React på.

#### Tilgjengelighet: label og id

For at skjemaet skal fungere godt for alle — inkludert brukere med skjermleser — er det viktig å knytte hvert inputfelt til en `<label>` med `htmlFor` og `id`:

```tsx
<label htmlFor="navn">Navn</label>
<input id="navn" ... />
```

Dette gjør at klikk på etiketten fokuserer feltet, og at skjermlesere leser opp hva feltet er for.

---

#### Oppgave 3a – Legg til lenke til opprett-siden

Skjemaet bor på sin egen side: `/spillere/opprett`. Legg til en `<Link>` på spillersiden som tar brukeren dit, slik at de enkelt kan navigere til skjemaet.

Du har brukt `<Link>` fra `next/link` i oppgave 2 — bruk det samme mønsteret her.

<details class="losningsforslag">
<summary>Løsningsforslag 3a</summary>

```tsx
import Link from "next/link";

<Link
  href="/spillere/opprett"
  className="bg-twoday-amber rounded px-4 py-2 font-semibold"
>
  Opprett spiller
</Link>;
```

</details>

#### Oppgave 3b – Legg til inputfeltene

Skjemaet har allerede et felt for `navn`. Legg til felter for `avdeling`, `kull` og `posisjon`. Bruk samme mønster som `navn`-feltet.

Husk å:

- Gi hvert felt en `label` med `htmlFor`
- Gi hvert `input` et `id` som matcher `htmlFor`
- Bruke `required` på felt som er påkrevde

`required` er et HTML-attributt som gjør at nettleseren nekter å sende skjemaet hvis feltet er tomt. Brukeren får en feilmelding direkte i nettleseren uten at du trenger å skrive noe ekstra kode.

Legg merke til at dette henger sammen med TypeScript-typen: Felt med `?` i `SkjemaData` kan være udefinerte. De er dermed valgfrie, og skal ikke ha `required`.

<details class="hint">
<summary>Hint</summary>

Se på `Spiller`-typen i `lib/types.ts` for å se hvilke felter en spiller har.

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 3b</summary>

Legg til ett felt per egenskap. Her er `avdeling` som eksempel — kopier mønsteret for `kull` og `posisjon`:

```tsx
<div className="flex flex-col gap-1">
  <label htmlFor="avdeling">Avdeling</label>
  <input
    id="avdeling"
    type="text"
    value={skjema.avdeling}
    onChange={(e) => setSkjema({ ...skjema, avdeling: e.target.value })}
    className="rounded border px-3 py-2"
    required
  />
</div>
```

</details>

#### Oppgave 3c – Oppdater `SkjemaData`-typen og startverdiene

Øverst i filen er det definert en type `SkjemaData` og en startverdi for `useState`. Disse inneholder foreløpig bare `navn`. Legg til de andre feltene her også.

<details class="hint">
<summary>Hint</summary>

TypeScript vil gi deg rød understrek hvis du glemmer et felt. Hvis du hoverer over feilmeldingene kan du se hva som forventes.

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 3c</summary>

Oppdater typen og startverdiene øverst i filen:

```tsx
type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
};

const [skjema, setSkjema] = useState<SkjemaData>({
  navn: "",
  avdeling: "",
  kull: "",
  posisjon: "",
});
```

</details>

#### Oppgave 3d – Legg til valgfrie felter

Spillere kan også ha `styrke` og `svakhet`, men disse er valgfrie. Legg til inputfelter for dem uten `required`.

Husk å også legge dem til i `SkjemaData`-typen. Valgfrie felt markeres med `?` i TypeScript:

```ts
type SkjemaData = {
  navn: string;
  styrke?: string;
};
```

<details class="losningsforslag">
<summary>Løsningsforslag 3d</summary>

Legg til `styrke` og `svakhet` i typen:

```tsx
type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
  styrke?: string;
  svakhet?: string;
};
```

Og startverdiene:

```tsx
const [skjema, setSkjema] = useState<SkjemaData>({
  navn: "",
  avdeling: "",
  kull: "",
  posisjon: "",
  styrke: "",
  svakhet: "",
});
```

Legg deretter til feltene i skjemaet uten `required`:

```tsx
<div className="flex flex-col gap-1">
  <label htmlFor="styrke">Styrke (valgfritt)</label>
  <input
    id="styrke"
    type="text"
    value={skjema.styrke}
    onChange={(e) => setSkjema({ ...skjema, styrke: e.target.value })}
    className="rounded border px-3 py-2"
  />
</div>

<div className="flex flex-col gap-1">
  <label htmlFor="svakhet">Svakhet (valgfritt)</label>
  <input
    id="svakhet"
    type="text"
    value={skjema.svakhet}
    onChange={(e) => setSkjema({ ...skjema, svakhet: e.target.value })}
    className="rounded border px-3 py-2"
  />
</div>
```

</details>

#### Oppgave 3e – Naviger til den nye spillerens detaljside

Nå som spilleren er opprettet, bør brukeren sendes videre til detaljsiden for den nye spilleren. APIet returnerer den opprettede spilleren som JSON, og vi kan bruke `id`-en til å navigere dit.

Bruk `router.push()` i stedet for `router.refresh()` for å navigere til riktig side etter at skjemaet er sendt inn.

<details class="hint">
<summary>Hint</summary>

Husk å lese JSON-svaret fra APIet for å få tak i `id`-en til den nye spilleren:

```tsx
const spiller = await response.json();
router.push(`/spillere/${spiller.id}`);
```

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 3e</summary>

```tsx
async function handleSubmit(data: SkjemaData) {
  const response = await fetch("http://localhost:3000/api/spillere", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const spiller = await response.json();
    router.push(`/spillere/${spiller.id}`);
  }
}
```

</details>

---

## Oppgave 4 – Hooks i praksis

**Hva du skal lære:** Hva en hook er og reglene for hooks, `useState` til interaktiv tilstand, `useEffect` til sideeffekter, og `useRef` til direkte DOM-tilgang.

Hooks er spesielle funksjoner i React som gir komponentene dine tilgang til tilstand og side effects — det vil si alt som skjer utenfor Reacts renderingssyklus, som å lese fra localStorage, hente data fra en API, eller manipulere DOM-en direkte.

Det finnes et par regler for når hooks kan brukes:

- Hooks skal alltid kalles øverst i komponenten — aldri inne i if-setninger eller løkker
- Hooks kan bare brukes i React-komponenter (eller i egne custom hooks)

I denne oppgaven skal du legge til et søkefelt på spillersiden. Underveis vil du bruke alle tre hookene til forskjellige ting — og det er poenget, de løser ulike problemer:

| Hook        | Brukes til                                                                              |
| ----------- | --------------------------------------------------------------------------------------- |
| `useState`  | Holde på en verdi som kan endres, og re-rendre komponenten når den gjør det             |
| `useEffect` | Kjøre kode som reaksjon på at noe har endret seg, eller én gang når komponenten mountes |
| `useRef`    | Holde en referanse til et DOM-element, uten å trigge re-render                          |

#### Oppgave 4a – Legg til et søkefelt med `useState`

Opprett en ny fil `src/app/spillere/spiller-sok.tsx`. Dette blir en client component, siden den trenger interaktivitet — husk `"use client"` øverst.

Komponenten skal ha:

- Et `<input>`-felt der brukeren kan skrive
- En `useState` som holder søketeksten
- En `onChange` på inputen som oppdaterer staten

```tsx
const [sok, setSok] = useState("");
```

Importer og vis `SpillerSok` i `page.tsx`. Foreløpig trenger du ikke koble den til spillerlisten — det kommer i neste steg.

<details class="losningsforslag">
<summary>Løsningsforslag 4a</summary>

```tsx
"use client";

import { useState } from "react";

type Props = {
  sok: string;
  setSok: (verdi: string) => void;
};

export default function SpillerSok({ sok, setSok }: Props) {
  return (
    <input
      value={sok}
      onChange={(e) => setSok(e.target.value)}
      placeholder="Søk etter spiller..."
      className="rounded border px-3 py-2"
    />
  );
}
```

</details>

#### Oppgave 4b – Filtrer spillerlisten

Nå skal søket faktisk gjøre noe. Søketeksten må brukes til å filtrere hvilke spillere som vises — men `page.tsx` er en server component og kan ikke ha `useState`. Løsningen er en ny client component som tar imot hele spillerlisten som prop, håndterer søkestate selv, og viser de filtrerte resultatene.

Vi har laget en halvferdig fil til deg: `src/app/spillere/spiller-sok-og-liste.tsx`. Åpne den og fullfør de tre kommenterte stegene.

Når den er ferdig, erstatt det du la til i `page.tsx` i forrige oppgave med:

```tsx
<SpillerSokOgListe spillere={spillere} />
```

Husk også å oppdatere `SpillerSok` til å ta imot `sok` og `setSok` som props i stedet for å ha sin egen `useState`.

<details class="hint">
<summary>Hint</summary>

Filtreringen kan gjøres slik:

```tsx
const filtrerte = spillere.filter((spiller) =>
  spiller.navn.toLowerCase().includes(sok.toLowerCase())
);
```

Når `sok` og `setSok` flyttes ut av `SpillerSok` og inn i `SpillerSokOgListe`, trenger `SpillerSok` en ny `Props`-type:

```tsx
type Props = {
  sok: string;
  setSok: (verdi: string) => void;
};
```

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 4b</summary>

`spiller-sok-og-liste.tsx`:

```tsx
"use client";

import { Spiller } from "@/lib/types";
import { useState } from "react";
import SpillereListe from "./spillere-liste";
import SpillerSok from "./spiller-sok";

type Props = {
  spillere: Spiller[];
};

export default function SpillerSokOgListe({ spillere }: Props) {
  const [sok, setSok] = useState("");

  const filtrerte = spillere.filter((spiller) =>
    spiller.navn.toLowerCase().includes(sok.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <SpillerSok sok={sok} setSok={setSok} />
      <SpillereListe spillere={filtrerte} />
    </div>
  );
}
```

</details>

#### Oppgave 4c – Husk søket med `useEffect`

Det er litt irriterende at søket forsvinner hver gang du laster siden på nytt. Vi kan bruke `localStorage` til å huske det.

`useEffect` brukes til å synkronisere React-tilstand med noe utenfor React — som `localStorage`, en ekstern API, eller DOM-en. Syntaksen ser slik ut:

```tsx
useEffect(() => {
  // Kjøres etter render
}, [avhengigheter]); // Kjøres på nytt når avhengighetene endres
```

Bruk `useEffect` til å lagre søketeksten i `localStorage` hver gang den endres:

```tsx
useEffect(() => {
  localStorage.setItem("spillerSok", sok);
}, [sok]);
```

Og les den ut som startverdi i `useState`, slik at søket er gjenopprettet neste gang siden lastes:

```tsx
const [sok, setSok] = useState(() => localStorage.getItem("spillerSok") ?? "");
```

<details class="losningsforslag">
<summary>Løsningsforslag 4c</summary>

Legg til disse to linjene i `SpillerSokOgListe`:

```tsx
import { useState, useEffect } from "react";

const [sok, setSok] = useState(() => localStorage.getItem("spillerSok") ?? "");

useEffect(() => {
  localStorage.setItem("spillerSok", sok);
}, [sok]);
```

</details>

#### Oppgave 4d – Auto-fokus med `useRef`

`useRef` gir deg en direkte referanse til et DOM-element — uten å trigge en re-render. Det brukes når du trenger å gjøre noe med selve elementet i nettleseren, som å fokusere det.

Legg til auto-fokus på søkefeltet, slik at det er klart til bruk med en gang siden lastes:

```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []); // Tom avhengighetsliste = kjør én gang, etter første render

// På input-elementet:
<input ref={inputRef} ... />
```

`?.` betyr "gjør dette bare hvis verdien ikke er `null`" — trygg tilgang på et element som kanskje ikke finnes ennå.

<details class="losningsforslag">
<summary>Løsningsforslag 4d</summary>

Legg til disse linjene i `SpillerSok`:

```tsx
import { useState, useEffect, useRef } from "react";

const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);
```

Og legg til `ref`-attributtet på `<input>`-elementet:

```tsx
<input ref={inputRef} ... />
```

</details>

---

## Oppgave 5 – Opprett spiller med React Hook Form

**Hva du skal lære:** Installere og bruke en tredjeparts React-pakke, fordelen med `react-hook-form` over manuell state, og skjemavalidering.

I oppgave 3 bygde vi et skjema med manuell `useState` for hvert felt. Det fungerer, men det er mye kode å vedlikeholde, og jo flere felter, jo mer tungvint blir det. En vanlig løsning i frontend-verdenen er å bruke et skjemabibliotek. Vi skal bruke **React Hook Form**, som er en av de mest utbredte løsningene i React-prosjekter i dag.

React Hook Form er ikke en del av React selv. Det er en separat pakke vi må installere. Dette er et mønster du vil møte hele tiden på prosjekt: du finner et bibliotek som løser problemet du har, og du legger det til i prosjektet.

#### Oppgave 5a: Installer React Hook Form

Pakker installeres med pnpm i terminalen. Åpne terminalen i VS Code og kjør:

```bash
pnpm add react-hook-form
```

`pnpm add` henter pakken fra internett og legger den til i `package.json`. Etter at kommandoen er ferdig kan du bekrefte at det gikk bra ved å se at `react-hook-form` dukker opp under `dependencies` i `package.json`.

#### Oppgave 5b: Ta i bruk `useForm`

React Hook Form gir oss en hook som heter `useForm`. Den returnerer alt vi trenger for å håndtere skjemaet: registrering av felt, innsending og feilhåndtering.

Naviger til `src/app/spillere/opprett/opprett-spiller-skjema.tsx`. Filen har et skjema med manuell `useState`. Vi skal nå skrive den om til å bruke `useForm`.

Importer `useForm` og kall den øverst i komponenten. Legg også til de resterende feltene i `SkjemaData`-typen:

```tsx
import { useForm } from "react-hook-form";

type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
  styrke?: string;
  svakhet?: string;
};

const form = useForm<SkjemaData>();
```

Vi lagrer resultatet i en variabel vi kaller `form`. Da er det tydelig at `form.register`, `form.handleSubmit` og så videre alle kommer fra React Hook Form.

Du kan nå fjerne `useState`-importen og `skjema`-konstanten. React Hook Form holder styr på feltene for deg.

#### Oppgave 5c: Konverter ett felt

Med `useState` koblet vi hvert felt til state med `value` og `onChange`. Med React Hook Form sprer vi `form.register()` direkte inn i inputet i stedet:

```tsx
<input {...form.register("navn", { required: "Navn er påkrevd" })} />
```

`{ required: "Navn er påkrevd" }` er en valideringsregel. Strengen brukes som feilmelding hvis feltet er tomt når skjemaet sendes inn.

Konverter `navn`-feltet til å bruke `form.register`. Fjern `value`, `onChange` og `required`-attributtene som du ikke lenger trenger.

#### Oppgave 5d: Bytt til shadcn-komponenter

Prosjektet har ferdiglagde komponenter for skjemaelementer som gir deg konsistent styling uten at du trenger å skrive CSS selv. Bytt ut `<label>` og `<input>` i `navn`-feltet med `Label`, `Input` og `FieldError` fra komponentbiblioteket:

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";

<Label htmlFor="navn">Navn</Label>
<Input id="navn" {...form.register("navn", { required: "Navn er påkrevd" })} />
<FieldError errors={[form.formState.errors.navn]} />
```

`FieldError` tar inn en liste med feilobjekter og viser dem for deg. Den viser ingenting når det ikke er noen feil, så du trenger ingen ekstra `if`-sjekk.

Nå har du sett det fulle mønsteret for ett felt: `useForm`, `form.register`, og shadcn-komponenter med feilvisning. Gjenta det for alle de resterende feltene.

#### Oppgave 5e: Fullfør skjemaet

Du har nå alle brikkene. Konverter de resterende feltene (`avdeling`, `kull`, `posisjon`, `styrke`, `svakhet`) til samme mønster. Husk at valgfrie felt ikke trenger valideringsregler.

Til slutt må du oppdatere `onSubmit` til å bruke `form.handleSubmit`. Lag en egen funksjon for logikken og send den inn:

```tsx
async function opprettSpiller(data: SkjemaData) {
  // fetch-kallet og navigeringen hit
}

<form onSubmit={form.handleSubmit(opprettSpiller)}>
```

`form.handleSubmit` kjører validering først og kaller `opprettSpiller` bare hvis alle feltene er gyldige. Flytt `fetch`-kallet og navigeringen inn i `opprettSpiller`, og fjern den gamle `handleSubmit`-funksjonen.

<details class="losningsforslag">
<summary>Løsningsforslag 5b-5e</summary>

```tsx
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";

type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
  styrke?: string;
  svakhet?: string;
};

export default function OpprettSpillerSkjema() {
  const router = useRouter();
  const form = useForm<SkjemaData>();

  async function opprettSpiller(data: SkjemaData) {
    const response = await fetch("http://localhost:3000/api/spillere", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const spiller = await response.json();
      router.push(`/spillere/${spiller.id}`);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(opprettSpiller)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="navn">Navn</Label>
        <Input
          id="navn"
          {...form.register("navn", { required: "Navn er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.navn]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="avdeling">Avdeling</Label>
        <Input
          id="avdeling"
          {...form.register("avdeling", { required: "Avdeling er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.avdeling]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="kull">Kull</Label>
        <Input
          id="kull"
          {...form.register("kull", { required: "Kull er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.kull]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="posisjon">Posisjon</Label>
        <Input
          id="posisjon"
          {...form.register("posisjon", { required: "Posisjon er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.posisjon]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="styrke">Styrke (valgfritt)</Label>
        <Input id="styrke" {...form.register("styrke")} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="svakhet">Svakhet (valgfritt)</Label>
        <Input id="svakhet" {...form.register("svakhet")} />
      </div>

      <Button type="submit" className="bg-twoday-amber">
        Opprett spiller
      </Button>
    </form>
  );
}
```

</details>

#### Oppgave 5f: Trekk ut en gjenbrukbar feltkomponent

Se på løsningsforslaget for 5e. Hvert felt følger nøyaktig samme mønster: en `Label`, en `Input` med `form.register`, og en `FieldError`. Det er bare `id`, `label` og feilmeldingsteksten som varierer.

Dette er et klassisk tegn på at koden er klar til å trekkes ut i en egen komponent. Lag en `SkjemaFelt`-komponent øverst i filen som tar inn disse verdiene som props:

```tsx
import { UseFormReturn, Path } from "react-hook-form";

type SkjemaFeltProps = {
  id: Path<SkjemaData>;
  label: string;
  isRequired?: string;
  form: UseFormReturn<SkjemaData>;
};

function SkjemaFelt({ id, label, isRequired, form }: SkjemaFeltProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...form.register(id, { required: isRequired })} />
      <FieldError errors={[form.formState.errors[id]]} />
    </div>
  );
}
```

`Path<SkjemaData>` er en type fra React Hook Form som beskriver gyldige feltnavn i skjemaet — altså `"navn" | "avdeling" | "kull" | "posisjon" | "styrke" | "svakhet"`. Vi bruker den fordi det er nøyaktig det `form.register` forventer. Med `string` ville TypeScript klage på `form.register(id, ...)`. Med `Path<SkjemaData>` får du i tillegg hjelp av TypeScript til å oppdage skrivefeil — sender du inn `"nvan"` vil du få en feilmelding med én gang.

Hvis `isRequired` ikke er satt, vil `{ required: undefined }` sendes inn, noe som er det samme som ingen valideringsregel.

Bruk `SkjemaFelt` i stedet for de seks feltblokkene i skjemaet. Valgfrie felt sender du inn uten `isRequired`-prop.

<details class="losningsforslag">
<summary>Løsningsforslag 5f</summary>

```tsx
"use client";

import { useForm, UseFormReturn, Path } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";

type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
  styrke?: string;
  svakhet?: string;
};

type SkjemaFeltProps = {
  id: Path<SkjemaData>;
  label: string;
  isRequired?: string;
  form: UseFormReturn<SkjemaData>;
};

function SkjemaFelt({ id, label, isRequired, form }: SkjemaFeltProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...form.register(id, { required: isRequired })} />
      <FieldError errors={[form.formState.errors[id]]} />
    </div>
  );
}

export default function OpprettSpillerSkjema() {
  const router = useRouter();
  const form = useForm<SkjemaData>();

  async function opprettSpiller(data: SkjemaData) {
    const response = await fetch("http://localhost:3000/api/spillere", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const spiller = await response.json();
      router.push(`/spillere/${spiller.id}`);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(opprettSpiller)}
      className="flex flex-col gap-4"
    >
      <SkjemaFelt
        id="navn"
        label="Navn"
        isRequired="Navn er påkrevd"
        form={form}
      />
      <SkjemaFelt
        id="avdeling"
        label="Avdeling"
        isRequired="Avdeling er påkrevd"
        form={form}
      />
      <SkjemaFelt
        id="kull"
        label="Kull"
        isRequired="Kull er påkrevd"
        form={form}
      />
      <SkjemaFelt
        id="posisjon"
        label="Posisjon"
        isRequired="Posisjon er påkrevd"
        form={form}
      />
      <SkjemaFelt id="styrke" label="Styrke (valgfritt)" form={form} />
      <SkjemaFelt id="svakhet" label="Svakhet (valgfritt)" form={form} />

      <Button type="submit" className="bg-twoday-amber">
        Opprett spiller
      </Button>
    </form>
  );
}
```

</details>

#### Oppgave 5g: Håndter serverfeil

React Hook Form validerer feltene før skjemaet sendes inn, men serveren kan fortsatt avvise forespørselen. Det kan skje hvis serveren har egne valideringsregler, om noe går galt i databasen, eller om nettverket feiler. I dag ignorerer koden stille om `response.ok` er false. Det betyr at brukeren ikke får noe tilbakemelding og ikke vet hva som gikk galt.

React Hook Form har et eget konsept for dette: en `"root"`-feil. Den er ikke knyttet til et bestemt felt, men til skjemaet som helhet:

```tsx
if (!response.ok) {
  form.setError("root", { message: "Noe gikk galt. Prøv igjen." });
  return;
}
```

Feilmeldingen vises med `form.formState.errors.root` på samme måte som feltfeil:

```tsx
<FieldError errors={[form.formState.errors.root]} />
```

Legg til feilhåndtering i `opprettSpiller` og vis root-feilen rett over submit-knappen.

For å teste at det fungerer, kan du midlertidig endre URL-en i `fetch`-kallet til noe som ikke finnes:

```tsx
const response = await fetch("http://localhost:3000/api/finnes-ikke", {
```

Send inn skjemaet og sjekk at feilmeldingen vises. Husk å bytte URL-en tilbake etterpå.

<details class="losningsforslag">
<summary>Løsningsforslag 5g</summary>

Oppdater `opprettSpiller`:

```tsx
async function opprettSpiller(data: SkjemaData) {
  const response = await fetch("http://localhost:3000/api/spillere", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    form.setError("root", { message: "Noe gikk galt. Prøv igjen." });
    return;
  }

  const spiller = await response.json();
  router.push(`/spillere/${spiller.id}`);
}
```

Legg til visning av root-feilen rett over submit-knappen:

```tsx
<FieldError errors={[form.formState.errors.root]} />
<Button type="submit" className="bg-twoday-amber">
  Opprett spiller
</Button>
```

</details>

---

## Oppgave 6 – Rediger spiller

**Hva du skal lære:** Gjenbruke komponenter, bruke en dialog/modal, forhåndsutfylle skjema med eksisterende data, sende PUT-kall til API, og introduksjon til React Context med `FormProvider` og `useFormContext`.

I oppgave 5 bygde vi et skjema for å opprette spillere. Nå skal vi bygge et skjema for å redigere dem. Skjemaet skal vises i en dialog (modal) på detaljsiden, og feltene skal være forhåndsutfylt med spillerens eksisterende data.

#### Oppgave 6a – Lag dialogskallet i `rediger-spiller-dialog.tsx`

Opprett filen `src/app/spillere/[id]/components/rediger-spiller-dialog.tsx`. Foreløpig skal den bare inneholde selve dialog-strukturen med en trigger-knapp og et tomt innhold — skjemaet legger vi til i oppgave 6d.

En dialog i shadcn består av tre deler:

- `Dialog` — container som holder på åpen/lukket-tilstanden
- `DialogTrigger` — elementet som åpner dialogen når man klikker
- `DialogContent` — innholdet som vises i selve dialogvinduet

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button className="bg-twoday-amber">Rediger</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Rediger spiller</DialogTitle>
    </DialogHeader>
    <p>Skjemaet kommer her.</p>
  </DialogContent>
</Dialog>;
```

`asChild` på `DialogTrigger` gjør at `Button` du skriver inni overtar ansvaret for å åpne dialogen, men beholder sin egen styling. Uten `asChild` ville `DialogTrigger` ha wrappert knappen din i et ekstra element, noe som kan gi uventet oppførsel og gjøre det vanskeligere å style.

<details class="losningsforslag">
<summary>Løsningsforslag 6b</summary>

```tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spiller } from "@/lib/types";

type Props = {
  spiller: Spiller;
};

export default function RedigerSpillerDialog({ spiller }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-twoday-amber">Rediger</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger {spiller.navn}</DialogTitle>
        </DialogHeader>
        <p>Skjemaet kommer her.</p>
      </DialogContent>
    </Dialog>
  );
}
```

</details>

#### Oppgave 6b – Vis dialogen på detaljsiden

Gå til `src/app/spillere/[id]/page.tsx`. Importer `RedigerSpillerDialog` og plasser den på siden slik at du kan klikke deg inn i dialogen mens du jobber videre.

`RedigerSpillerDialog` trenger `spiller` som prop. Husk at du allerede henter spilleren fra API-et på denne siden.

<details class="losningsforslag">
<summary>Løsningsforslag 6c</summary>

```tsx
import { Spiller } from "@/lib/types";
import RedigerSpillerDialog from "./components/rediger-spiller-dialog";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SpillerPage({ params }: Props) {
  const { id } = await params;

  const result = await fetch(`http://localhost:3000/api/spillere/${id}`);
  const spiller: Spiller = await result.json();

  return (
    <div className="max-w-2xl p-8">
      <img src={`/spiller/${id}.png`} alt={`Profilbilde av ${spiller.navn}`} />
      <h1 className="text-3xl font-bold">{spiller.navn}</h1>
      <p>{spiller.avdeling}</p>
      <p>{spiller.posisjon}</p>
      <RedigerSpillerDialog spiller={spiller} />
    </div>
  );
}
```

</details>

#### Oppgave 6c – Bygg redigeringsskjemaet

#### Prop-drilling og React Context

I oppgave 5 lagde du en `SkjemaFelt`-komponent som tok inn `form` som prop. Det fungerte bra fordi `form` bare trengte å gå ett nivå ned. Men hva skjer hvis du har en komponent i en komponent inni enda en komponent og alle trenger tilgang til `form`? Da må du sende den som prop gjennom hvert nivå på veien. Det kalles **prop-drilling**, og det gjør koden vanskeligere å lese og vedlikeholde.

**React Context** løser dette. Det er en mekanisme der du legger en verdi inn i en «kontainer» (en provider) høyt oppe i komponenttreet, og deretter kan alle komponenter lenger nede lese verdien direkte, uten at den trenger å sendes som prop gjennom hvert ledd.

```
<FormProvider {...form}> ← legger form-objektet i kontekst
  <form>
    <SkjemaFelt />  ← leser form direkte fra kontekst, ingen prop nødvendig
    <SkjemaFelt />
  </form>
</FormProvider>
```

React Hook Form har innebygd støtte for dette gjennom `FormProvider` og `useFormContext`. `FormProvider` er provideren som legger `form`-objektet i kontekst, og `useFormContext()` er hooken som lar deg lese det fra hvilken som helst komponent inni provideren.

Nå skal du erstatte plassholderen i `DialogContent` med et ekte skjema. Legg til følgende i `components/rediger-spiller-dialog.tsx`:

1. En `SkjemaData`-type, identisk med den i `opprett-spiller-skjema.tsx`
2. En `SkjemaFelt`-komponent som bruker `useFormContext()` i stedet for å ta inn `form` som prop
3. En `RedigerSpillerSkjema`-komponent som tar imot `spiller: Spiller` som prop, kaller `useForm` med `defaultValues`, og wrapper innholdet i `FormProvider`

`defaultValues` er en innstilling i `useForm` som setter startverdiene for alle feltene. Når du sender inn spillerobjektet her, vil feltene være forhåndsutfylt med spillerens eksisterende data:

```tsx
const form = useForm<SkjemaData>({
  defaultValues: {
    navn: spiller.navn,
    avdeling: spiller.avdeling,
    // ...
  },
});
```

`FormProvider` wrapper skjemaet og gjør `form`-objektet tilgjengelig for alle komponenter inni. Du sprer hele `form`-objektet inn i `FormProvider` med `{...form}`:

```tsx
import { useForm, useFormContext, FormProvider, Path } from "react-hook-form";

<FormProvider {...form}>
  <form onSubmit={form.handleSubmit(redigerSpiller)}>
    <SkjemaFelt id="navn" label="Navn" required />
  </form>
</FormProvider>;
```

Inne i `SkjemaFelt` kaller du `useFormContext` i stedet for å ta `form` som prop. Vi kan også forenkle props-typen: i stedet for å sende inn feilmeldingsteksten som en streng, sender vi bare `required?: boolean` og konstruerer feilmeldingen fra `label`-proppen.

For å gjøre det bruker vi en **ternary-operator** — en kompakt måte å skrive en if/else på som returnerer en verdi:

```ts
betingelse ? verdi - hvis - sant : verdi - hvis - usant;
```

Det tilsvarer:

```ts
if (betingelse) {
  return verdi - hvis - sant;
} else {
  return verdi - hvis - usant;
}
```

Vi lagrer resultatet i en konstant før vi bruker den, slik at `Input`-linjen forblir leselig:

```tsx
function SkjemaFelt({ id, label, required }: SkjemaFeltProps) {
  const form = useFormContext<SkjemaData>();
  const requiredErrorMessage = required ? `${label} er påkrevd` : undefined;
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        {...form.register(id, { required: requiredErrorMessage })}
      />
      <FieldError errors={[form.formState.errors[id]]} />
    </div>
  );
}
```

<details class="hint">
<summary>Hint</summary>

`SkjemaFeltProps`-typen trenger ikke lenger et `form`-felt:

```tsx
type SkjemaFeltProps = {
  id: Path<SkjemaData>;
  label: string;
  required?: boolean;
};
```

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 6d</summary>

```tsx
"use client";

import { useForm, useFormContext, FormProvider, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spiller } from "@/lib/types";

type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
  styrke?: string;
  svakhet?: string;
};

type SkjemaFeltProps = {
  id: Path<SkjemaData>;
  label: string;
  required?: boolean;
};

function SkjemaFelt({ id, label, required }: SkjemaFeltProps) {
  const form = useFormContext<SkjemaData>();
  const requiredErrorMessage = required ? `${label} er påkrevd` : undefined;
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        {...form.register(id, { required: requiredErrorMessage })}
      />
      <FieldError errors={[form.formState.errors[id]]} />
    </div>
  );
}

type SkjemaProps = {
  spiller: Spiller;
};

function RedigerSpillerSkjema({ spiller }: SkjemaProps) {
  const form = useForm<SkjemaData>({
    defaultValues: {
      navn: spiller.navn,
      avdeling: spiller.avdeling,
      kull: spiller.kull,
      posisjon: spiller.posisjon,
      styrke: spiller.styrke ?? "",
      svakhet: spiller.svakhet ?? "",
    },
  });

  async function redigerSpiller(data: SkjemaData) {
    // Oppgave 6e
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(redigerSpiller)}
        className="flex flex-col gap-4"
      >
        <SkjemaFelt id="navn" label="Navn" required />
        <SkjemaFelt id="avdeling" label="Avdeling" required />
        <SkjemaFelt id="kull" label="Kull" required />
        <SkjemaFelt id="posisjon" label="Posisjon" required />
        <SkjemaFelt id="styrke" label="Styrke (valgfritt)" />
        <SkjemaFelt id="svakhet" label="Svakhet (valgfritt)" />

        <FieldError errors={[form.formState.errors.root]} />
        <Button type="submit" className="bg-twoday-amber">
          Lagre endringer
        </Button>
      </form>
    </FormProvider>
  );
}

type Props = {
  spiller: Spiller;
};

export default function RedigerSpillerDialog({ spiller }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-twoday-amber">Rediger</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger {spiller.navn}</DialogTitle>
        </DialogHeader>
        <RedigerSpillerSkjema spiller={spiller} />
      </DialogContent>
    </Dialog>
  );
}
```

</details>

#### Oppgave 6d – Utforsk PUT-endepunktet i API-dokumentasjonen

Åpne **API-dokumentasjon** i sidemenyen. Vi skal bruke to endepunkter i denne oppgaven:

- `POST /api/spillere`, opprett en ny spiller (du kjenner denne fra oppgave 3)
- `PUT /api/spillere/{id}`, oppdater en eksisterende spiller

`PUT` brukes når du vil gjøre endringer i en eksisterende ressurs.

Prøv `PUT`-endepunktet med spiller-id `1`. Fyll inn alle feltene og sjekk at endringene ble gjennomført ved å sjekke spiller-siden.

#### Oppgave 6e – Send PUT til API

Fyll inn `redigerSpiller`-funksjonen. Den ligner på `opprettSpiller` fra oppgave 5, men med to forskjeller:

- Metoden er `"PUT"` i stedet for `"POST"`
- URL-en inkluderer spillerens id: `/api/spillere/${spiller.id}`

Etter vellykket oppdatering bruker du `router.refresh()` for å laste inn oppdatert data fra serveren. `router.refresh()` henter siden på nytt uten å navigere bort, noe som passer perfekt her siden vi er på detaljsiden og bare vil oppdatere innholdet.

Husk også å håndtere serverfeil med `form.setError("root", ...)`, akkurat som i oppgave 5g.

<details class="hint">
<summary>Hint</summary>

Husk å legge til `useRouter` fra `next/navigation` og kalle `router.refresh()` etter at PUT-kallet er vellykket.

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 6e</summary>

Legg til `useRouter`-importen og oppdater `redigerSpiller`:

```tsx
import { useRouter } from "next/navigation";

async function redigerSpiller(data: SkjemaData) {
  const response = await fetch(
    `http://localhost:3000/api/spillere/${spiller.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    form.setError("root", { message: "Noe gikk galt. Prøv igjen." });
    return;
  }

  router.refresh();
}
```

</details>

---

## Oppgave 7 – Slett spiller

**Hva du skal lære:** DELETE-kall mot API og bruk av `AlertDialog` for bekreftelse av destruktive handlinger.

I oppgave 6 brukte vi `Dialog` til å vise et redigeringsskjema. Nå skal vi bruke `AlertDialog`, som er designet spesifikt for bekreftelser på handlinger som ikke kan angres. Forskjellen er at `AlertDialog` tvinger brukeren til å ta et aktivt valg, med en tydelig bekreftelsesknapp og en avbryt-knapp. Det er god praksis å alltid be om bekreftelse før man sletter data.

#### Oppgave 7a – Lag `slett-spiller-knapp.tsx`

Opprett filen `src/app/spillere/[id]/components/slett-spiller-knapp.tsx`. Komponenten skal ta inn `spiller` som prop og vise en `AlertDialog` med en bekreftelsesdialog.

`AlertDialog` fra shadcn er satt opp annerledes enn `Dialog`. I stedet for å legge innholdet fritt i `AlertDialogContent`, bruker du ferdige delkomponenter for tittel, beskrivelse og knapper:

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Slett</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
      <AlertDialogDescription>
        Dette vil permanent slette spilleren. Handlingen kan ikke angres.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Avbryt</AlertDialogCancel>
      <AlertDialogAction>Slett</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

`variant="destructive"` på `Button` gir knappen en rød farge som signaliserer at dette er en farlig handling.

`AlertDialogAction` er bekreftelsesknappen. I neste oppgave kobler vi `onClick` på den til et DELETE-kall.

<details class="losningsforslag">
<summary>Løsningsforslag 7a</summary>

```tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spiller } from "@/lib/types";

type Props = {
  spiller: Spiller;
};

export default function SlettSpillerKnapp({ spiller }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Slett</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
          <AlertDialogDescription>
            Dette vil permanent slette {spiller.navn}. Handlingen kan ikke angres.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction>Slett</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

</details>

#### Oppgave 7b – Vis knappen på detaljsiden

Importer `SlettSpillerKnapp` i `src/app/spillere/[id]/page.tsx` og plasser den på siden sammen med `RedigerSpillerDialog`.

<details class="losningsforslag">
<summary>Løsningsforslag 7b</summary>

```tsx
import RedigerSpillerDialog from "./components/rediger-spiller-dialog";
import SlettSpillerKnapp from "./components/slett-spiller-knapp";

// I JSX:
<RedigerSpillerDialog spiller={spiller} />
<SlettSpillerKnapp spiller={spiller} />
```

</details>

#### Oppgave 7c – Send DELETE til API og naviger tilbake

Legg til et DELETE-kall i `SlettSpillerKnapp`. Bruk `onClick` på `AlertDialogAction` til å kalle en funksjon som sender DELETE til API-et og navigerer brukeren tilbake til `/spillere` med `router.push()`.

DELETE-kall trenger ingen `body`, bare metoden:

```tsx
await fetch(`http://localhost:3000/api/spillere/${spiller.id}`, {
  method: "DELETE",
});
```

<details class="losningsforslag">
<summary>Løsningsforslag 7c</summary>

```tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spiller } from "@/lib/types";

type Props = {
  spiller: Spiller;
};

export default function SlettSpillerKnapp({ spiller }: Props) {
  const router = useRouter();

  async function slettSpiller() {
    await fetch(`http://localhost:3000/api/spillere/${spiller.id}`, {
      method: "DELETE",
    });
    router.push("/spillere");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Slett</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
          <AlertDialogDescription>
            Dette vil permanent slette {spiller.navn}. Handlingen kan ikke angres.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction onClick={slettSpiller}>Slett</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

</details>

---

## Oppgave 8 – Filtrering og sortering av spillere (UFERDIG)

**Hva du skal lære:** URL search params til filtrering, forskjellen på lokal og URL-basert tilstand, og server-side sortering.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave 9 – Kamphistorikk (UFERDIG)

Lag en ny side som viser kamphistorikk i en tabell med paginering.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave 10 – Registrere en kamp (UFERDIG)

Lag et skjema for å registrere resultatet av en kamp mellom to spillere.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave 11 – Dashboard (UFERDIG)

Implementer et dashboard i henhold til UX-skissen fra UX-kurset.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – Suspense og loading (UFERDIG)

Legg til `loading.tsx` og `<Suspense>`-grenser med skeleton-komponenter. Gjøres først nøye instruert på spillersiden, deretter selvstendig på kampsiden.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – ELO og plasseringsbadge (UFERDIG)

Beregn ELO-rating basert på kamphistorikk og vis gull/sølv/bronse-badge på spillerkortene.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – Booke kamper (UFERDIG)

Lag et system for å planlegge fremtidige kamper med tid og deltakere.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – Betting på kamper (UFERDIG)

Legg til mulighet for å tippe utfall på planlagte kamper.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – Error og not-found på spillerdetaljer (UFERDIG)

Legg til `not-found.tsx` hvis spilleren ikke finnes, og `error.tsx` for generelle feil.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – Tester med Vitest (UFERDIG)

Noen tester i prosjektet feiler. Få dem til å bli grønne!

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – Innlogging (UFERDIG)

Legg til autentisering og beskytt sider som krever innlogging.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – Filtrering på kamper med debounce (UFERDIG)

Legg til filtrering på kampsiden med debounce for å unngå for mange API-kall.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – Breadcrumbs med usePathname (UFERDIG)

Implementer breadcrumb-navigasjon ved hjelp av `usePathname`.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave – Zod-validering (UFERDIG)

Legg til Zod for skjemavalidering i kombinasjon med `react-hook-form`.

> 🚧 Oppgavetekst skrives her.
