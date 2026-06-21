import { Spiller } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  spiller: Spiller; // Her definerer vi at props skal inneholde en spiller av typen Spiller, som vi har definert i types.ts
  // Prøv å holde musepekeren over Spiller for å se hvilke egenskaper den har, og bruk disse til å vise mer informasjon i kortet!
};

export default function SpillerCard({ spiller }: Props) {
  return (
    <Link href={`/spillere/${spiller.id}`}>
      <div className="flex items-center space-x-4 rounded-lg border p-4">
        <Image
          src={`/spiller/${spiller.id}.png`}
          alt={spiller.navn}
          width={100}
          height={100}
          className="aspect-square rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{spiller.navn}</h2>
          <p className="text-muted-foreground text-sm">{spiller.posisjon}</p>
          <p className="text-muted-foreground text-sm">
            Rating: {spiller.rating}
          </p>
        </div>
      </div>
    </Link>
  );
}
