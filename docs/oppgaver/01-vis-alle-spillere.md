<!-- nav:start -->
[Oversikt](../../README.md#oppgaver) · [Oppgave 2 →](./02-spillerdetaljer.md)
<!-- nav:end -->

## Oppgave 1 – Vis alle spillere

**Hva du skal lære:** HTML/JSX, React-komponenter, props, TypeScript-typer, iterering med `.map()`, og henting av data fra API med server components.

<details>
<summary>Kort om HTML</summary>

HTML (HyperText Markup Language) er språket nettlesere bruker til å strukturere innhold på en side. JSX, som vi skal bruke i React, ligner veldig på HTML, så det er greit å kjenne det grunnleggende før vi går videre.

Byggeklossen i HTML kalles et **element**. Et element består vanligvis av en **åpnetag**, noe innhold, og en **lukketag**:

```html
<p>Dette er et avsnitt</p>
```

`<p>` er åpnetaggen, `</p>` er lukketaggen (legg merke til skråstreken), og teksten mellom dem er innholdet. Noen elementer, som `<img>`, har ikke noe innhold og trenger derfor ingen lukketag.

Elementer kan ha **attributter**, ekstra informasjon skrevet inni åpnetaggen:

```html
<img src="/bilde.png" alt="Beskrivelse av bildet" />
```

Her er `src` og `alt` attributter. `src` sier hvor bildet ligger, `alt` er en tekstlig beskrivelse av bildet.

Noen tags du kommer til å bruke mye i dette kurset:

| Tag                      | Brukes til                                        |
| ------------------------ | ------------------------------------------------- |
| `<div>`                  | En generisk beholder for annet innhold, en "boks" |
| `<p>`                    | Et avsnitt med tekst                              |
| `<h1>` til og med `<h6>` | Overskrifter, `<h1>` er størst og `<h6>` er minst |
| `<img>`                  | Vise et bilde                                     |
| `<a>`                    | En lenke til en annen side                        |

Du kommer til å få nøyere innføring i enkelte elementer senere i kurset der du først skal ta de i bruk.

</details>

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

Når disse rendres i nettleseren, blir resultatet:

```
Hei, Ola!
Hei, Kari!
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

Hvis du har startet dev-serveren, slik som beskrevet i slutten av oppstartsguiden, så kan du allerede nå navigere i nettleseren til "Spillere" i sidemenyen. Der ser du det som nå finnes av innhold i page.tsx i spillere-mappen.

Alle sider trenger en overskrift! Naviger til `src/app/spillere/page.tsx` i VS code og legg til overskriften "Spillere". HTML har sitt eget element for overskrifter:

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

La du merke til at du ikke trengte å laste siden på nytt for å se endringen? Dette kalles **hot reload** (eller "Fast Refresh" i Next.js): så snart du lagrer en fil, oppdaterer nettleseren seg automatisk med de nyeste endringene, uten at man må restarte dev-serveren. Det er en av de tingene som gjør frontend-utvikling gøy, du får se resultatet av endringene dine nesten øyeblikkelig.

<details class="losningsforslag">
<summary>Løsningsforslag 1a</summary>

```tsx
export default async function SpillerePage() {
  return (
    <div className="max-w-4xl p-8 mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        {/* Oppgave 3a - LEGG TIL EN LENKE TIL /spillere/opprett HER */}
      </div>
      {/* Oppgave 1b - LEGG TIL ET SPILLERCARD HER */}
      <p>Her var det ganske tomt foreløpig!</p>
    </div>
  );
}
```

</details>

#### Oppgave 1b - Vis et SpillerCard på siden

En stor fordel med React er at man kan dele opp grensesnittet i gjenbrukbare komponenter. I stedet for å skrive alt i én stor fil, legger vi hver komponent i sin egen fil og henter den inn der vi trenger den. En fil gjør koden sin tilgjengelig for andre filer med `export` (se hvordan det er gjort i `src\components\spillere\spiller-card.tsx`), og andre filer henter den inn igjen med `import`. Slik ser en typisk import ut:

```tsx
import SpillerCard from "@/components/spillere/spiller-card";
```

`@/` er en snarvei som peker til `src/`-mappen i prosjektet. Etter det følger resten av filstien, uten `.tsx`-endelsen.

Når komponenten er importert kan du bruke den i JSX akkurat som en HTML-tag:

```tsx
<SpillerCard />
```

Importer `SpillerCard` i `page.tsx` og legg den inn under overskriften.

<details class="tip">
<summary>Tips</summary>
Du trenger ikke skrive importlinjer manuelt. Sett inn en komponent du ikke har importert ennå, plasser markøren i eller på navnet (som nå har en rød error-linje), og trykk `Ctrl+.` (`Cmd+.` på Mac) for å åpne Quick Fix. Velg "Add import from ..." fra listen som dukker opp. VS Code setter inn importlinjen for deg. Dette fungerer for komponenter, typer og funksjoner.
</details>

<details class="losningsforslag">
<summary>Løsningsforslag 1b</summary>

```tsx
import SpillerCard from "@/components/spillere/spiller-card";

export default async function SpillerePage() {
  return (
    <div className="max-w-4xl p-8 mx-auto">
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

`SpillereListe` forventer en prop som heter `spillere`, et array (en liste) av `Spiller`-objekter. Siden vi ikke henter ekte data fra API-et enda, lager vi en mock-liste for å teste at det fungerer.

Erstatt `<SpillerCard />` i `page.tsx` med kodesnuttene nedenfor. Husk at `mockSpillere` er en konstant og skal ligge før `return`, ikke inni JSX-en:

```tsx
import SpillereListe from "@/components/spillere/spillere-liste";
import { Spiller } from "@/lib/types";
```

2. Legg til denne konstanten rett over `return`:

```tsx
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
```

3. Bytt ut `<SpillerCard />` i `return` med:

```tsx
<SpillereListe spillere={mockSpillere} />
```

**Steg 2: La `SpillerCard` ta imot `spiller` som prop**

Åpne `spiller-card.tsx`. Øverst ser du en `Props`-type med et `spiller`-felt, men komponenten bruker den ikke enda. Du skal nå:

1. Slette `mockSpiller`-konstanten
2. Ta imot `spiller` som prop i stedet
3. Bruke `spiller.navn` i JSX-en

<details class="tip">
<summary>Tips</summary>
Trykk `Ctrl+Space` (`Cmd+Space` på Mac) mens markøren står inni et element for å trigge IntelliSense, VS Code sin autofullfør. Dette er spesielt nyttig her: siden `SpillerCard` og `SpillereListe` har TypeScript-typer på propsene sine, kan editoren foreslå riktige prop-navn og tilgjengelige variabler mens du skriver, i stedet for at du må huske dem selv.
</details>

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
    <div className="max-w-4xl p-8 mx-auto">
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

Husk `<p>`-taggen fra HTML-introen i Oppgave 1, standardvalget for tekstinnhold. Linjen

```tsx
<p className="text-muted-foreground text-sm">
  Her kan vi vise mer data fra spiller-objektene
</p>
```

er et mønster du kan kopiere og bygge videre på.

<details class="tip">
<summary>Tips</summary>

Usikker på hva slags informasjon du kan vise? Se hvilke verdier som finnes i et spiller-objekt ved å holde musepekeren over "Spiller" eller ved å trykke på "Spiller"-typen med `Ctrl + venstreklikk`.

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

<Image src="/spiller/1.png" alt="Ola Nordmann" width={100} height={100} />
```

Bytt ut de hardkodede verdiene med riktig `src` og `alt` basert på spillerens data. For `src` trenger du å sette inn en variabel midt i en streng, noe en vanlig streng med anførselstegn ikke kan gjøre. Til det bruker vi en **template literal**, en streng omsluttet av backticks (`` ` ``) i stedet for anførselstegn, der `${...}` setter inn verdien av en variabel eller et uttrykk direkte i teksten:

```tsx
`/spiller/${spiller.id}.png`
```

Vi anbefaler også å legge til `className` som et attributt på `<Image>`-taggen for å få bildet til å se bedre ut:

```tsx
className="aspect-square rounded-full object-cover"
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
        width={100}
        height={100}
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

Det å hente data over nettverket tar tid. Legg merke til at vi har puttet `await` foran `fetch`. Det er fordi `fetch` er en asynkron funksjon: den returnerer med det samme et **Promise**, et løfte om at dataen kommer etter hvert, og kan derfor kjøres parallelt med andre ting. Når vi skriver `fetch("http://localhost:3000/api/spillere");` ber vi koden begynne å hente dataen. Men siden vi trenger at `result` er ferdig lastet inn før vi kan hente ut alle spillerne med `.json()`, må vi si til koden at den må vente (`await`) til all dataen er kommet før den går videre.

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
    <div className="max-w-4xl p-8 mx-auto">
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


<!-- nav:start -->
[Oversikt](../../README.md#oppgaver) · [Oppgave 2 →](./02-spillerdetaljer.md)
<!-- nav:end -->
