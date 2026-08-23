<!-- nav:start -->

[← Oppgave 3](./03-opprett-spiller.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 5 →](./05-opprett-spiller-med-react-hook-form.md)
<!-- nav:end -->

## Oppgave 4 – Hooks i praksis

**Hva du skal lære:** Hva en hook er og reglene for hooks, `useState` til interaktiv tilstand, `useEffect` til sideeffekter, og `useRef` til direkte DOM-tilgang.

Hooks er spesielle funksjoner i React som gir komponentene dine tilgang til tilstand og side effects, det vil si alt som skjer utenfor Reacts renderingssyklus, som å lese fra localStorage, hente data fra en API, eller manipulere DOM-en direkte.

**DOM** (Document Object Model) er nettleserens representasjon av siden din som et tre av elementer. Når du skriver `<h1>Hei</h1>` i JSX, lager React et tilsvarende element i DOM-en som nettleseren viser. Normalt lar du React håndtere DOM-en, men av og til trenger du direkte tilgang, for eksempel for å fokusere et inputfelt.

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

- Et `<input>`-felt der brukeren kan skrive.
- En `useState` som holder søketeksten.
- En `onChange` på inputen som oppdaterer staten.
- En (visuelt skjult) `<label>` knyttet til input-feltet med `htmlFor`/`id`, slik at feltet oppfyller UU krav.

```tsx
const [sok, setSok] = useState("");
```

Importer og vis `SpillerSok` i `src/app/spillere/page.tsx`. Foreløpig trenger du ikke koble den til spillerlisten, det kommer i neste steg.

> Tips: Legg til `border` i `className` for å gjøre input-feltet synlig mot hvit bakgrunn.

<details class="hint">
<summary>Hint</summary>

Usikker på hvordan du setter sammen komponenten? Strukturen ligner de andre client components du har laget:

- `"use client"` øverst i filen
- en `function` med `export default` foran.
- logikk før return
- JSX inni/etter return.

Du kan også se på hvordan andre komponenter i kodebasen er laget, feks inputfeltet i `opprett-spiller-skjema.tsx`.

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 4a</summary>

```tsx
"use client";

import { useState } from "react";

export default function SpillerSok() {
  const [sok, setSok] = useState("");
  return (
    <div>
      <label htmlFor="sok" className="sr-only">
        Søk etter spillere
      </label>
      <input
        id="sok"
        type="text"
        placeholder="Søk etter spillere..."
        className="w-full rounded border px-3 py-2 mb-4"
        value={sok}
        onChange={(e) => setSok(e.target.value)}
      />
    </div>
  );
}
```

</details>

#### Oppgave 4b – Filtrer spillerlisten

Nå skal søket faktisk gjøre noe. Søketeksten må brukes til å filtrere hvilke spillere som vises, men `page.tsx` er en server component og kan ikke ha `useState`. Løsningen er en ny client component som tar imot hele spillerlisten som prop, håndterer søkestate selv, og viser de filtrerte resultatene.

Opprett en ny fil `src/components/spillere/spillere-liste-med-sok.tsx` med dette innholdet, og fullfør de tre kommenterte stegene:

```tsx
"use client";

import { Spiller } from "@/lib/types";
import { useState } from "react";
import SpillereListe from "./spillere-liste";
import SpillerSok from "./spiller-sok";

type Props = {
  spillere: Spiller[];
};

export default function SpillereListeMedSok({ spillere }: Props) {
  // Oppgave 4b: Legg til useState for søketeksten her

  // Oppgave 4b: Filtrer spillerlisten basert på søketeksten her

  return (
    <div className="flex flex-col gap-4">
      {/* Oppgave 4b: Vis SpillerSok her og send inn sok og setSok som props */}
      <SpillereListe spillere={spillere} />
    </div>
  );
}
```

Når `SpillereListeMedSok` er ferdig, oppdater `page.tsx`: fjern `<SpillerSok />` og `<SpillereListe />` og erstatt begge med:

```tsx
<SpillereListeMedSok spillere={spillere} />
```

Husk å oppdatere importen til `import SpillereListeMedSok from "@/components/spillere/spillere-liste-med-sok";`.

Husk også å oppdatere `SpillerSok` til å ta imot `sok` og `setSok` som props i stedet for å ha sin egen `useState`.

<details class="hint">
<summary>Hint</summary>

Filtreringen kan gjøres slik:

```tsx
const filtrerteSpillere = spillere.filter((spiller) =>
  spiller.navn.toLowerCase().includes(sok.toLowerCase())
);
```

Når `sok` og `setSok` flyttes ut av `SpillerSok` og inn i `SpillereListeMedSok`, trenger `SpillerSok` en ny `Props`-type:

```tsx
type Props = {
  sok: string;
  setSok: (verdi: string) => void;
};
```

</details>

<details class="losningsforslag">
<summary>Løsningsforslag 4b</summary>

`spillere-liste-med-sok.tsx`:

```tsx
"use client";

import { Spiller } from "@/lib/types";
import { useState } from "react";
import SpillereListe from "./spillere-liste";
import SpillerSok from "./spiller-sok";

type Props = {
  spillere: Spiller[];
};

export default function SpillereListeMedSok({ spillere }: Props) {
  const [sok, setSok] = useState("");

  const filtrerteSpillere = spillere.filter((spiller) =>
    spiller.navn.toLowerCase().includes(sok.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <SpillerSok sok={sok} setSok={setSok} />
      <SpillereListe spillere={filtrerteSpillere} />
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

Les ut søket fra `localStorage` med en `useEffect` som kjører én gang når komponenten mountes, slik at søket er gjenopprettet når siden lastes. Vi kan ikke lese `localStorage` direkte i `useState` fordi komponenten også rendres på serveren, og `localStorage` finnes bare i nettleseren:

```tsx
useEffect(() => {
  setSok(localStorage.getItem("spillerSok") ?? "");
}, []);
```

Legg denne useEffect-en til i `SpillereListeMedSok`.

For å lagre søket når brukeren skriver, trenger vi ikke en egen useEffect, fordi vi vet nøyaktig når og hvor verdien endres; når brukeren skriver i feltet. Gå til `SpillerSok` og lag en `handleChange`-funksjon som oppdaterer state OG lagrer til `localStorage` samtidig:

```tsx
import { ChangeEvent } from "react";

function handleChange(e: ChangeEvent<HTMLInputElement>) {
  setSok(e.target.value);
  localStorage.setItem("spillerSok", e.target.value);
}
```

<details class="losningsforslag">
<summary>Løsningsforslag 4c</summary>

Legg til disse linjene i `SpillereListeMedSok`:

```tsx
import { useState, useEffect } from "react";

const [sok, setSok] = useState("");

useEffect(() => {
  setSok(localStorage.getItem("spillerSok") ?? "");
}, []);
```

Legg til disse linjene i `SpillerSok`:

```tsx
"use client";

import { ChangeEvent } from "react";

type Props = {
  sok: string;
  setSok: (verdi: string) => void;
};

export default function SpillerSok({ sok, setSok }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSok(e.target.value);
    localStorage.setItem("spillerSok", e.target.value);
  }

  return (
    <div>
      <label htmlFor="sok" className="sr-only">
        Søk etter spillere
      </label>
      <input
        id="sok"
        type="text"
        placeholder="Søk etter spillere..."
        className="w-full rounded border px-3 py-2 mb-4"
        value={sok}
        onChange={handleChange}
      />
    </div>
  );
}
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

import { ChangeEvent, useEffect, useRef } from "react";

type Props = {
  sok: string;
  setSok: (sok: string) => void;
};

export default function SpillerSok({ sok, setSok }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSok(e.target.value);
    localStorage.setItem("spillerSok", e.target.value);
  }

  return (
    <div>
      <label htmlFor="sok" className="sr-only">
        Søk etter spillere
      </label>
      <input
        ref={inputRef}
        id="sok"
        type="text"
        placeholder="Søk etter spillere..."
        className="w-full rounded border px-3 py-2"
        value={sok}
        onChange={handleChange}
      />
    </div>
  );
}
```

</details>

---

<!-- nav:start -->

[← Oppgave 3](./03-opprett-spiller.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 5 →](./05-opprett-spiller-med-react-hook-form.md)
<!-- nav:end -->
