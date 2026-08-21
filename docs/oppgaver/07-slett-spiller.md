<!-- nav:start -->
[← Oppgave 6](./06-rediger-spiller.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 8 →](./08-filtrering-og-sortering-av-spillere.md)
<!-- nav:end -->

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
</AlertDialog>
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


<!-- nav:start -->
[← Oppgave 6](./06-rediger-spiller.md) · [Oversikt](../../README.md#oppgaver) · [Oppgave 8 →](./08-filtrering-og-sortering-av-spillere.md)
<!-- nav:end -->
