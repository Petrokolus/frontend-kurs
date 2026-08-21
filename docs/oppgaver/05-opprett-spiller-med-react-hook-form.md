<!-- nav:start -->
[← Oppgave 4](./04-hooks-i-praksis.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 6 →](./06-rediger-spiller.md)
<!-- nav:end -->

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

<Label htmlFor="navn" className="text-lg">Navn</Label>
<Input id="navn" {...form.register("navn", { required: "Navn er påkrevd" })} />
<FieldError errors={[form.formState.errors.navn]} />
```

`FieldError` tar inn en liste med feilobjekter og viser dem for deg. Den viser ingenting når det ikke er noen feil, så du trenger ingen ekstra `if`-sjekk.

#### Oppgave 5e: Fullfør skjemaet

Nå har du sett det fulle mønsteret for ett felt: `useForm`, `form.register`, og shadcn-komponenter med feilvisning. Du har nå alle brikkene. Konverter de resterende feltene (`avdeling`, `kull`, `posisjon`, `styrke`, `svakhet`) til samme mønster. Husk at valgfrie felt ikke trenger valideringsregler.

Til slutt må du oppdatere `onSubmit` til å bruke `form.handleSubmit`. Lag en egen funksjon for logikken og send den inn:

```tsx
async function opprettSpiller(data: SkjemaData) {
  // fetch-kallet og navigeringen hit
}

<form onSubmit={form.handleSubmit(opprettSpiller)}>
```

`form.handleSubmit` kjører validering først og kaller `opprettSpiller` bare hvis alle feltene er gyldige. Flytt `fetch`-kallet og navigeringen inn i `opprettSpiller`, og fjern den gamle `handleSubmit`-funksjonen.

<details class="losningsforslag">
<summary>Løsningsforslag 5e</summary>

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
        <Label htmlFor="navn" className="text-lg">
          Navn
        </Label>
        <Input
          id="navn"
          {...form.register("navn", { required: "Navn er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.navn]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="avdeling" className="text-lg">
          Avdeling
        </Label>
        <Input
          id="avdeling"
          {...form.register("avdeling", { required: "Avdeling er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.avdeling]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="kull" className="text-lg">
          Kull
        </Label>
        <Input
          id="kull"
          {...form.register("kull", { required: "Kull er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.kull]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="posisjon" className="text-lg">
          Posisjon
        </Label>
        <Input
          id="posisjon"
          {...form.register("posisjon", { required: "Posisjon er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.posisjon]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="styrke" className="text-lg">
          Styrke (valgfritt)
        </Label>
        <Input id="styrke" {...form.register("styrke")} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="svakhet" className="text-lg">
          Svakhet (valgfritt)
        </Label>
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
  isRequired?: boolean;
  form: UseFormReturn<SkjemaData>;
};

function SkjemaFelt({ id, label, isRequired, form }: SkjemaFeltProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-lg" htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        {...form.register(id, {
          required: isRequired ? `${label} er påkrevd` : false,
        })}
      />
      <FieldError errors={[form.formState.errors[id]]} />
    </div>
  );
}
```

`Path<SkjemaData>` er en type fra React Hook Form som beskriver gyldige feltnavn i skjemaet, altså `"navn" | "avdeling" | "kull" | "posisjon" | "styrke" | "svakhet"`. Vi bruker den fordi det er nøyaktig det `form.register` forventer. Med `string` ville TypeScript klage på `form.register(id, ...)`. Med `Path<SkjemaData>` får du i tillegg hjelp av TypeScript til å oppdage skrivefeil, sender du inn `"nvan"` vil du få en feilmelding med én gang.

`isRequired` er en boolsk prop. Når den er `true`, bygger komponenten feilmeldingen selv fra `label`-propen, for eksempel `"Navn er påkrevd"`. Valgfrie felt sender du inn uten `isRequired`-prop.

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
  isRequired?: boolean;
  form: UseFormReturn<SkjemaData>;
};

function SkjemaFelt({ id, label, isRequired, form }: SkjemaFeltProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-lg" htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        {...form.register(id, {
          required: isRequired ? `${label} er påkrevd` : false,
        })}
      />
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
      <SkjemaFelt id="navn" label="Navn" isRequired form={form} />
      <SkjemaFelt id="avdeling" label="Avdeling" isRequired form={form} />
      <SkjemaFelt id="kull" label="Kull" isRequired form={form} />
      <SkjemaFelt id="posisjon" label="Posisjon" isRequired form={form} />
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

#### Oppgave 5h: Last opp bilde av spilleren

Når spilleren er opprettet har vi fått tilbake en id fra serveren. Vi kan bruke den til å laste opp et bilde til `/api/spillere/:id/bilde`.

Legg til en `useRef` for filinputet øverst i komponenten:

```tsx
const bildeRef = useRef<HTMLInputElement>(null);
```

Husk å importere `useRef` fra React.

Legg til filinputet i JSX-en, rett over submit-knappen:

```tsx
<div className="flex flex-col gap-1">
  <Label className="text-lg" htmlFor="bilde">
    Bilde (valgfritt)
  </Label>
  <input
    id="bilde"
    type="file"
    accept="image/*"
    ref={bildeRef}
    className="file:bg-twoday-olive cursor-pointer file:mr-4 file:cursor-pointer file:rounded file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
  />
</div>
```

Legg så inn bildeopplastingen i `opprettSpiller`, etter at spilleren er opprettet og før navigeringen:

```tsx
const fil = bildeRef.current?.files?.[0];
if (fil) {
  const formData = new FormData();
  formData.append("bilde", fil);
  await fetch(`http://localhost:3000/api/spillere/${spiller.id}/bilde`, {
    method: "POST",
    body: formData,
  });
}
```

<details class="losningsforslag">
<summary>Løsningsforslag 5h</summary>

Den oppdaterte `opprettSpiller`-funksjonen:

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

  const fil = bildeRef.current?.files?.[0];
  if (fil) {
    const formData = new FormData();
    formData.append("bilde", fil);
    await fetch(`http://localhost:3000/api/spillere/${spiller.id}/bilde`, {
      method: "POST",
      body: formData,
    });
  }

  router.push(`/spillere/${spiller.id}`);
}
```

</details>

---


<!-- nav:start -->
[← Oppgave 4](./04-hooks-i-praksis.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 6 →](./06-rediger-spiller.md)
<!-- nav:end -->
