<!-- nav:start -->
[← Oppgave 5](./05-opprett-spiller-med-react-hook-form.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 7 →](./07-slett-spiller.md)
<!-- nav:end -->

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
</Dialog>
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
    <div className="max-w-2xl p-8 mx-auto">
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
</FormProvider>
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


<!-- nav:start -->
[← Oppgave 5](./05-opprett-spiller-med-react-hook-form.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 7 →](./07-slett-spiller.md)
<!-- nav:end -->
