<!-- nav:start -->

[← Oppgave 8](./08-filtrering-og-sortering-av-spillere.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 10 →](./10-dashboard.md)
<!-- nav:end -->

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

  // Promise.all kjører begge kallene parallelt. Mer om dette i Oppgave 10
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
    <div className="max-w-5xl p-8 mx-auto">
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
    <div className="max-w-2xl p-8 mx-auto">
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
> `Select`-komponenten fra shadcn fungerer ikke direkte med React Hook Form sin `register`. Bruk i stedet `setValue(felt, verdi)` for å oppdatere et felt manuelt, og `watch(felt)` for å lese gjeldende verdi og få komponenten til å re-rendre når den endres. Lag en gjenbrukbar `SpillerVelger`-komponent i `src/app/kamper/components/spiller-velger.tsx` som tar `spillere`, `value` og `onChange` som props. Samme komponent brukes i 9d.
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
    <div className="max-w-2xl p-8 mx-auto">
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

<!-- nav:start -->

[← Oppgave 8](./08-filtrering-og-sortering-av-spillere.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 10 →](./10-dashboard.md)
<!-- nav:end -->
