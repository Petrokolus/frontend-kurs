<!-- nav:start -->

[← Oppgave 2](./02-spillerdetaljer.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 4 →](./04-hooks-i-praksis.md)
<!-- nav:end -->

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

<input value={navn} onChange={(e) => setNavn(e.target.value)} />
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
/>
```

`{ ...skjema, navn: e.target.value }` betyr: «ta alle verdiene fra det gamle skjema-objektet, men overskriv `navn` med den nye verdien». Dette kalles en **spread** og er en vanlig måte å oppdatere objekter i React på.

<details>
<summary>Kontrollerte vs. ukontrollerte inputs</summary>

Kontrollerte inputs, som vi bruker her, er ikke den eneste måten å håndtere skjemaer i React på. Alternativet er **ukontrollerte inputs**: du gir feltet et `name`-attributt og lar nettleseren holde på verdien selv, i stedet for å styre den med `useState`. Når skjemaet sendes inn, kan du hente ut alle verdiene samlet i ett `FormData`-objekt:

```tsx
<form
  onSubmit={(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("navn"));
  }}
>
  <input name="navn" />
  <button type="submit">Send</button>
</form>
```

Ukontrollert er raskere å skrive og gir bedre ytelse (ingen re-render for hvert tastetrykk), men du mister muligheten til å reagere på det brukeren skriver underveis, som live validering. Kontrollert gir deg den funksjonaliteten, men koster mer kode.

</details>

#### Tilgjengelighet: label og id

For at skjemaet skal fungere godt for alle, inkludert brukere med skjermleser, er det viktig å knytte hvert inputfelt til en `<label>` med `htmlFor` og `id`:

```tsx
<label htmlFor="navn">Navn</label>
<input id="navn" ... />
```

Dette gjør at klikk på etiketten fokuserer feltet, og at skjermlesere leser opp hva feltet er for.

---

Ønsker du å vite hvordan rating-systemet fungerer?

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

---

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
    <div className="max-w-4xl p-8 mx-auto">
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

Øverst i filen er det definert en type `SkjemaData` og en startverdi for `useState`. Disse inneholder foreløpig bare `navn`. Legg til `avdeling`, `kull` og `posisjon` her også fra `Spiller`-typen i `src/lib/types.ts`. (`styrke` og `svakhet` er valgfrie og kommer i oppgave 3d.)

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

<details class="hint">
<summary>Hint</summary>

TypeScript vil gi deg rød understrek på `skjema.avdeling`, `skjema.kull` osv. hvis du glemte et felt i `SkjemaData`-typen i 3b. Hvis du hoverer over feilmeldingene kan du se hva som forventes.

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
        className="bg-twoday-amber cursor-pointer rounded px-4 py-2 font-semibold"
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

Selv om feltene er valgfrie, må vi også huske å sette en startverdi for dem. Det er fordi vi styrer verdien deres manuelt med `useState`, og da må vi gi en startverdi: React tillater ikke at en verdi går fra `undefined` (ukontrollert) til tekst (kontrollert).

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

Bruk `router.push()` for å navigere til riktig side etter at skjemaet er sendt inn.

<details class="hint">
<summary>Hint</summary>

Husk å lese JSON-svaret fra APIet for å få tak i `id`-en til den nye spilleren:

```tsx
const spiller: Spiller = await response.json();
router.push(`/spillere/${spiller.id}`);
```

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 3e</summary>

Legg til `Spiller`-importen og oppdater `handleSubmit`:

```tsx
import { Spiller } from "@/lib/types";

async function handleSubmit(data: SkjemaData) {
  const response = await fetch("http://localhost:3000/api/spillere", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const spiller: Spiller = await response.json();
    router.push(`/spillere/${spiller.id}`);
  }
}
```

</details>

<details>
<summary>Får du 500-feil når du oppretter spiller?</summary>

Hvis du ser `Argument 'rating' is missing` i terminalen, er den genererte Prisma-klienten utdatert. Kjør dette i terminalen:

```bash
pnpm exec prisma generate
```

Og restart serveren:

```
pnpm dev
```

</details>

#### Oppgave 3f – Test at det fungerer

Fyll inn skjemaet og opprett en spiller. Sjekk at:

1. Du blir sendt videre til detaljsiden for den nye spilleren
2. Spilleren dukker opp i listen på `/spillere`
3. Detaljsiden viser riktig informasjon

---

<!-- nav:start -->

[← Oppgave 2](./02-spillerdetaljer.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 4 →](./04-hooks-i-praksis.md)
<!-- nav:end -->
