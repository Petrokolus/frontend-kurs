# Frontend-kurs

Dette er et introduksjonskurs i frontend-utvikling. Du vil lære hva frontend er, hvordan det henger sammen med et API, og hvordan du bygger et brukergrensesnitt slik du kommer til å gjøre på prosjekt.

Kurset er bygget rundt et realistisk scenario: du har startet på et nytt prosjekt og har fått i oppgave å bygge et foosball-managementsystem for kontoret. Du har fått tilgang til et ferdig API og et komponentbibliotek. Jobben din er å koble det hele sammen i en fungerende applikasjon.

---

<details>
<summary>Forutsetninger</summary>

Før du begynner må du ha installert Git, Node.js, pnpm og VS Code. Følg hvert steg nøye, og ikke hopp videre før du har bekreftet at hvert steg fungerer. Sitter du fast, spør kursholder eller personen ved siden av deg.

### 1. Git

Git er versjonskontrollsystemet vi bruker til å lagre og dele kode. Vi antar at du har installert Git fra tidligere kurs. Du kan sjekke om Git er installert ved å kjøre følgende kommando i terminalen:

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

OBS. Dersom du har Mac endrer du til "macOS i den blå firkanten og trykker på "macOS installer (.pkg)". Stegene videre er de samme.

![Node js download page with macOS installer button highlighted](nodejs_download_page_mac.png)

3. Åpne filen som lastes ned og klikk **Next**

![Node js setup wizard with "Next" button highlighted](nodejs_setup_wizard_homepage.png)

4. Godta lisensvilkårene og klikk **Next** gjennom alle stegene. Ikke endre noe, standardvalgene er riktige.

![License agreement with "Next" button highlighted](nodejs_license_agreement.png)
![Destination folder for node.js](nodejs_destination_folder.png)
![Node js Custom Setup](nodejs_custom_setup.png)
![Node js tools for Native Modules](nodejs_tools_for_native_modules.png)

PS. Du velger selv om du vil installere "Tools for Native Modules". Det er ikke nødvendig, men da har du det liggende skulle du trenge det senere.
Dersom du velger å installere "Tools for Native Modules", vil du få opp følgende vindu når du har fullført installasjonen av Node.js. Følg instruksjonene i vinduet, til du ser "Type ENTER to exit:" Da er installasjonen fullført.

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

```bash
corepack enable
```

> **Windows:** Du må kanskje åpne terminalen som administrator. Søk etter "Terminal" eller "PowerShell" i startmenyen, høyreklikk og velg **"Kjør som administrator"**.

Denne kommandoen gir ingen output. Det er normalt.

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

### Steg 1, Hent prosjektet

Du har to alternativer:

**Alternativ A: Fork og klon (anbefalt hvis du vil lagre arbeidet ditt på GitHub)**

En fork er din egen kopi av repoet under din GitHub-bruker.

1. Gå til [github.com/Petrokolus/frontend-kurs](https://github.com/Petrokolus/frontend-kurs)
2. Logg inn på GitHub (eller opprett en bruker hvis du ikke har en)
3. Klikk på **Fork**-knappen øverst til høyre på siden og følg instruksjonene.

![github repo fork](github_repo_fork.png)

4. Åpne terminalen og naviger til mappen der du vil lagre prosjektet, for eksempel:

```bash
cd repos/kurs
```

5. Klon **din** fork (bytt ut `<brukernavn>` med ditt GitHub-brukernavn):

```bash
git clone https://github.com/<brukernavn>/frontend-kurs.git
```

6. Gå inn i prosjektmappen:

```bash
cd frontend-kurs
```

---

**Alternativ B: Klon direkte (hvis du ikke trenger GitHub)**

1. Åpne terminalen og naviger til mappen der du vil lagre prosjektet, for eksempel:

```bash
cd repos/kurs
```

2. Klon repoet:

```bash
git clone https://github.com/Petrokolus/frontend-kurs.git
```

3. Gå inn i prosjektmappen:

```bash
cd frontend-kurs
```

---

### Steg 2, Åpne prosjektet i VS Code

```bash
code .
```

VS Code åpner seg med prosjektmappen. Hvis kommandoen ikke fungerer, åpne VS Code manuelt og velg **File → Open Folder**, naviger til `frontend-kurs`-mappen og klikk **Velg mappe**.

---

### Steg 3, Åpne terminalen i VS Code

Klikk på **Terminal** i menyen øverst → **New Terminal**.

En terminal åpner seg nederst i VS Code. Sjekk at du er i riktig mappe:

```bash
pwd
```

Du skal se en filsti som slutter på `frontend-kurs`. Hvis ikke, spør kursholder eller personen ved siden av deg.

![vs code with terminal open](vs_code_with_terminal_open.png)

---

### Steg 4, Installer avhengigheter

```bash
pnpm install
```

Dette laster ned alle bibliotekene prosjektet trenger. Det kan ta litt tid første gang. Når det er ferdig ser du noe som:

```
Done in Xs
```

---

### Steg 5, Start utviklingsserveren

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

### Steg 6, Åpne applikasjonen

Åpne nettleseren og gå til:

```
http://localhost:3000
```

Du skal nå se velkomstsiden til kurset og du er klar til å begynne på oppgavene!

Mens applikasjonen kjører, kan du også finne oppgavene i sidemenyen under "Oppgaver". Hver oppgave har en beskrivelse av hva du skal gjøre, og noen har også hint og løsningsforslag.
![oppgaver](oppgaver.png)

> **Viktig:** Utviklingsserveren må kjøre i terminalen mens du jobber. Lukk du terminalen, vil nettsiden slutte å fungere.
> Trenger du en ny terminal, åpne en ny fane med `+`-ikonet i terminalfeltet i VS Code.

</details>

---

## Oppgaver

Oppgavene starter nøye instruert med forklaringer, teori og kodesnippets du kan ta utgangspunkt i. Etter hvert blir instruksjonene kortere, da forventes det at du bruker det du har lært og slår opp i dokumentasjonen selv.

|     | Oppgave                                                                               |
| --- | ------------------------------------------------------------------------------------- |
| 1   | [Vis alle spillere](#oppgave-1-vis-alle-spillere)                                     |
| 2   | [Spillerdetaljer](#oppgave-2-spillerdetaljer)                                         |
| 3   | [Opprett spiller](#oppgave-3-opprett-spiller)                                         |
| 4   | [Hooks i praksis](#oppgave-4-hooks-i-praksis)                                         |
| 5   | [Opprett spiller med React Hook Form](#oppgave-5-opprett-spiller-med-react-hook-form) |
| 6   | [Rediger spiller](#oppgave-6-rediger-spiller)                                         |
| 7   | [Slett spiller](#oppgave-7-slett-spiller)                                             |
| 8   | [Filtrering og sortering](#oppgave-8-filtrering-og-sortering-av-spillere)             |
| 9   | [Alt du kan, brukt på nytt](#oppgave-9-alt-du-kan-brukt-pa-nytt)                      |
| 10  | [Dashboard](#oppgave-10-dashboard)                                                    |
|     | [Veien videre](#veien-videre)                                                         |

---

## Oppgave 1 – Vis alle spillere

**Hva du skal lære:** HTML/JSX, React-komponenter, props, TypeScript-typer, iterering med `.map()`, og henting av data fra API med server components.

I React bygger vi brukergrensesnitt av komponenter, gjenbrukbare byggeklosser som hver har sitt eget ansvar. En komponent (også kalt funksjonelt komponent) er egentlig bare en funksjon som returnerer JSX (HTML-lignende kode). Her er et superenkelt eksempel på en komponent, som vi her kaller "Hilsen":

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

I oppgave 1 skal du jobbe i disse filene:

- `src/components/spillere/spiller-card.tsx`, komponenten som viser informasjon om én spiller
- `src/components/spillere/spillere-liste.tsx`, liste-komponent som setter sammen SpillerCard-komponenter til en oversikt
- `src/app/spillere/page.tsx`, filen som definerer selve siden. Her henter vi data fra API-et og sender det videre som props til komponentene vi vil vise.

Legg merke til at de to første filene ligger i `src/components/`, mens den siste ligger i `src/app/`. Filer i `app/` definerer sider og routes man kan navigere til. Next.js behandler dem spesielt. Komponenter som `SpillerCard` og `SpillereListe` er derimot gjenbrukbare byggeklosser som ikke hører til én bestemt side, så de bor i `components/`.

Vi går gjennom disse steg for steg i oppgavene under.

#### Oppgave 1a - Legg til en overskrift

Før du begynner er det greit å vite om et grunnleggende skille i en React-komponent: hva som hører hjemme før `return`, og hva som hører hjemme inni `return`.

**Før `return`** er JavaScript-land. Her kan du deklarere variabler, kalle hooks, gjøre beregninger og forberede data. Alt som ikke er synlig i nettleseren hører hjemme her.

**Inni `return`** er JSX-land (JavaScript XML). Her beskriver du hva som skal vises. Du kan ikke skrive vanlige `if`-setninger eller `const`-deklarasjoner her, men du kan bruke `{}` til å sette inn verdier og uttrykk fra JavaScript-land.

```tsx
export default function MinKomponent() {
  // JavaScript-land: beregninger, variabler, hooks
  const navn = "Ola";
  const stor = navn.toUpperCase();

  return (
    // JSX-land: det som vises i nettleseren
    <p>{stor}</p>
  );
}
```

Overskriften du skal legge til i denne oppgaven hører hjemme inni `return`.

Hvis du har applikasjonen oppe og går lokalt, slik som beskrevet i slutten av oppstartsguiden, så kan du allerede nå navigere i nettleseren til "Spillere" i sidemenyen. Der ser du det som nå finnes av innhold i page.tsx i spillere-mappen.

Alle sider trenger en overskrift! Naviger til `page.tsx` og legg til overskriften "Spillere". HTML har sitt eget element for overskrifter:

```typescript
<h1>Spillere</h1>
```

`h` står for "heading". HTML har seks nivåer, fra `<h1>` (viktigst, størst) til `<h6>` (minst viktig). `<h1>` brukes til sidetittelen, `<h2>` til seksjoner under den, og så videre. En side bør bare ha én `<h1>`.

Tailwind CSS nullstiller alle nettleserens innebygde styles, inkludert overskrifter. Det betyr at `<h1>` ikke automatisk ser stor og fet ut, slik den gjør når man bruker vanlig CSS. Du må legge til stilene selv via `className`:

```tsx
<h1 className="text-3xl font-bold">Spillere</h1>
```

Dette er hvordan man "styler", altså legger til design, ved hjelp av Tailwind CSS. Det kodesnutten over gjør:

- _text-3xl_: Setter font-størrelse til XXXL
- _font-bold_: Setter font-type til bold (fet skrift)

Alle HTML-elementer kan styles på mange forskjellige måter ved hjelp av Tailwind. Du kan lære mer om dette, og finne en fullstendig oversikt over alle tilgjengelige klasser i Tailwind CSS-dokumentasjonen, som er lenket til i sidemenyen.

Hvis du har lagt til overskriften riktig, så skal du allerede nå kunne se den dukke opp i nettleseren under siden "Spillere".

<details class="losningsforslag">
<summary>Løsningsforslag 1a</summary>

```tsx
export default async function SpillerePage() {
  return (
    <div className="max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        {/* Oppgave 1b - LEGG TIL ET SPILLERCARD HER */}
        {/* Oppgave 3a - LEGG TIL EN LENKE TIL /spillere/opprett HER */}
      </div>
      <p>Her var det ganske tomt foreløpig!</p>
    </div>
  );
}
```

</details>

#### Oppgave 1b - Vis et SpillerCard på siden

En stor fordel med React er at man kan dele opp grensesnittet i gjenbrukbare komponenter og importere dem der man trenger dem. Slik ser en typisk import ut:

```tsx
import SpillerCard from "@/components/spillere/spiller-card";
```

`@/` er en snarvei som peker til `src/`-mappen i prosjektet. Etter det følger resten av filstien, uten `.tsx`-endelsen.

Når komponenten er importert kan du bruke den i JSX akkurat som en HTML-tag:

```tsx
<SpillerCard />
```

Importer `SpillerCard` i `page.tsx` og legg den inn under overskriften.

<details class="losningsforslag">
<summary>Løsningsforslag 1b</summary>

```tsx
import SpillerCard from "@/components/spillere/spiller-card";

export default async function SpillerePage() {
  return (
    <div className="max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        {/* Oppgave 3a - LEGG TIL EN LENKE TIL /spillere/opprett HER */}
      </div>
      <SpillerCard />
    </div>
  );
}
```

</details>

#### Oppgave 1c - Vis en liste med spillere

Nå som vi kan vise ett kort, er målet å vise flere. Til det har vi `SpillereListe`, en komponent som tar imot en liste med spillere og viser et `SpillerCard` for hver av dem.

**Steg 1: Bytt ut `SpillerCard` i `page.tsx` med `SpillereListe`**

`SpillereListe` forventer en prop som heter `spillere`, et array av `Spiller`-objekter. Siden vi ikke henter ekte data fra API-et enda, lager vi en mock-liste for å teste at det fungerer.

Erstatt `<SpillerCard />` i `page.tsx` med dette. Husk at `mockSpillere` er en konstant og skal ligge før `return`, ikke inni JSX-en:

```tsx
import SpillereListe from "@/components/spillere/spillere-liste";
import { Spiller } from "@/lib/types";

const mockSpillere: Spiller[] = [
  {
    id: 1,
    navn: "Ola Nordmann",
    avdeling: "Digital Engineering",
    kull: "NK20",
    posisjon: "Angrep",
    rating: 100,
    skyggerating: 100,
  },
  {
    id: 2,
    navn: "Kari Nordmann",
    avdeling: "Design",
    kull: "NK21",
    posisjon: "Forsvar",
    rating: 90,
    skyggerating: 85,
  },
];

// I return:
<SpillereListe spillere={mockSpillere} />;
```

**Steg 2: La `SpillerCard` ta imot `spiller` som prop**

Åpne `spiller-card.tsx`. Øverst ser du en `Props`-type med et `spiller`-felt, men komponenten bruker den ikke enda. Du skal nå:

1. Slette `mockSpiller`-konstanten
2. Ta imot `spiller` som prop i stedet
3. Bruke `spiller.navn` (og eventuelt andre felt) i JSX-en

**Steg 3: Send `spiller` videre fra `SpillereListe`**

Åpne `spillere-liste.tsx`. I `.map()`-løkken ser du at `SpillerCard` ikke mottar noen props enda. Legg til `spiller={spiller}` slik at hvert kort får sin spiller.

<details class="hint">
<summary>Hint</summary>

Se på hvordan `SpillereListe` tar imot `spillere` som prop. `SpillerCard` skal ta imot `spiller` (entall) på nøyaktig samme måte. Kopier mønsteret.

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 1c</summary>

`src/app/spillere/page.tsx`:

```tsx
import SpillereListe from "@/components/spillere/spillere-liste";
import { Spiller } from "@/lib/types";

export default async function SpillerePage() {
  const mockSpillere: Spiller[] = [
    {
      id: 1,
      navn: "Ola Nordmann",
      avdeling: "Digital Engineering",
      kull: "NK20",
      posisjon: "Angrep",
      rating: 100,
      skyggerating: 100,
    },
    {
      id: 2,
      navn: "Kari Nordmann",
      avdeling: "Design",
      kull: "NK21",
      posisjon: "Forsvar",
      rating: 90,
      skyggerating: 85,
    },
  ];
  return (
    <div className="max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        {/* Oppgave 3a - LEGG TIL EN LENKE TIL /spillere/opprett HER */}
      </div>
      <SpillereListe spillere={mockSpillere} />
    </div>
  );
}
```

`src/components/spillere/spiller-card.tsx`:

```tsx
import { Spiller } from "@/lib/types";

type Props = {
  spiller: Spiller;
};

export default function SpillerCard({ spiller }: Props) {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{spiller.navn}</h2>
        <p className="text-muted-foreground text-sm">
          Her kan vi vise mer data fra spiller-objektene
        </p>
      </div>
    </div>
  );
}
```

`src/components/spillere/spillere-liste.tsx` (oppdater linjen med `SpillerCard`):

```tsx
<SpillerCard key={spiller.id} spiller={spiller} />
```

</details>

#### Oppgave 1d - Fyll på litt fler detaljer

Hvis du klarte å vise et SpillerCard på siden i forrige oppgave, så la du kanskje merke til at det ikke var så mye mer spennende informasjon enn navnet som vises. Prøv å vise noe mer informasjon i SpillerCard.

<details class="hint">
<summary>Hint</summary>

Usikker på hva slags informasjon du kan vise? Se hvilke verdier som finnes i et spiller-objekt ved å holde musepekeren over "Spiller" eller ved å bruke `Ctrl + venstreklikk`.

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 1d</summary>

```tsx
export default function SpillerCard({ spiller }: Props) {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{spiller.navn}</h2>
        <p className="text-muted-foreground text-sm">{spiller.posisjon}</p>
        <p className="text-muted-foreground text-sm">
          Rating: {spiller.rating}
        </p>
      </div>
    </div>
  );
}
```

</details>

#### Oppgave 1e - Legg til bilde på SpillerCard

Hver spiller har et bilde tilgjengelig på `/spiller/{id}.png` i prosjektet. Legg til et bilde av spilleren i `SpillerCard`.

I Next.js bruker vi `<Image>` fra `next/image` i stedet for en vanlig `<img>`-tag. Den optimaliserer bildene automatisk og krever at du oppgir `width` og `height`.

`alt` er en tekstlig beskrivelse av bildet. Den brukes av skjermlesere for blinde og svaksynte, og vises dersom bildet ikke kan lastes. For et profilbilde er spillerens navn en god `alt`-tekst:

```tsx
import Image from "next/image";

<Image src="/spiller/1.png" alt="Ola Nordmann" width={100} height={100} />;
```

Bytt ut de hardkodede verdiene med riktig `src` og `alt` basert på spillerens data. Husk at du kan sette inn variabler i en streng med template literals: `` `/spiller/${spiller.id}.png` ``

Vi anbefaler også å legge til denne `className` for å få bildet til å se bra ut:

```tsx
className = "aspect-square rounded-full object-cover";
```

<details class="losningsforslag">
<summary>Løsningsforslag 1e</summary>

```tsx
import { Spiller } from "@/lib/types";
import Image from "next/image";

type Props = {
  spiller: Spiller;
};

export default function SpillerCard({ spiller }: Props) {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <Image
        src={`/spiller/${spiller.id}.png`}
        alt={spiller.navn}
        width={64}
        height={64}
        className="aspect-square rounded-full object-cover"
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{spiller.navn}</h2>
        <p className="text-muted-foreground text-sm">{spiller.posisjon}</p>
        <p className="text-muted-foreground text-sm">
          Rating: {spiller.rating}
        </p>
      </div>
    </div>
  );
}
```

</details>

#### Oppgave 1f - Hent spillere

Vi har en lokal database med foosball-spillere fra Twoday! Innhold derfra kan hentes gjennom API-et på denne måten:

```ts
const result = await fetch("http://localhost:3000/api/spillere");
const spillere: Spiller[] = await result.json();
```

Fordi `page.tsx` er en **server component**, en komponent som kjører på serveren, ikke i nettleseren, kan vi bruke `await` direkte i komponenten uten noe ekstra oppsett. Vi kommer tilbake til hva dette betyr i praksis i oppgave 3.

Hent spillerne fra API-et og send dem til `SpillereListe` på samme måte som du sendte `mockSpillere` i oppgave 1c. Fjern `mockSpillere`-konstanten nå som vi har ekte data.

<details class="losningsforslag">
<summary>Løsningsforslag 1f</summary>

```tsx
import SpillereListe from "@/components/spillere/spillere-liste";
import { Spiller } from "@/lib/types";

export default async function SpillerePage() {
  const result = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await result.json();

  return (
    <div className="max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        {/* Oppgave 3a - LEGG TIL EN LENKE TIL /spillere/opprett HER */}
      </div>
      <SpillereListe spillere={spillere} />
    </div>
  );
}
```

</details>

---

## Oppgave 2 – Spillerdetaljer

**Hva du skal lære:** Filbasert routing i Next.js, dynamiske route-parametere, lenking mellom sider med `<Link>`, og tilgjengelighet (`alt`-tekst på bilder).

I oppgave 1 bygde vi en liste over alle spillere. Nå skal vi lage en detaljside for hver enkelt spiller og lenke til den, slik at man kan navigere til detaljsiden ved å klikke på et spillerkort i listen.

I denne oppgaven skal vi også bli kjent med **API-dokumentasjonen**, et verktøy du finner i sidemenyen under "API-dokumentasjon". Der kan du se alle tilgjengelige API-routes, hva de returnerer, og teste dem direkte i nettleseren. Dette er noe du vil bruke mye på jobb, så det er lurt å bli komfortabel med det tidlig.

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

I dette tilfellet vil tekststrengen du putter inni firkantparentesene (`id`, `kampNr`, `liga`) være tilgjengelig som en variabel i `page.tsx`-filen gjennom `params`-objektet som Next.js automatisk sender inn i siden.

> **OBS:** Next.js tolker visse filnavn i `app`-mappen på en spesiell måte. `page.tsx` er ett av dem, men det finnes flere: `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` og `template.tsx`. Disse er reservert for Next.js og bør ikke brukes som navn på egne komponenter.

For å hjelpe deg i gang har vi allerede opprettet `src/app/spillere/[id]/page.tsx`. Naviger til `http://localhost:3000/spillere/1`, `http://localhost:3000/spillere/2`, `http://localhost:3000/spillere/3` i nettleseren. Ser du hvordan tittelen endres basert på `id`-verdien i URL-en?

#### Oppgave 2b – Utforsk API-et i API-dokumentasjonen

Før vi skriver kode, la oss utforske hva API-et tilbyr. Klikk på **API-dokumentasjon** i sidemenyen.

Her finner du en oversikt over alle tilgjengelige API-routes. Klikk på routen `GET /api/spillere/{id}`, skriv inn en spiller-ID (f.eks. `1`) og klikk **"Execute"**. Du vil se nøyaktig hva API-et returnerer, og dette er dataen du skal bruke på detaljsiden.

På jobb vil du bruke API-dokumentasjon til å forstå hva som er tilgjengelig og hvordan dataen ser ut, før du begynner å kode. Gjør deg kjent med det!

#### Oppgave 2c – Hent og vis spillerdata

Nå som du vet hvordan API-et ser ut, er det på tide å bruke det i koden.

I oppgave 1 brukte vi fetch til å hente alle spillere. Nå skal vi hente én spiller basert på `id`-en i URL-en.

Prøv å hente spilleren fra API-et og vis detaljene på siden!

<details class="hint">
<summary>Hint</summary>

Du trenger `id`-en fra URL-en for å bygge opp riktig API-URL. Bruk template literals akkurat som du gjorde for bildesrc i oppgave 1e.

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 2c</summary>

```tsx
import { Spiller } from "@/lib/types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SpillerPage({ params }: Props) {
  const { id } = await params;

  const result = await fetch(`http://localhost:3000/api/spillere/${id}`);
  const spiller: Spiller = await result.json();

  return (
    <div className="max-w-2xl p-8">
      <h1 className="text-3xl font-bold">{spiller.navn}</h1>
      <p>
        {spiller.avdeling} - {spiller.kull}
      </p>
      <p>{spiller.posisjon}</p>
      <p>Rating: {spiller.rating}</p>
    </div>
  );
}
```

</details>

#### Oppgave 2d – Vis spillerens bilde

Du brukte `<Image>` fra `next/image` til å vise spillerbilder i oppgave 1e. Gjør det samme her, men gjør bildet større siden dette er en detaljside. Bildene ligger på `/spiller/{id}.png` akkurat som før.

Tenk også på `alt`-teksten: hva _formidler_ bildet? For et profilbilde er navnet på personen den viktigste informasjonen.

<details class="losningsforslag">
<summary>Løsningsforslag 2d</summary>

```tsx
import Image from "next/image";

<Image
  src={`/spiller/${id}.png`}
  alt={`Profilbilde av ${spiller.navn}`}
  width={128}
  height={128}
  className="aspect-square rounded-full object-cover"
/>;
```

</details>

#### Oppgave 2e – Gi detaljsiden en fin layout

Nå som du har bilde og spillerdata på plass, kan vi gjøre siden litt penere. Prøv å sentrere innholdet og gi feltene fin avstand fra hverandre.

Her er noen Tailwind-klasser som kan hjelpe:

| Klasse                       | Hva den gjør                                         |
| ---------------------------- | ---------------------------------------------------- |
| `flex flex-col items-center` | Stabeler innhold vertikalt og sentrerer det          |
| `gap-4`                      | Setter jevn avstand mellom barna i en flex-container |
| `text-center`                | Sentrerer tekst                                      |
| `text-muted-foreground`      | Gjør teksten litt grå og nedtonet                    |

Du finner alle tilgjengelige klasser i Tailwind CSS-dokumentasjonen, som er lenket til i sidemenyen.

<details class="losningsforslag">
<summary>Løsningsforslag 2e</summary>

```tsx
// Mappenavnet [id] gjør at Next.js fanger opp alle URLer som /spillere/1, /spillere/42 osv.

import { Spiller } from "@/lib/types";
import Image from "next/image";

// id-en fra URL-en er tilgjengelig via params-objektet nedenfor.
type Props = {
  params: Promise<{ id: string }>; // id fra URL-en, f.eks. "1"
};

export default async function SpillerPage({ params }: Props) {
  const { id } = await params; // Hent ut id-en

  const result = await fetch(`http://localhost:3000/api/spillere/${id}`);
  const spiller: Spiller = await result.json();

  return (
    <div className="flex min-h-screen items-start justify-center p-8">
      <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-xl border p-8">
        <Image
          src={`/spiller/${id}.png`}
          alt={`Profilbilde av ${spiller.navn}`}
          width={200}
          height={200}
          className="aspect-square rounded-4xl object-cover"
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">{spiller.navn}</h1>
          <p className="text-muted-foreground">
            {spiller.avdeling} - {spiller.kull}
          </p>
          <p>{spiller.posisjon}</p>
          <p>
            Rating: {spiller.rating} ({spiller.skyggerating})
          </p>
          {spiller.styrke && <p>Styrke: {spiller.styrke}</p>}
          {spiller.svakhet && <p>Svakhet: {spiller.svakhet}</p>}
        </div>
      </div>
    </div>
  );
}
```

</details>

#### Oppgave 2f – Lenk fra spillerlisten

Detaljsiden er fin, men ingen kommer seg dit uten en lenke! I Next.js bruker vi den ferdiglagde `<Link>`-komponenten fra `next/link` for å navigere mellom sider:

```tsx
import Link from "next/link";

<Link href="/spillere/1">Gå til Erik Solberg</Link>;
```

`<Link>` er på mange måter bare en vanlig `<a>`-tag, men den har noen fordeler som gjør navigasjonen raskere, blant annet **pre-fetching**. Prefetching betyr at `<Link>` begynner å laste inn siden den peker på i bakgrunnen, slik at navigeringen føles raskere når du klikker.

Gå til `spiller-card.tsx` og legg til en `<Link>` rundt kortet, slik at man kan klikke på et spillerkort og komme til detaljsiden for den spilleren.

<details class="losningsforslag">
<summary>Løsningsforslag 2f</summary>

```tsx
import Link from "next/link";
import { Spiller } from "@/lib/types";

type Props = {
  spiller: Spiller;
};

export default function SpillerCard({ spiller }: Props) {
  return (
    <Link href={`/spillere/${spiller.id}`}>
      <div className="flex items-center space-x-4 rounded-lg border p-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{spiller.navn}</h2>
          <p className="text-muted-foreground text-sm">{spiller.posisjon}</p>
          <p className="text-muted-foreground text-sm">
            Rating: {spiller.rating}
          </p>
        </div>
      </div>
    </Link>
  );
}
```

</details>

---

## Oppgave 3 – Opprett spiller

**Hva du skal lære:** HTML-skjemaer i React, `useState` for skjematilstand, kontrollerte inputs, sende data til et API med `fetch`, og tilgjengelighet i skjemaer.

Nå som vi kan se alle spillerne, er det på tide å la brukeren legge til nye! I denne oppgaven skal du bygge et skjema for å opprette en ny spiller.

#### Server components og client components

Hittil har vi jobbet med **server components**, komponenter som kjøres på serveren og sender ferdig HTML til nettleseren. De er enkle og raske, men de kan ikke reagere på brukerinteraksjon som klikk eller tastetrykk.

For å håndtere interaksjon trenger vi en **client component**, en komponent som kjøres i nettleseren. Client components markeres med `"use client"` øverst i filen:

```tsx
"use client";

import { useState } from "react";
```

Uten `"use client"` kan du ikke bruke `useState`-hooken, event handlers som `onClick` eller `onChange`, eller andre ting som avhenger av at koden kjører i nettleseren. Et skjema der brukeren fyller inn data er et typisk eksempel på noe som må være en client component. Du kommer til å lære mer om hooks i oppgave 4.

Åpne filen `src/components/spillere/opprett-spiller-skjema.tsx`. Du vil se at den allerede har `"use client"` øverst og ett inputfelt for navn. Oppgaven din blir å fullføre skjemaet, men først skal du få en rask innføring i hvordan å bruke useState og event-handlers brukes i skjemaer.

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

Destrukturering er bare en snarvei for å hente ut elementer fra en liste eller et objekt. Navnene `navn` og `setNavn` velger vi selv, men konvensjonen er å kalle dem `noe` og `setNoe`.

#### Skjemaer og kontrollerte inputs

I React er det vanlig å bruke det vi kaller **kontrollerte inputs**, det vil si at React holder styr på hva brukeren har skrevet, ikke nettleseren. Vi gjør dette med `useState`:

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

`{ ...skjema, navn: e.target.value }` betyr: «ta alle verdiene fra det gamle skjema-objektet, men overskriv `navn` med den nye verdien». Dette kalles en **spread** og er en vanlig måte å oppdatere objekter i React på.

#### Tilgjengelighet: label og id

For at skjemaet skal fungere godt for alle, inkludert brukere med skjermleser, er det viktig å knytte hvert inputfelt til en `<label>` med `htmlFor` og `id`:

```tsx
<label htmlFor="navn">Navn</label>
<input id="navn" ... />
```

Dette gjør at klikk på etiketten fokuserer feltet, og at skjermlesere leser opp hva feltet er for.

---

Vil du lære mer om hvordan ratingsystemet fungerer? Les gjerne mer her:

<details>
<summary>Hva skjer med ratingen til en ny spiller?</summary>

Alle nye spillere starter automatisk med **500 i rating**. Du trenger ikke tenke på det i skjemaet, det settes av serveren og kan ikke overstyres.

Ratingen oppdateres automatisk etter hver registrerte kamp, basert på et tilpasset ELO-system:

- **Lag-rating** = gjennomsnittet av de to spillernes rating
- **Forventet resultat** beregnes fra ratingdifferansen mellom lagene: jo større forskjell, jo lavere forventning til det svakere laget
- **Måldifferansen** veier inn: en stor seier gir større ratingendring enn en jevn
- **Endringen fordeles likt** mellom de to spillerne på laget

</details>

<details>
<summary>Hva er skyggerating?</summary>

**Skyggerating** viser formen til en spiller på kort sikt, ikke hvor gode de er totalt sett, men hvor gode de _har vært_ de siste kampene.

En spiller kan ha en solid langsiktig rating på 550, men skyggeratingen kan vise 620 hvis de har hatt en sterk periode, eller 480 hvis formen har sviktet.

Skyggeratingen beregnes fra de **5 siste kampene**, der nyere kamper teller mer enn eldre:

| Kamp      | Vekting |
| --------- | ------- |
| Nyeste    | 100%    |
| 2. nyeste | 80%     |
| 3. nyeste | 60%     |
| 4. nyeste | 40%     |
| 5. nyeste | 20%     |

I tillegg bruker skyggeratingen en **høyere K-verdi** enn vanlig rating, slik at den svinger raskere når formen endrer seg.

Skyggeratingen tar også hensyn til **vinnstreaker og tapstreaker**. Flere seiere på rad gir en bonus, og flere tap på rad gir en straff, jo lengre streaken er, jo større effekt.

</details>

#### Oppgave 3a – Legg til lenke til "Opprett spiller"-siden

Skjemaet bor på sin egen side: `/spillere/opprett`. Legg til en `<Link>` i `src/app/spillere/page.tsx`, rett under overskriften, som tar brukeren dit.

Du har brukt `<Link>` fra `next/link` i oppgave 2. Bruk det samme mønsteret her.

<details class="losningsforslag">
<summary>Løsningsforslag 3a</summary>

```tsx
import Link from "next/link";
import SpillereListe from "@/components/spillere/spillere-liste";
import { Spiller } from "@/lib/types";

export default async function SpillerePage() {
  const result = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await result.json();

  return (
    <div className="max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        <Link
          href="/spillere/opprett"
          className="bg-twoday-amber rounded px-4 py-2 font-semibold"
        >
          Opprett spiller
        </Link>
      </div>
      <SpillereListe spillere={spillere} />
    </div>
  );
}
```

</details>

#### Oppgave 3b – Oppdater `SkjemaData`-typen og startverdiene

Øverst i filen er det definert en type `SkjemaData` og en startverdi for `useState`. Disse inneholder foreløpig bare `navn`. Legg til de andre feltene her også.

<details class="hint">
<summary>Hint</summary>

TypeScript vil gi deg rød understrek hvis du glemmer et felt. Hvis du hoverer over feilmeldingene kan du se hva som forventes.

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 3b</summary>

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

#### Oppgave 3c – Legg til inputfeltene

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
<summary>Løsningsforslag 3c</summary>

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
};

export default function OpprettSpillerSkjema() {
  const router = useRouter();

  const [skjema, setSkjema] = useState<SkjemaData>({
    navn: "",
    avdeling: "",
    kull: "",
    posisjon: "",
  });

  async function handleSubmit(data: SkjemaData) {
    const response = await fetch("http://localhost:3000/api/spillere", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Oppgave 3e: Naviger til den nye spillerens detaljside
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(skjema);
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="navn">Navn</label>
        <input
          id="navn"
          type="text"
          value={skjema.navn}
          onChange={(e) => setSkjema({ ...skjema, navn: e.target.value })}
          className="rounded border px-3 py-2"
          required
        />
      </div>
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
      <div className="flex flex-col gap-1">
        <label htmlFor="kull">Kull</label>
        <input
          id="kull"
          type="text"
          value={skjema.kull}
          onChange={(e) => setSkjema({ ...skjema, kull: e.target.value })}
          className="rounded border px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="posisjon">Posisjon</label>
        <input
          id="posisjon"
          type="text"
          value={skjema.posisjon}
          onChange={(e) => setSkjema({ ...skjema, posisjon: e.target.value })}
          className="rounded border px-3 py-2"
          required
        />
      </div>
      {/* Oppgave 3d: Legg til valgfrie felter for styrke og svakhet */}

      <button
        type="submit"
        className="bg-twoday-amber rounded px-4 py-2 font-semibold"
      >
        Opprett spiller
      </button>
    </form>
  );
}
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

#### Oppgave 3f – Test at det fungerer

Fyll inn skjemaet og opprett en spiller. Sjekk at:

1. Du blir sendt videre til detaljsiden for den nye spilleren
2. Spilleren dukker opp i listen på `/spillere`
3. Detaljsiden viser riktig informasjon

---

## Oppgave 4 – Hooks i praksis

**Hva du skal lære:** Hva en hook er og reglene for hooks, `useState` til interaktiv tilstand, `useEffect` til sideeffekter, og `useRef` til direkte DOM-tilgang.

Hooks er spesielle funksjoner i React som gir komponentene dine tilgang til tilstand og side effects, det vil si alt som skjer utenfor Reacts renderingssyklus, som å lese fra localStorage, hente data fra en API, eller manipulere DOM-en direkte.

Det finnes et par regler for når hooks kan brukes:

- Hooks skal alltid kalles øverst i komponenten, aldri inne i, eller etter, if-setninger, løkker eller andre blokker
- Hooks kan bare brukes i React-komponenter (eller i egne custom hooks)

I denne oppgaven skal du legge til et søkefelt på spillersiden. Underveis vil du bruke alle tre hookene til forskjellige ting, og det er poenget, de løser ulike problemer:

| Hook        | Brukes til                                                                              |
| ----------- | --------------------------------------------------------------------------------------- |
| `useState`  | Holde på en verdi som kan endres, og re-rendre komponenten når den gjør det             |
| `useEffect` | Kjøre kode som reaksjon på at noe har endret seg, eller én gang når komponenten mountes |
| `useRef`    | Holde en referanse til et DOM-element, uten å trigge re-render                          |

#### Oppgave 4a – Legg til et søkefelt med `useState`

Opprett en ny fil `src/components/spillere/spiller-sok.tsx`. Dette blir en client component, siden den trenger interaktivitet, husk `"use client"` øverst.

Komponenten skal ha:

- Et `<input>`-felt der brukeren kan skrive
- En `useState` som holder søketeksten
- En `onChange` på inputen som oppdaterer staten

```tsx
const [sok, setSok] = useState("");
```

Importer og vis `SpillerSok` i `src/app/spillere/page.tsx`. Foreløpig trenger du ikke koble den til spillerlisten, det kommer i neste steg.

<details class="losningsforslag">
<summary>Løsningsforslag 4a</summary>

```tsx
"use client";

import { useState } from "react";

export default function SpillerSok() {
  const [sok, setSok] = useState("");
  return (
    <input
      type="text"
      placeholder="Søk etter spillere..."
      className="w-full rounded border px-3 py-2"
      value={sok}
      onChange={(e) => setSok(e.target.value)}
    />
  );
}
```

</details>

#### Oppgave 4b – Filtrer spillerlisten

Nå skal søket faktisk gjøre noe. Søketeksten må brukes til å filtrere hvilke spillere som vises, men `page.tsx` er en server component og kan ikke ha `useState`. Løsningen er en ny client component som tar imot hele spillerlisten som prop, håndterer søkestate selv, og viser de filtrerte resultatene.

Vi har laget en halvferdig fil til deg: `src/components/spillere/spiller-sok-og-liste.tsx`. Åpne den og fullfør de tre kommenterte stegene.

Når den er ferdig, erstatt `SpillerSok` og `SpillereListe` i `page.tsx` med:

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

`useEffect` brukes til å synkronisere React-tilstand med noe utenfor React, som `localStorage`, en ekstern API, eller DOM-en. Syntaksen ser slik ut:

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

Og les den ut med en egen `useEffect` som kjører én gang når komponenten mountes, slik at søket er gjenopprettet neste gang siden lastes. Vi kan ikke lese `localStorage` direkte i `useState` fordi komponenten også rendres på serveren, og `localStorage` finnes bare i nettleseren:

```tsx
useEffect(() => {
  setSok(localStorage.getItem("spillerSok") ?? "");
}, []);
```

<details class="losningsforslag">
<summary>Løsningsforslag 4c</summary>

Legg til disse linjene i `SpillerSokOgListe`:

```tsx
import { useState, useEffect } from "react";

const [sok, setSok] = useState("");

useEffect(() => {
  setSok(localStorage.getItem("spillerSok") ?? "");
}, []);

useEffect(() => {
  localStorage.setItem("spillerSok", sok);
}, [sok]);
```

</details>

#### Oppgave 4d – Auto-fokus med `useRef`

`useRef` gir deg en direkte referanse til et DOM-element, uten å trigge en re-render. Det brukes når du trenger å gjøre noe med selve elementet i nettleseren, som å fokusere det.

Legg til auto-fokus på søkefeltet, slik at det er klart til bruk med en gang siden lastes:

```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []); // Tom avhengighetsliste = kjør én gang, etter første render

// På input-elementet:
<input ref={inputRef} ... />
```

`?.` betyr "gjør dette bare hvis verdien ikke er `null`", trygg tilgang på et element som kanskje ikke finnes ennå.

<details class="losningsforslag">
<summary>Løsningsforslag 4d</summary>

```tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  sok: string;
  setSok: (sok: string) => void;
};

export default function SpillerSok({ sok, setSok }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Søk etter spillere..."
      className="w-full rounded border px-3 py-2"
      value={sok}
      onChange={(e) => setSok(e.target.value)}
    />
  );
}
```

</details>

---

## Oppgave 5 – Opprett spiller med React Hook Form

**Hva du skal lære:** Installere og bruke en tredjeparts React-pakke, fordelen med `react-hook-form` over manuell state, og skjemavalidering.

I oppgave 3 bygde vi et skjema med manuell `useState` for å holde styr på alle feltene. Det fungerer, men det er mye kode å vedlikeholde, og jo flere felter, jo mer tungvint blir det. En vanlig løsning i frontend-verdenen er å bruke et skjemabibliotek. Vi skal bruke **React Hook Form**, som er en av de mest utbredte løsningene i React-prosjekter i dag.

React Hook Form er ikke en del av React selv. Det er en separat pakke vi må installere. Dette er et mønster du vil møte hele tiden på prosjekt: du finner et bibliotek som løser problemet du har, og du legger det til i prosjektet.

#### Oppgave 5a: Installer React Hook Form

Pakker installeres med pnpm i terminalen. Siden dev-serveren kjører i terminalen din, åpner du en **ny terminal** i VS Code (**Terminal → New Terminal**) og kjører:

```bash
pnpm add react-hook-form
```

`pnpm add` henter pakken fra internett og legger den til i `package.json`. Etter at kommandoen er ferdig kan du bekrefte at det gikk bra ved å se at `react-hook-form` dukker opp under `dependencies` i `package.json`.

> **Tips:** Etter at en ny pakke er installert henger TypeScript-serveren i VS Code noen ganger etter. Hvis intellisense ikke foreslår riktige importer, trykk **Ctrl + Shift + P**, søk etter **"TypeScript: Restart TS Server"** og trykk Enter.

#### Oppgave 5b: Ta i bruk `useForm`

React Hook Form gir oss en hook som heter `useForm`. Den returnerer alt vi trenger for å håndtere skjemaet: registrering av felt, innsending og feilhåndtering.

Naviger til `src/components/spillere/opprett-spiller-skjema.tsx`, skjemaet du bygde i oppgave 3. Vi skal nå skrive det om til å bruke `useForm`.

Importer `useForm` og kall den øverst i komponenten.

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

#### Oppgave 5c: Konverter ett felt

Med `useState` koblet vi hvert felt til state med `value` og `onChange`. Med React Hook Form sprer vi `form.register()` direkte inn i inputet i stedet:

```tsx
<input {...form.register("navn", { required: "Navn er påkrevd" })} />
```

`{ required: "Navn er påkrevd" }` er en valideringsregel. Strengen brukes som feilmelding hvis feltet er tomt når skjemaet sendes inn.

Konverter `navn`-feltet til å bruke `form.register`. Fjern `value`, `onChange` og `required`-attributtene som du ikke lenger trenger.

<details class="losningsforslag">
<summary>Løsningsforslag 5c</summary>

```tsx
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(skjema);
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="navn">Navn</label>
        <input
          id="navn"
          type="text"
          {...form.register("navn", { required: "Navn er påkrevd" })}
          className="rounded border px-3 py-2"
        />
      </div>
```

</details>

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

Du kan nå fjerne `useState`-importen og `skjema`-konstanten. React Hook Form holder styr på feltene for deg.

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

`Path<SkjemaData>` er en type fra React Hook Form som beskriver gyldige feltnavn i skjemaet, altså `"navn" | "avdeling" | "kull" | "posisjon" | "styrke" | "svakhet"`. Vi bruker den fordi det er nøyaktig det `form.register` forventer. Med `string` ville TypeScript klage på `form.register(id, ...)`. Med `Path<SkjemaData>` får du i tillegg hjelp av TypeScript til å oppdage skrivefeil, sender du inn `"nvan"` vil du få en feilmelding med én gang.

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

Opprett filen `src/app/spillere/[id]/components/rediger-spiller-dialog.tsx`. Foreløpig skal den bare inneholde selve dialog-strukturen med en trigger-knapp og et tomt innhold, skjemaet legger vi til i oppgave 6d.

En dialog i shadcn består av tre deler:

- `Dialog`, container som holder på åpen/lukket-tilstanden
- `DialogTrigger`, elementet som åpner dialogen når man klikker
- `DialogContent`, innholdet som vises i selve dialogvinduet

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

<details>
<summary>Hvorfor er ikke rating med i skjemaet?</summary>

Rating redigeres ikke manuelt, den regnes ut automatisk av serveren etter hver registrerte kamp.

ELO-systemet fungerer slik:

- **Lag-rating** = gjennomsnittet av de to spillernes rating
- **Forventet resultat** beregnes fra ratingdifferansen mellom lagene
- **Måldifferansen** veier inn: en stor seier gir større ratingendring enn en jevn kamp
- **Endringen fordeles likt** mellom de to spillerne på laget

`rating` er derfor bevisst utelatt fra `SkjemaData`, det er ikke et felt brukeren skal kunne endre.

</details>

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

For å gjøre det bruker vi en **ternary-operator**, en kompakt måte å skrive en if/else på som returnerer en verdi:

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
</AlertDialog>;
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
            Dette vil permanent slette {spiller.navn}. Handlingen kan ikke
            angres.
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
            Dette vil permanent slette {spiller.navn}. Handlingen kan ikke
            angres.
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

## Oppgave 8 – Filtrering og sortering av spillere

**Hva du skal lære:** Forskjellen på lokal tilstand og URL-tilstand, `useSearchParams` for å skrive søk til URL, `searchParams` på page-nivå for filtrering og sortering på serveren, debounce for å begrense antall nettverkskall, og `loading.tsx` for å vise skeleton-komponenter mens siden laster.

### Lokal tilstand vs. URL-tilstand

I oppgave 4 lagret du søketeksten i `useState`. Det fungerer bra for enkel interaktivitet, men har noen begrensninger:

|                                | `useState` (lokal tilstand) | URL search params  |
| ------------------------------ | --------------------------- | ------------------ |
| Overlever reload?              | Nei                         | Ja                 |
| Kan deles med andre?           | Nei                         | Ja (kopier URL-en) |
| Tilgjengelig på serveren?      | Nei                         | Ja                 |
| Synlig i nettleserhistorikken? | Nei                         | Ja                 |

URL-tilstand passer godt for ting som søk, filtrering og sortering: tilstander brukeren gjerne vil kunne bokmerke eller dele. Lokal tilstand passer bedre for midlertidig UI-tilstand som åpne/lukket-status på en dropdown eller hvilken fane som er aktiv.

Legg også merke til at `useState` i oppgave 4 tvang deg til å samle søkelogikk og listeoppsett i én wrapper-komponent (`SpillerSokOgListe`). Det var fordi filtreringen trengte tilgang til `sok`-verdien, og `useState` bare eksisterer i den komponenten der den er deklarert. Med URL-tilstand forsvinner den begrensningen: søkeverdien er tilgjengelig overalt, og du trenger ikke en wrapper for å dele den.

I denne oppgaven bytter vi til URL-tilstand og rydder opp i komponentstrukturen samtidig.

#### Oppgave 8a – Bytt søk til URL-tilstand

Nå skal du gjøre tre ting:

1. Gjøre `SpillerSok` om til en selvstendig komponent som skriver søket til URL-en
2. Slette `src/components/spillere/spiller-sok-og-liste.tsx`, siden vi ikke trenger wrapperen lenger
3. Flytte filtrering til `page.tsx`, som leser søket fra URL-en via `searchParams`

**Steg 1: Oppdater `SpillerSok`**

`SpillerSok` trenger ikke lenger props fra en wrapper. I stedet bruker den `useSearchParams()` for å lese gjeldende søkeverdi og `useRouter()` for å skrive til URL-en når brukeren skriver.

`useSearchParams()` er en ny hook du ikke har brukt før. Den returnerer en read-only versjon av query-strengen i URL-en:

```tsx
const searchParams = useSearchParams();
const sok = searchParams.get("sok") ?? "";
```

For å oppdatere URL-en når brukeren skriver bruker du `router.replace()` i stedet for `router.push()`, slik at hvert tastetrykk ikke legger seg i nettleserhistorikken:

```tsx
function handleChange(verdi: string) {
  const params = new URLSearchParams(searchParams.toString());
  if (verdi) {
    params.set("sok", verdi);
  } else {
    params.delete("sok");
  }
  router.replace(`/spillere?${params.toString()}`);
}
```

`useSearchParams()` returnerer et read-only objekt, så du kan ikke kalle `.set()` eller `.delete()` på det direkte. `new URLSearchParams(searchParams.toString())` lager en muterbar kopi du kan redigere.

**Steg 2: Slett `src/components/spillere/spiller-sok-og-liste.tsx`**

Wrapperen trenger du ikke lenger. Slett filen.

**Steg 3: Oppdater `page.tsx`**

`page.tsx` får `searchParams` som prop, akkurat som den får `params` for dynamiske routes. I Next.js 16 er den et Promise som må awaites:

```tsx
type Props = {
  searchParams: Promise<{ sok?: string }>;
};

export default async function SpillerePage({ searchParams }: Props) {
  const { sok } = await searchParams;
  // ...
}
```

Hent alle spillere fra API-et og filtrer basert på `sok`. `&&` betyr "og": uttrykket er sant bare hvis begge sider er sanne. For å vise spillere som matcher søket kan du skrive:

```tsx
sok && spiller.navn.toLowerCase().includes(sok.toLowerCase());
```

Dette er sant hvis søket ikke er tomt OG spillerens navn inneholder søketeksten. Men når søket er tomt vil ingen spillere vises. Vi vil heller vise alle spillere som standard, så vi snur logikken med `!` (ikke) og `||` (eller):

```tsx
const spillereListe = spillere.filter(
  (spiller) => !sok || spiller.navn.toLowerCase().includes(sok.toLowerCase())
);
```

Les det som: vis spilleren hvis søket er tomt, eller hvis navnet matcher.

Send `spillereListe` til `SpillereListe` direkte uten noen wrapper. Du kan også fjerne `useEffect` og `localStorage`-koden fra oppgave 4c. URL-en husker søket for deg.

Prøv det: skriv noe i søkefeltet og se at URL-en oppdateres. Trykk reload. Søket er der fortsatt.

<details class="losningsforslag">
<summary>Løsningsforslag 8a</summary>

`spiller-sok.tsx`:

```tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SpillerSok() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sok = searchParams.get("sok") ?? "";

  function handleChange(verdi: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (verdi) {
      params.set("sok", verdi);
    } else {
      params.delete("sok");
    }
    router.replace(`/spillere?${params.toString()}`);
  }

  return (
    <input
      value={sok}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Søk etter spiller..."
      className="rounded border px-3 py-2"
    />
  );
}
```

`page.tsx`:

```tsx
import { Spiller } from "@/lib/types";
import SpillerSok from "./spiller-sok";
import SpillereListe from "./spillere-liste";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ sok?: string }>;
};

export default async function SpillerePage({ searchParams }: Props) {
  const { sok } = await searchParams;

  const response = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await response.json();

  const spillereListe = spillere.filter(
    (spiller) => !sok || spiller.navn.toLowerCase().includes(sok.toLowerCase())
  );

  return (
    <div className="max-w-4xl p-8">
      <h1 className="mb-4 text-3xl font-bold">Spillere</h1>
      <Link href="/spillere/opprett">Opprett spiller</Link>
      <div className="mt-4 flex flex-col gap-4">
        <SpillerSok />
        <SpillereListe spillere={spillereListe} />
      </div>
    </div>
  );
}
```

</details>

---

#### Oppgave 8b – Legg til sortering

Nå skal du legge til en `<Select>` fra shadcn slik at brukeren kan velge sorteringsrekkefølge. Verdien lagres i URL-en som `?sorter=rating-desc`, og sorteringen gjøres i `page.tsx` på serveren.

Her er noen forslag til sorteringsalternativer du kan ta utgangspunkt i:

| Verdi         | Beskrivelse                     |
| ------------- | ------------------------------- |
| `rating-desc` | Rating (høyest først), standard |
| `rating-asc`  | Rating (lavest først)           |
| `navn-asc`    | Navn (A-Z)                      |

Importer `Select`-komponentene fra shadcn i `SpillerSok`:

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
```

Definer alternativene som en liste utenfor komponenten, og bruk `.map()` til å rendre dem:

```tsx
const sorteringsalternativer = [
  { verdi: "rating-desc", label: "Rating (høyest først)" },
  { verdi: "rating-asc", label: "Rating (lavest først)" },
  { verdi: "navn-asc", label: "Navn (A-Z)" },
];
```

```tsx
<Select value={sorter} onValueChange={handleSorter}>
  <SelectTrigger className="w-48">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {sorteringsalternativer.map((alternativ) => (
      <SelectItem key={alternativ.verdi} value={alternativ.verdi}>
        {alternativ.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

Les sorteringen fra URL-en med `searchParams.get("sorter") ?? "rating-desc"`, og skriv den på samme måte som søket.

I `page.tsx` leser du `sorter` fra `searchParams` og kjeder filtrering og sortering i én operasjon:

```tsx
const spillereListe = spillere
  .filter(
    (spiller) => !sok || spiller.navn.toLowerCase().includes(sok.toLowerCase())
  )
  .sort((a, b) => {
    if (sorter === "rating-asc") return a.rating - b.rating;
    if (sorter === "navn-asc") return a.navn.localeCompare(b.navn);
    return b.rating - a.rating;
  });
```

<details class="losningsforslag">
<summary>Løsningsforslag 8b</summary>

`spiller-sok.tsx`:

```tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sorteringsalternativer = [
  { verdi: "rating-desc", label: "Rating (høyest først)" },
  { verdi: "rating-asc", label: "Rating (lavest først)" },
  { verdi: "navn-asc", label: "Navn (A-Z)" },
];

export default function SpillerSok() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sok = searchParams.get("sok") ?? "";
  const sorter = searchParams.get("sorter") ?? "rating-desc";

  function oppdaterParams(nokkel: string, verdi: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (verdi) {
      params.set(nokkel, verdi);
    } else {
      params.delete(nokkel);
    }
    router.replace(`/spillere?${params.toString()}`);
  }

  return (
    <div className="flex gap-4">
      <input
        value={sok}
        onChange={(e) => oppdaterParams("sok", e.target.value)}
        placeholder="Søk etter spiller..."
        className="rounded border px-3 py-2"
      />
      <Select
        value={sorter}
        onValueChange={(verdi) => oppdaterParams("sorter", verdi)}
      >
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sorteringsalternativer.map((alternativ) => (
            <SelectItem key={alternativ.verdi} value={alternativ.verdi}>
              {alternativ.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

`page.tsx`:

```tsx
import { Spiller } from "@/lib/types";
import SpillerSok from "./spiller-sok";
import SpillereListe from "./spillere-liste";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ sok?: string; sorter?: string }>;
};

export default async function SpillerePage({ searchParams }: Props) {
  const { sok, sorter = "rating-desc" } = await searchParams;

  const response = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await response.json();

  const spillereListe = spillere
    .filter(
      (spiller) =>
        !sok || spiller.navn.toLowerCase().includes(sok.toLowerCase())
    )
    .sort((a, b) => {
      if (sorter === "rating-asc") return a.rating - b.rating;
      if (sorter === "navn-asc") return a.navn.localeCompare(b.navn);
      return b.rating - a.rating;
    });

  return (
    <div className="max-w-4xl p-8">
      <h1 className="mb-4 text-3xl font-bold">Spillere</h1>
      <Link href="/spillere/opprett">Opprett spiller</Link>
      <div className="mt-4 flex flex-col gap-4">
        <SpillerSok />
        <SpillereListe spillere={spillereListe} />
      </div>
    </div>
  );
}
```

</details>

---

#### Oppgave 8c – Debounce på søket

Med server-side filtrering sendes det en nettverksforespørsel for hvert tastetrykk. For de fleste brukere går det fort nok til at det ikke merkes, men det er unødvendig mange kall og kan skape flimring i listen mens brukeren skriver.

Løsningen er debounce: i stedet for å oppdatere URL-en umiddelbart ved hvert tastetrykk, venter vi til brukeren har sluttet å skrive i 300 millisekunder.

For at inputfeltet skal føles responsivt mens vi venter, trenger vi en lokal `useState` for inputverdien igjen. `useState` og URL-tilstand brukes nå med hvert sitt ansvar:

- `useState` holder den lokale inputverdien og oppdateres umiddelbart
- URL-en oppdateres først etter at brukeren har sluttet å skrive

Installer `use-debounce`:

```bash
pnpm add use-debounce
```

Importer `useDebouncedCallback` i `SpillerSok`:

```tsx
import { useDebouncedCallback } from "use-debounce";
```

`useDebouncedCallback` tar en funksjon og antall millisekunder, og returnerer en ny versjon av funksjonen som bare kjøres etter at den ikke har blitt kalt på det antallet millisekunder:

```tsx
const debouncedOppdater = useDebouncedCallback((verdi: string) => {
  oppdaterParams("sok", verdi);
}, 300);
```

Legg til `useState` for inputverdien og koble debounce til `onChange`:

```tsx
const [inputVerdi, setInputVerdi] = useState(searchParams.get("sok") ?? "");

function handleChange(verdi: string) {
  setInputVerdi(verdi);
  debouncedOppdater(verdi);
}
```

Bruk `inputVerdi` som `value` på inputfeltet i stedet for `sok`.

<details class="losningsforslag">
<summary>Løsningsforslag 8c</summary>

```tsx
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sorteringsalternativer = [
  { verdi: "rating-desc", label: "Rating (høyest først)" },
  { verdi: "rating-asc", label: "Rating (lavest først)" },
  { verdi: "navn-asc", label: "Navn (A-Z)" },
];

export default function SpillerSok() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sorter = searchParams.get("sorter") ?? "rating-desc";
  const [inputVerdi, setInputVerdi] = useState(searchParams.get("sok") ?? "");

  function oppdaterParams(nokkel: string, verdi: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (verdi) {
      params.set(nokkel, verdi);
    } else {
      params.delete(nokkel);
    }
    router.replace(`/spillere?${params.toString()}`);
  }

  const debouncedOppdater = useDebouncedCallback((verdi: string) => {
    oppdaterParams("sok", verdi);
  }, 300);

  function handleChange(verdi: string) {
    setInputVerdi(verdi);
    debouncedOppdater(verdi);
  }

  return (
    <div className="flex gap-4">
      <input
        value={inputVerdi}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Søk etter spiller..."
        className="rounded border px-3 py-2"
      />
      <Select
        value={sorter}
        onValueChange={(verdi) => oppdaterParams("sorter", verdi)}
      >
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sorteringsalternativer.map((alternativ) => (
            <SelectItem key={alternativ.verdi} value={alternativ.verdi}>
              {alternativ.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

</details>

---

#### Oppgave 8d – Loading-tilstand med skeletons

Når brukeren søker, venter nettleseren på at serveren skal filtrere og returnere siden. Uten noe feedback ser det ut som ingenting skjer. Next.js har en innebygd mekanisme for dette: filen `loading.tsx`.

Legg til `loading.tsx` i samme mappe som `page.tsx`, altså `src/app/spillere/loading.tsx`. Next.js viser innholdet i denne filen automatisk mens `page.tsx` laster.

For å gjøre effekten tydelig mens du utvikler, kan du legge til en kunstig forsinkelse øverst i `page.tsx`. Denne linjen gjør at siden venter i 2 sekunder før den returnerer innhold:

```tsx
await new Promise((resolve) => setTimeout(resolve, 2000));
```

Dette er utelukkende for å simulere en treg server slik at du rekker å se loading-tilstanden. **Husk å fjerne den igjen** når du er ferdig med oppgaven.

En spinner forteller brukeren at noe laster, men gir ingen hint om hva som kommer. **Skeleton-komponenter** er plassholdere som har samme form som innholdet de erstatter. Det gir en bedre opplevelse fordi siden ikke "hopper" når innholdet dukker opp.

Vi har laget en ferdig `SpillerCardSkeleton`-komponent som matcher formen på `SpillerCard`. Opprett `loading.tsx` med dette innholdet:

```tsx
import { Skeleton } from "@/components/ui/skeleton";

function SpillerCardSkeleton() {
  return (
    <div className="rounded-lg border p-4">
      <Skeleton className="mb-2 h-6 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SpillerCardSkeleton key={i} />
      ))}
    </div>
  );
}
```

`Array.from({ length: 6 })` lager et tomt array med 6 elementer som vi mapper over for å rendre 6 skeleton-kort som fyller gridet mens siden laster.

Legg til den kunstige forsinkelsen i `page.tsx`, søk i feltet, og observer at skeletons dukker opp mens siden laster. Fjern forsinkelsen når du er fornøyd.

---

## Oppgave 9 – Alt du kan, brukt på nytt

Denne oppgaven er en repetisjon. Du skal bygge kamphistorikk-siden fra bunnen av, og alt du trenger har du gjort i tidligere oppgaver:

| Hva                                                     | Lært i         |
| ------------------------------------------------------- | -------------- |
| Hente data fra et API i en Server Component             | Oppgave 2      |
| Lese `searchParams` og `params`                         | Oppgave 3 og 8 |
| Registreringsskjema med React Hook Form og Select       | Oppgave 5      |
| Redigeringsdialog med Dialog og forhåndsutfylte verdier | Oppgave 6      |
| Slettebekreftelse med AlertDialog                       | Oppgave 7      |

Det eneste som er nytt er `Table`- og `Pagination`-komponentene, som du får instruksjoner for i 9a.

Alle endepunktene er dokumentert i `/api-docs`. Bruk dem aktivt når du lurer på hva API-et forventer eller returnerer.

Datamodellen for en kamp ser slik ut:

```ts
type Kamp = {
  id: number;
  lagVinner: number; // 1 eller 2
  taperMaal: number; // 0–9, vinnerlaget scorer alltid 10
  dato: string;
  lag1Spiller1: Spiller;
  lag1Spiller2: Spiller;
  lag2Spiller1: Spiller;
  lag2Spiller2: Spiller;
};
```

Se gjerne på `/api-docs` for å utforske endepunktene og prøve dem ut.

---

#### Oppgave 9a – Kamphistorikk-siden

Opprett `src/app/kamper/page.tsx`. Siden skal hente kamper fra `GET /api/kamper` og vise dem i en tabell med disse kolonnene: dato, lag 1, resultat, lag 2, og en handlingskolonne med tre knapper per rad: "Gå til kamp", "Rediger" og "Slett".

API-et støtter paginering via `?side=1&perSide=10` og returnerer `{ kamper, totalt }`. Les `side` fra `searchParams` på samme måte som du leste `sok` og `sorter` i oppgave 8.

**Tabellen** bygger du med disse komponentene fra shadcn:

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
```

Strukturen er rett frem:

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Dato</TableHead>
      <TableHead>Lag 1</TableHead>
      <TableHead>Resultat</TableHead>
      <TableHead>Lag 2</TableHead>
      <TableHead></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {kamper.map((kamp) => (
      <TableRow key={kamp.id}>
        <TableCell>...</TableCell>
        {/* osv. */}
      </TableRow>
    ))}
  </TableBody>
</Table>
```

For resultatet: vinnerlaget scorer alltid 10, taperlaget scorer `taperMaal`. Bruk `kamp.lagVinner` til å avgjøre hvilken side som får 10 og hvilken som får `taperMaal`.

**Pagineringen** bygger du med disse komponentene:

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
```

`PaginationPrevious` og `PaginationNext` tar en `href`-prop. Beregn forrige og neste sidenummer basert på `side` og `totalt`, og bygg URL-ene med `?side=X`. Skjul knappene når det ikke finnes en forrige eller neste side.

Legg til en lenke til kamphistorikk-siden i navigasjonen. "Gå til kamp"-knappen kan du lage med `<Button asChild><Link href={...}>...</Link></Button>`.

For "Rediger" og "Slett" trenger du `RedigerKampDialog` og `SlettKampKnapp` fra oppgave 9d og 9e. Siden disse er Client Components kan du importere dem direkte i Server Component-siden. Page.tsx må i tillegg hente spillerlisten fra `GET /api/spillere` for å sende videre til redigeringsdialogen.

<details class="losningsforslag">
<summary>Løsningsforslag 9a</summary>

```tsx
import { Kamp, Spiller } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import RedigerKampDialog from "./components/rediger-kamp-dialog";
import SlettKampKnapp from "./components/slett-kamp-knapp";

const PER_SIDE = 10;

type Props = {
  searchParams: Promise<{ side?: string }>;
};

export default async function KamperPage({ searchParams }: Props) {
  const { side: sideParam } = await searchParams;
  const side = Math.max(1, parseInt(sideParam ?? "1"));

  const [kamperResponse, spillereResponse] = await Promise.all([
    fetch(`http://localhost:3000/api/kamper?side=${side}&perSide=${PER_SIDE}`),
    fetch("http://localhost:3000/api/spillere"),
  ]);
  const { kamper, totalt }: { kamper: Kamp[]; totalt: number } =
    await kamperResponse.json();
  const spillere: Spiller[] = await spillereResponse.json();

  const antallSider = Math.ceil(totalt / PER_SIDE);

  function resultat(kamp: Kamp) {
    const lag1Maal = kamp.lagVinner === 1 ? 10 : kamp.taperMaal;
    const lag2Maal = kamp.lagVinner === 2 ? 10 : kamp.taperMaal;
    return `${lag1Maal} – ${lag2Maal}`;
  }

  return (
    <div className="max-w-5xl p-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kamphistorikk</h1>
        <Button asChild>
          <Link href="/kamper/opprett">Registrer kamp</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dato</TableHead>
            <TableHead>Lag 1</TableHead>
            <TableHead>Resultat</TableHead>
            <TableHead>Lag 2</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kamper.map((kamp) => (
            <TableRow key={kamp.id}>
              <TableCell>
                {new Date(kamp.dato).toLocaleDateString("nb-NO")}
              </TableCell>
              <TableCell>
                {kamp.lag1Spiller1.navn} & {kamp.lag1Spiller2.navn}
              </TableCell>
              <TableCell className="font-mono">{resultat(kamp)}</TableCell>
              <TableCell>
                {kamp.lag2Spiller1.navn} & {kamp.lag2Spiller2.navn}
              </TableCell>
              <TableCell className="flex items-center justify-end gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/kamper/${kamp.id}`}>Gå til kamp →</Link>
                </Button>
                <RedigerKampDialog kamp={kamp} spillere={spillere} />
                <SlettKampKnapp kamp={kamp} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            {side > 1 && (
              <PaginationPrevious
                href={`/kamper?side=${side - 1}`}
                text="Forrige"
              />
            )}
          </PaginationItem>
          <PaginationItem>
            {side < antallSider && (
              <PaginationNext href={`/kamper?side=${side + 1}`} text="Neste" />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
```

</details>

---

#### Oppgave 9b – Kampdetaljer

Opprett `src/app/kamper/[id]/page.tsx` og vis detaljer om én kamp: spillerne i hvert lag, resultatet og datoen. Legg til en "Tilbake"-lenke til kamphistorikk-siden.

> **Hint:** Du har gjort dette eksakt for spillere i oppgave 3. Mønsteret er det samme: async Server Component, `await params`, fetch mot `/api/kamper/:id`, vis data.
>
> For resultatet: `kamp.lagVinner` er `1` eller `2`. Vinnerlaget scorer alltid 10. Bruk en ternary for å avgjøre hvem som scorer hva.

<details class="losningsforslag">
<summary>Løsningsforslag 9b</summary>

`src/app/kamper/[id]/page.tsx`:

```tsx
import { Kamp } from "@/lib/types";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function KampPage({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/kamper/${id}`);
  const kamp: Kamp = await response.json();

  const lag1Maal = kamp.lagVinner === 1 ? 10 : kamp.taperMaal;
  const lag2Maal = kamp.lagVinner === 2 ? 10 : kamp.taperMaal;

  return (
    <div className="max-w-2xl p-8">
      <Link href="/kamper" className="text-muted-foreground text-sm">
        Tilbake til kamphistorikk
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Kamp</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        {new Date(kamp.dato).toLocaleDateString("nb-NO")}
      </p>
      <div className="mt-6 flex items-center gap-8">
        <div>
          <p className="font-semibold">Lag 1</p>
          <p>{kamp.lag1Spiller1.navn}</p>
          <p>{kamp.lag1Spiller2.navn}</p>
        </div>
        <p className="font-mono text-3xl font-bold">
          {lag1Maal} – {lag2Maal}
        </p>
        <div>
          <p className="font-semibold">Lag 2</p>
          <p>{kamp.lag2Spiller1.navn}</p>
          <p>{kamp.lag2Spiller2.navn}</p>
        </div>
      </div>
    </div>
  );
}
```

</details>

---

#### Oppgave 9c – Registrer kamp

Opprett `src/app/kamper/opprett/page.tsx` med et skjema for å registrere en ny kamp. Skjemaet trenger fire spillervalg, valg av vinnende lag og antall mål for taperlaget (0–9).

Request body-en til `POST /api/kamper` ser slik ut:

```ts
{
  lag1Spiller1Id: number;
  lag1Spiller2Id: number;
  lag2Spiller1Id: number;
  lag2Spiller2Id: number;
  lagVinner: number; // 1 eller 2
  taperMaal: number; // 0–9
}
```

Legg til en lenke til registreringssiden fra kamphistorikk-siden.

> **Hint:** Del opp i to filer: en Server Component (`page.tsx`) som henter spillerlisten og sender den som prop til en Client Component (`opprett-kamp-skjema.tsx`) som håndterer skjemaet. Du har gjort denne oppdelingen i oppgave 5.
>
> `Select`-komponenten fra shadcn fungerer ikke direkte med React Hook Form sin `register`. Bruk `setValue` og `watch` i stedet, slik du lærte i oppgave 6. Lag en gjenbrukbar `SpillerVelger`-komponent i `src/app/kamper/components/spiller-velger.tsx` som tar `spillere`, `value` og `onChange` som props. Samme komponent brukes i 9d.
>
> For å hindre at samme spiller velges to ganger: `watch` alle fire spillerfelt og filtrer bort de som allerede er valgt i andre dropdowns, før du sender listen til `SpillerVelger`.
>
> HTML-verdier er alltid strenger, men API-et forventer tall. Husk `parseInt()` før du sender data.

<details class="losningsforslag">
<summary>Løsningsforslag 9c</summary>

`src/app/kamper/components/spiller-velger.tsx`:

```tsx
"use client";

import { Spiller } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  label: string;
  spillere: Spiller[];
  value: string;
  onChange: (val: string) => void;
};

export default function SpillerVelger({
  label,
  spillere,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Velg spiller" />
        </SelectTrigger>
        <SelectContent>
          {spillere.map((s) => (
            <SelectItem key={s.id} value={String(s.id)}>
              {s.navn}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

`src/app/kamper/opprett/page.tsx`:

```tsx
import { Spiller } from "@/lib/types";
import OpprettKampSkjema from "./opprett-kamp-skjema";

export default async function OpprettKampPage() {
  const response = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await response.json();

  return (
    <div className="max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Registrer kamp</h1>
      <OpprettKampSkjema spillere={spillere} />
    </div>
  );
}
```

`src/app/kamper/opprett/opprett-kamp-skjema.tsx`:

```tsx
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Spiller } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SpillerVelger from "@/app/kamper/components/spiller-velger";

type SkjemaData = {
  lag1Spiller1Id: string;
  lag1Spiller2Id: string;
  lag2Spiller1Id: string;
  lag2Spiller2Id: string;
  lagVinner: string;
  taperMaal: string;
};

type Props = {
  spillere: Spiller[];
};

const taperMaalAlternativer = Array.from({ length: 10 }, (_, i) => String(i));

export default function OpprettKampSkjema({ spillere }: Props) {
  const router = useRouter();
  const { handleSubmit, setValue, watch } = useForm<SkjemaData>();

  const [s1, s2, s3, s4] = [
    watch("lag1Spiller1Id"),
    watch("lag1Spiller2Id"),
    watch("lag2Spiller1Id"),
    watch("lag2Spiller2Id"),
  ];

  function tilgjengelige(ekskluder: (string | undefined)[]) {
    const ids = ekskluder.filter(Boolean) as string[];
    return spillere.filter((s) => !ids.includes(String(s.id)));
  }

  async function registrerKampResultat(data: SkjemaData) {
    await fetch("http://localhost:3000/api/kamper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lag1Spiller1Id: parseInt(data.lag1Spiller1Id),
        lag1Spiller2Id: parseInt(data.lag1Spiller2Id),
        lag2Spiller1Id: parseInt(data.lag2Spiller1Id),
        lag2Spiller2Id: parseInt(data.lag2Spiller2Id),
        lagVinner: parseInt(data.lagVinner),
        taperMaal: parseInt(data.taperMaal),
      }),
    });
    router.push("/kamper");
  }

  return (
    <form
      onSubmit={handleSubmit(registrerKampResultat)}
      className="flex flex-col gap-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Lag 1</p>
          <SpillerVelger
            label="Spiller 1"
            spillere={tilgjengelige([s2, s3, s4])}
            value={s1 ?? ""}
            onChange={(val) => setValue("lag1Spiller1Id", val)}
          />
          <SpillerVelger
            label="Spiller 2"
            spillere={tilgjengelige([s1, s3, s4])}
            value={s2 ?? ""}
            onChange={(val) => setValue("lag1Spiller2Id", val)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Lag 2</p>
          <SpillerVelger
            label="Spiller 1"
            spillere={tilgjengelige([s1, s2, s4])}
            value={s3 ?? ""}
            onChange={(val) => setValue("lag2Spiller1Id", val)}
          />
          <SpillerVelger
            label="Spiller 2"
            spillere={tilgjengelige([s1, s2, s3])}
            value={s4 ?? ""}
            onChange={(val) => setValue("lag2Spiller2Id", val)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Vinnende lag</label>
        <Select
          value={watch("lagVinner") ?? ""}
          onValueChange={(val) => setValue("lagVinner", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Velg lag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Lag 1</SelectItem>
            <SelectItem value="2">Lag 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Taperlagets mål</label>
        <Select
          value={watch("taperMaal") ?? ""}
          onValueChange={(val) => setValue("taperMaal", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Velg antall mål" />
          </SelectTrigger>
          <SelectContent>
            {taperMaalAlternativer.map((maal) => (
              <SelectItem key={maal} value={maal}>
                {maal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Registrer kamp</Button>
    </form>
  );
}
```

</details>

---

#### Oppgave 9d – Rediger kamp

Opprett en redigeringsdialog som brukes i tabellen fra 9a. Dialogen skal ha et skjema forhåndsutfylt med gjeldende verdier og sende `PUT` til `/api/kamper/:id`.

> **Hint:** Dette er samme mønster som `rediger-spiller-dialog.tsx` fra oppgave 6. Opprett komponenten i `src/app/kamper/components/rediger-kamp-dialog.tsx` og ta inn `kamp` og `spillere` som props. Bruk `SpillerVelger`-komponenten fra 9c med samme filtreringslogikk.
>
> For å forhåndsutfylle `Select`-feltene: bruk `defaultValues` i `useForm` og pass `String(kamp.lag1Spiller1.id)` som verdi. ID-ene til spillerne i kampen finner du via de nestede spillerobjektene, f.eks. `kamp.lag1Spiller1.id`.
>
> Etter vellykket PUT: kall `router.refresh()` for å oppdatere tabellen uten full navigasjon.

<details class="losningsforslag">
<summary>Løsningsforslag 9d</summary>

`src/app/kamper/components/rediger-kamp-dialog.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Kamp, Spiller } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SpillerVelger from "./spiller-velger";

type SkjemaData = {
  lag1Spiller1Id: string;
  lag1Spiller2Id: string;
  lag2Spiller1Id: string;
  lag2Spiller2Id: string;
  lagVinner: string;
  taperMaal: string;
};

type Props = {
  kamp: Kamp;
  spillere: Spiller[];
};

const taperMaalAlternativer = Array.from({ length: 10 }, (_, i) => String(i));

export default function RedigerKampDialog({ kamp, spillere }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { handleSubmit, setValue, watch } = useForm<SkjemaData>({
    defaultValues: {
      lag1Spiller1Id: String(kamp.lag1Spiller1.id),
      lag1Spiller2Id: String(kamp.lag1Spiller2.id),
      lag2Spiller1Id: String(kamp.lag2Spiller1.id),
      lag2Spiller2Id: String(kamp.lag2Spiller2.id),
      lagVinner: String(kamp.lagVinner),
      taperMaal: String(kamp.taperMaal),
    },
  });

  const [s1, s2, s3, s4] = [
    watch("lag1Spiller1Id"),
    watch("lag1Spiller2Id"),
    watch("lag2Spiller1Id"),
    watch("lag2Spiller2Id"),
  ];

  function tilgjengelige(ekskluder: (string | undefined)[]) {
    const ids = ekskluder.filter(Boolean) as string[];
    return spillere.filter((s) => !ids.includes(String(s.id)));
  }

  async function registrerKampResultat(data: SkjemaData) {
    await fetch(`http://localhost:3000/api/kamper/${kamp.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lag1Spiller1Id: parseInt(data.lag1Spiller1Id),
        lag1Spiller2Id: parseInt(data.lag1Spiller2Id),
        lag2Spiller1Id: parseInt(data.lag2Spiller1Id),
        lag2Spiller2Id: parseInt(data.lag2Spiller2Id),
        lagVinner: parseInt(data.lagVinner),
        taperMaal: parseInt(data.taperMaal),
      }),
    });
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Rediger
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger kamp</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(registrerKampResultat)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Lag 1</p>
              <SpillerVelger
                label="Spiller 1"
                spillere={tilgjengelige([s2, s3, s4])}
                value={s1}
                onChange={(val) => setValue("lag1Spiller1Id", val)}
              />
              <SpillerVelger
                label="Spiller 2"
                spillere={tilgjengelige([s1, s3, s4])}
                value={s2}
                onChange={(val) => setValue("lag1Spiller2Id", val)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Lag 2</p>
              <SpillerVelger
                label="Spiller 1"
                spillere={tilgjengelige([s1, s2, s4])}
                value={s3}
                onChange={(val) => setValue("lag2Spiller1Id", val)}
              />
              <SpillerVelger
                label="Spiller 2"
                spillere={tilgjengelige([s1, s2, s3])}
                value={s4}
                onChange={(val) => setValue("lag2Spiller2Id", val)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Vinnende lag</label>
            <Select
              value={watch("lagVinner")}
              onValueChange={(val) => setValue("lagVinner", val)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Lag 1</SelectItem>
                <SelectItem value="2">Lag 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Taperlagets mål</label>
            <Select
              value={watch("taperMaal")}
              onValueChange={(val) => setValue("taperMaal", val)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {taperMaalAlternativer.map((maal) => (
                  <SelectItem key={maal} value={maal}>
                    {maal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Lagre endringer</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

Importer og bruk dialogen i `src/app/kamper/page.tsx` slik det er vist i løsningsforslaget for 9a.

</details>

---

#### Oppgave 9e – Slett kamp

Opprett en sletteknapp som brukes i tabellen fra 9a. Knappen skal bekrefte handlingen og sende `DELETE` til `/api/kamper/:id`.

> **Hint:** Dette er nesten identisk med `slett-spiller-knapp.tsx` fra oppgave 7. Opprett komponenten i `src/app/kamper/components/slett-kamp-knapp.tsx`.
>
> Siden brukeren allerede er på listesiden, bruker du `router.refresh()` etter sletting i stedet for `router.push()`. Det oppdaterer tabellen uten å navigere bort.

<details class="losningsforslag">
<summary>Løsningsforslag 9e</summary>

`src/app/kamper/components/slett-kamp-knapp.tsx`:

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
import { Kamp } from "@/lib/types";

type Props = {
  kamp: Kamp;
};

export default function SlettKampKnapp({ kamp }: Props) {
  const router = useRouter();

  async function slettKamp() {
    await fetch(`http://localhost:3000/api/kamper/${kamp.id}`, {
      method: "DELETE",
    });
    router.refresh();
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
            Dette vil permanent slette kampen. Handlingen kan ikke angres.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction onClick={slettKamp}>Slett</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

</details>

---

## Oppgave 10 – Dashboard

**Hva du skal lære:** Streaming med React `Suspense`, parallell datahenting med `Promise.all`, og å bygge en sammensatt side av uavhengige seksjoner.

Hittil har sidene i applikasjonen hentet data én gang og vist alt på en gang. Det fungerer bra for enkle sider, men tenk deg en dashboard-side med fire uavhengige seksjoner. Hvis én av dem er treg, blokkerer den alle de andre.

Løsningen er **streaming**: i stedet for å vente på at all data er klar, sender serveren HTML til nettleseren etter hvert som den er klar. Hver seksjon vises så snart dataen den trenger er tilgjengelig.

I Next.js App Router er dette innebygd og fungerer gjennom to mekanismer du kjenner igjen:

- **Async Server Components**, en komponent som er `async` vil suspende Reacts renderingssyklus til den er ferdig
- **`<Suspense>`**, en wrapper som viser et fallback mens den venter, og bytter til innholdet når det er klart

Fordi `page.tsx` selv ikke er async, returnerer den umiddelbart med Suspense-grensene på plass. Nettleseren ser strukturen med det samme, og seksjonene fyller seg inn etter hvert.

```
page.tsx rendrer umiddelbart
│
├── <Suspense> ← viser skeleton
│     └── <StatistikkKort> ← async, streamer inn
│
├── <Suspense> ← viser skeleton
│     └── <Toppliste> ← async, streamer inn
│
└── <Suspense> ← viser skeleton
      └── <SisteKamper> ← async, streamer inn
```

---

#### Oppgave 10a – Opprett dashboard-siden

Opprett `src/app/dashboard/page.tsx` med en overskrift og en navigasjonslenke i `side-nav.tsx`.

`page.tsx` skal **ikke** være `async`, siden rendrer umiddelbart og overlater datahenteninga til underseksjonene.

<details class="losningsforslag">
<summary>Løsningsforslag 10a</summary>

`src/app/dashboard/page.tsx`:

```tsx
export default function DashboardPage() {
  return (
    <div className="max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
    </div>
  );
}
```

Legg til lenken i `src/components/side-nav.tsx` på samme måte som de eksisterende lenkene.

</details>

---

#### Oppgave 10b – Statistikkort

Opprett `src/app/dashboard/components/statistikk-kort.tsx`. Komponenten skal vise to nøkkeltall:

- Totalt antall spillere
- Totalt antall kamper

Begge hentes parallelt med `Promise.all`. Du trenger bare `totalt` fra kamp-responsen, bruk `?side=1&perSide=1` slik at API-et returnerer minst mulig data:

```tsx
const [spillereRes, kamperRes] = await Promise.all([
  fetch("http://localhost:3000/api/spillere"),
  fetch("http://localhost:3000/api/kamper?side=1&perSide=1"),
]);
const spillere: Spiller[] = await spillereRes.json();
const { totalt }: { totalt: number } = await kamperRes.json();
```

Vis tallene i `Card`-komponenter fra shadcn:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Spillere</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-4xl font-bold">{spillere.length}</p>
  </CardContent>
</Card>;
```

<details class="losningsforslag">
<summary>Løsningsforslag 10b</summary>

`src/app/dashboard/components/statistikk-kort.tsx`:

```tsx
import { Spiller } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function StatistikkKort() {
  const [spillereRes, kamperRes] = await Promise.all([
    fetch("http://localhost:3000/api/spillere"),
    fetch("http://localhost:3000/api/kamper?side=1&perSide=1"),
  ]);
  const spillere: Spiller[] = await spillereRes.json();
  const { totalt }: { totalt: number } = await kamperRes.json();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Spillere</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{spillere.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Kamper spilt</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalt}</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

</details>

---

#### Oppgave 10c – Toppliste

Opprett `src/app/dashboard/components/toppliste.tsx`. Komponenten henter alle spillere fra `/api/spillere`, sorterer dem på `rating` (høyest først) og viser de fem øverste i en liste. Bruk `Card` som wrapper.

<details class="hint">
<summary>Hint</summary>

```tsx
const topp5 = spillere.sort((a, b) => b.rating - a.rating).slice(0, 5);
```

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 10c</summary>

`src/app/dashboard/components/toppliste.tsx`:

```tsx
import { Spiller } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Toppliste() {
  const res = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await res.json();

  const topp5 = spillere.sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Toppliste</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-2">
          {topp5.map((spiller, index) => (
            <li key={spiller.id} className="flex items-center justify-between">
              <span>
                <span className="text-muted-foreground mr-3">{index + 1}.</span>
                {spiller.navn}
              </span>
              <span className="font-mono font-semibold">{spiller.rating}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
```

</details>

---

#### Oppgave 10d – Siste kamper

Opprett `src/app/dashboard/components/siste-kamper.tsx`. Komponenten henter de fem siste kampene fra `/api/kamper?side=1&perSide=5` og viser dem i en liste med dato og lagoppstilling. Bruk `Card` som wrapper.

<details class="losningsforslag">
<summary>Løsningsforslag 10d</summary>

`src/app/dashboard/components/siste-kamper.tsx`:

```tsx
import { Kamp } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SisteKamper() {
  const res = await fetch("http://localhost:3000/api/kamper?side=1&perSide=5");
  const { kamper }: { kamper: Kamp[] } = await res.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Siste kamper</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {kamper.map((kamp) => {
            const lag1Maal = kamp.lagVinner === 1 ? 10 : kamp.taperMaal;
            const lag2Maal = kamp.lagVinner === 2 ? 10 : kamp.taperMaal;
            return (
              <li
                key={kamp.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">
                  {new Date(kamp.dato).toLocaleDateString("nb-NO")}
                </span>
                <span>
                  {kamp.lag1Spiller1.navn} & {kamp.lag1Spiller2.navn}
                </span>
                <span className="font-mono font-semibold">
                  {lag1Maal} – {lag2Maal}
                </span>
                <span>
                  {kamp.lag2Spiller1.navn} & {kamp.lag2Spiller2.navn}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
```

</details>

---

#### Oppgave 10e – Koble alt sammen med Suspense

Gå tilbake til `page.tsx`. Importer de tre komponentene og wrap hver av dem i sin egen `<Suspense>` med en passende `fallback`.

```tsx
import { Suspense } from "react";
import StatistikkKort from "./components/statistikk-kort";
import Toppliste from "./components/toppliste";
import SisteKamper from "./components/siste-kamper";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <Suspense fallback={<p>Laster statistikk...</p>}>
        <StatistikkKort />
      </Suspense>
      {/* ... */}
    </div>
  );
}
```

For å se streamingen tydelig, legg til en kunstig forsinkelse i én av seksjonene og observer at de andre ikke venter på den:

```tsx
await new Promise((resolve) => setTimeout(resolve, 2000));
```

**Husk å fjerne forsinkelsen igjen når du er ferdig.**

<details class="hint">
<summary>Hint</summary>

Hver seksjon skal ha sin egen `<Suspense>`-wrapper, ikke én felles. Én felles Suspense ville ventet på at alle tre var klare før noe ble vist.

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 10e</summary>

`src/app/dashboard/page.tsx`:

```tsx
import { Suspense } from "react";
import StatistikkKort from "./components/statistikk-kort";
import Toppliste from "./components/toppliste";
import SisteKamper from "./components/siste-kamper";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="flex flex-col gap-6">
        <Suspense fallback={<p>Laster statistikk...</p>}>
          <StatistikkKort />
        </Suspense>
        <div className="grid grid-cols-2 gap-6">
          <Suspense fallback={<p>Laster toppliste...</p>}>
            <Toppliste />
          </Suspense>
          <Suspense fallback={<p>Laster kamper...</p>}>
            <SisteKamper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
```

</details>

---

#### Oppgave 10f – Skeletons som fallback

Bytt ut de enkle tekstfallbackene med skeletons som matcher formen på innholdet. Bruk `Skeleton` fra shadcn og `Card` slik at layouten ikke hopper når innholdet dukker opp.

```tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function StatistikkKortSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

Lag tilsvarende skeletons for `Toppliste` og `SisteKamper` og send dem inn som `fallback` i `<Suspense>`.

<details class="losningsforslag">
<summary>Løsningsforslag 10f</summary>

Legg skeletonkomponentene direkte i `page.tsx` siden de bare brukes der:

```tsx
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatistikkKort from "./components/statistikk-kort";
import Toppliste from "./components/toppliste";
import SisteKamper from "./components/siste-kamper";

function StatistikkKortSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ListeSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="flex flex-col gap-6">
        <Suspense fallback={<StatistikkKortSkeleton />}>
          <StatistikkKort />
        </Suspense>
        <div className="grid grid-cols-2 gap-6">
          <Suspense fallback={<ListeSkeleton />}>
            <Toppliste />
          </Suspense>
          <Suspense fallback={<ListeSkeleton />}>
            <SisteKamper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
```

</details>

---

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
