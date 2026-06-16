import { Spiller } from "@/lib/types";
import SpillerCard from "./spiller-card"; //Her importerer vi SpillerCard-komponenten som vi har laget, slik at vi kan bruke den til å vise hver spiller i listen vår.

type Props = {
  spillere: Spiller[]; //Denne komponenten forventer å få inn en prop som heter "spillere", som er et array av Spiller-objekter.
};

export default function SpillereListe({ spillere }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {spillere.map(
        (
          spiller //map()-funksjonen funker som en løkke som går gjennom alle spillerne i arrayet, og for hver spiller kjører den koden som er inni klammeparentesene.
        ) => (
          // Her bruker vi den til å lage et SpillerCard for hver spiller i listen.
          <SpillerCard key={spiller.id} spiller={spiller} />
        )
      )}
    </div>
  );
}
