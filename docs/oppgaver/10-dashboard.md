<!-- nav:start -->
[← Oppgave 9](./09-alt-du-kan-brukt-pa-nytt.md) · [Oversikt](../../README.md#oppgaver) · [Veien videre →](./11-veien-videre.md)
<!-- nav:end -->

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
    <div className="max-w-5xl p-8 mx-auto">
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
</Card>
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
const topp5 = spillere.toSorted((a, b) => b.rating - a.rating).slice(0, 5);
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

  const topp5 = spillere.toSorted((a, b) => b.rating - a.rating).slice(0, 5);

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
    <div className="max-w-5xl p-8 mx-auto">
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
    <div className="max-w-5xl p-8 mx-auto">
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


<!-- nav:start -->
[← Oppgave 9](./09-alt-du-kan-brukt-pa-nytt.md) · [Oversikt](../../README.md#oppgaver) · [Veien videre →](./11-veien-videre.md)
<!-- nav:end -->
