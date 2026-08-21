<!-- nav:start -->
[← Oppgave 7](./07-slett-spiller.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 9 →](./09-alt-du-kan-brukt-pa-nytt.md)
<!-- nav:end -->

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
    <div className="max-w-4xl p-8 mx-auto">
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
    <div className="max-w-4xl p-8 mx-auto">
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


<!-- nav:start -->
[← Oppgave 7](./07-slett-spiller.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 9 →](./09-alt-du-kan-brukt-pa-nytt.md)
<!-- nav:end -->
