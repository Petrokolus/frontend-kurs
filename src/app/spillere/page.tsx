import { Spiller } from "@/lib/types";
import SpillerCard from "./spiller-card";

const mockSpiller: Spiller = {  // Dette er en "dummy"-spiller som vi kan bruke for å teste ut hvordan SpillerCard-komponenten ser ut når vi gir den data.
  id: 1,
  navn: "Ola Nordmann",
  avdeling: "Digital Engineering",
  kull: "NK20",
  posisjon: "Angrep",
  rating: 0
}

export default async function SpillerePage() {

  return (
    <div className="max-w-4xl p-8">
      {/* Oppgave 1a - LEGG TIL EN OVERSKRIFT HER */}
    <p>Her var det ganske tomt foreløpig!</p>
    </div>
  );
}
