<!-- nav:start -->
[← Oppgave 1](./01-vis-alle-spillere.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 3 →](./03-opprett-spiller.md)
<!-- nav:end -->

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

`params` hentes asynkront, og er derfor typet som et Promise (`Promise<{ id: string }>`) i stedet for et vanlig objekt, samme som du så med `fetch` i oppgave 1f, bare før noen har brukt `await`. Hvis du awaiter `params` vil det du får ut ha typen `{ id: string }`.

> **OBS:** Next.js tolker visse filnavn i `app`-mappen på en spesiell måte. `page.tsx` er ett av dem, men det finnes flere: `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` og `template.tsx`. Disse er reservert for Next.js og bør ikke brukes som navn på egne komponenter.

For å hjelpe deg i gang har vi allerede opprettet `src/app/spillere/[id]/page.tsx`. Naviger til `http://localhost:3000/spillere/1`, `http://localhost:3000/spillere/2`, `http://localhost:3000/spillere/3` i nettleseren. Ser du hvordan tittelen endres basert på `id`-verdien i URL-en?

Dette er kjernen i dynamisk routing: Next.js bruker `id`-en fra URL-en til å avgjøre hvilken side som vises. Nå som du har sett det i praksis, skal vi bli kjent med API-et vi skal bruke til å hente ekte spillerdata etterpå.

#### Oppgave 2b – Utforsk API-et i API-dokumentasjonen

Før vi skriver kode, la oss utforske hva API-et tilbyr. Klikk på **API-dokumentasjon** i sidemenyen.

Her finner du en oversikt over alle tilgjengelige API-routes. Klikk på routen `GET /api/spillere/{id}`, skriv inn en spiller-ID (f.eks. `1`) og klikk **"Execute"**. Du vil se nøyaktig hva API-et returnerer, og dette er dataen du skal bruke på detaljsiden.

På jobb vil du bruke API-dokumentasjon til å forstå hva som er tilgjengelig og hvordan dataen ser ut, før du begynner å kode.

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
    <div className="max-w-2xl p-8 mx-auto">
      <h1 className="text-3xl font-bold">{spiller.navn}</h1>
      {/* Oppgave 2d: Legg til bilde av spilleren her */}
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
  width={200}
  height={200}
  className="aspect-square rounded-4xl object-cover"
/>
```

</details>

#### Oppgave 2e – Gi detaljsiden en fin layout

Nå som du har bilde og spillerdata på plass, kan vi gjøre siden litt penere. Prøv å sentrere innholdet og gi feltene fin avstand fra hverandre.

Her er noen Tailwind-klasser som kan hjelpe:

| Klasse                       | Hva den gjør                                         |
| ---------------------------- | ---------------------------------------------------- |
| `flex flex-col items-center` | Stabler innhold vertikalt og sentrerer det           |
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

<Link href="/spillere/1">Gå til Erik Solberg</Link>
```

> **OBS:** Bruker du `Ctrl+.` for å autofullføre importen av `Link`, kan VS Code foreslå flere alternativer, blant annet fra `lucide-react` (et ikonbibliotek som også har noe som heter `Link`). Sørg for å velge alternativet fra `next/link`. Velger du feil, vil du se en ESLint-advarsel som ber deg importere fra `next/link` i stedet.

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


<!-- nav:start -->
[← Oppgave 1](./01-vis-alle-spillere.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 3 →](./03-opprett-spiller.md)
<!-- nav:end -->
