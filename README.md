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

Uten `"use client"` kan du ikke bruke `useState`, event handlers som `onClick` eller `onChange`, eller andre ting som avhenger av at koden kjører i nettleseren. Et skjema der brukeren fyller inn data er et typisk eksempel på noe som må være en client component.

Åpne filen `src/app/spillere/opprett-spiller-skjema.tsx`. Du vil se at den allerede har `"use client"` øverst — og ett inputfelt for navn. Oppgaven din er å fullføre den.

#### useState og destrukturering

`useState` er en funksjon som returnerer to ting på én gang: den nåværende verdien, og en funksjon for å oppdatere den. Vi henter ut begge ved hjelp av **destrukturering**:

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

Destrukturering er bare en snarvei for å hente ut elementer fra en liste. Navnene `navn` og `setNavn` velger vi selv — konvensjonen er å kalle dem `noe` og `setNoe`.

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

#### Oppgave 3a – Legg til de resterende inputfeltene

Skjemaet har allerede et felt for `navn`. Legg til felter for `avdeling`, `kull` og `posisjon`. Bruk samme mønster som `navn`-feltet.

Husk å:

- Gi hvert felt en `label` med `htmlFor`
- Gi hvert `input` et `id` som matcher `htmlFor`
- Bruke `required` på felt som er påkrevde

<details class="hint">
<summary>Hint</summary>

Se på `Spiller`-typen i `lib/types.ts` for å se hvilke felter en spiller har.

</details>

#### Oppgave 3b – Oppdater `SkjemaData`-typen og startverdiene

Øverst i filen er det definert en type `SkjemaData` og en startverdi for `useState`. Disse inneholder foreløpig bare `navn`. Legg til de andre feltene her også.

<details class="hint">
<summary>Hint</summary>

TypeScript vil gi deg rød understrek hvis du glemmer et felt — la feilmeldingene guide deg.

</details>

#### Oppgave 3c – Legg til valgfrie felter

Spillere kan også ha `styrke` og `svakhet` — men disse er valgfrie. Legg til inputfelter for dem uten `required`.

Husk å også legge dem til i `SkjemaData`-typen. Valgfrie felt markeres med `?` i TypeScript:

```ts
type SkjemaData = {
  navn: string;
  styrke?: string;
};
```

#### Oppgave 3d – Send skjemaet til APIet

Når brukeren trykker «Opprett spiller», skal dataen sendes til APIet. Fyll inn `handleSubmit`-funksjonen:

```ts
async function handleSubmit(data: SkjemaData) {
  const response = await fetch("http://localhost:3000/api/spillere", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    // Oppgave 3e: Hva bør skje her?
  }
}
```

`handleSubmit` kalles allerede fra `onSubmit` på `<form>`-elementet — du trenger bare å fylle inn kroppen.

#### Oppgave 3e – Vis skjemaet på spillersiden og oppdater listen etterpå

Importer `OpprettSpillerSkjema` i `page.tsx` og vis det på spillersiden.

Når en ny spiller er opprettet, bør listen over spillere oppdateres. Men siden listen hentes av en server component, og skjemaet er en client component, er det ikke like rett frem.

En enkel løsning er å bruke `router.refresh()` fra Next.js:

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();

// Inne i handleSubmit, etter vellykket POST:
router.refresh();
```

Dette ber Next.js om å hente siden på nytt fra serveren, slik at den nye spilleren dukker opp i listen.

<details class="hint">
<summary>Hint</summary>

Du må importere `useRouter` fra `"next/navigation"` — ikke fra `"next/router"`. Det er to forskjellige!

</details>

---

## Oppgave 4 – Hooks i praksis (UFERDIG)

**Hva du skal lære:** Hva en hook er og reglene for hooks, `useState` til interaktiv tilstand, `useEffect` til sideeffekter, og `useRef` til direkte DOM-tilgang.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave 5 – Opprett spiller med React Hook Form (UFERDIG)

**Hva du skal lære:** Installere og bruke en tredjeparts React-pakke, fordelen med `react-hook-form` over manuell state, og skjemavalidering.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave 6 – Rediger spiller (UFERDIG)

**Hva du skal lære:** Gjenbruke komponenter, bruke en dialog/modal, forhåndsutfylle skjema med eksisterende data, og sende PATCH-kall til API.

> 🚧 Oppgavetekst skrives her.

---

## Oppgave 7 – Slett spiller (UFERDIG)

**Hva du skal lære:** DELETE-kall mot API, bekreftelsesdialog, og oppdatere visningen etter sletting.

> 🚧 Oppgavetekst skrives her.

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
