import { Spiller } from "@/lib/types";

type Props = {
  spiller: Spiller;  // Her definerer vi at props skal inneholde en spiller av typen Spiller, som vi har definert i types.ts
                    // Prøv å hovre over Spiller for å se hvilke egenskaper den har, og bruk disse til å vise mer informasjon i kortet!
};

export default function SpillerCard({ spiller }: Props) {    // Her kaller vi på props som vi forventer å få inn, og kan legge til flere etter behov
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
        <div className="flex-1">
            <h2 className="text-lg font-semibold">{spiller.navn}</h2>
            <p className="text-sm text-muted-foreground">Her kan vi vise mer data fra spiller-objektene</p>
            {/* Legg til flere detaljer her basert på datamodellen */}
        </div>
    </div>
  );
}