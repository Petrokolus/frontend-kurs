import { Spiller } from "@/lib/types";

type Props = {
  spiller: Spiller; // Her definerer vi at props skal inneholde en spiller av typen Spiller, som vi har definert i types.ts
  // Prøv å hovre over Spiller for å se hvilke egenskaper den har, og bruk disse til å vise mer informasjon i kortet!
};

export default function SpillerCard() {

  const mockSpiller: Spiller = {
    // Dette er en "dummy"-spiller som vi kan bruke for å teste ut hvordan SpillerCard-komponenten ser ut når vi gir den data.
    id: 1,
    navn: "Ola Nordmann",
    avdeling: "Digital Engineering",
    kull: "NK20",
    posisjon: "Angrep",
    rating: 0,
  };

  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{mockSpiller.navn}</h2>
        <p className="text-muted-foreground text-sm">
          Her kan vi vise mer data fra spiller-objektene
        </p>
        {/* Legg til flere detaljer her basert på datamodellen */}
      </div>
    </div>
  );
}
