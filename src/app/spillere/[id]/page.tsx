// Mappenavnet [id] gjør at Next.js fanger opp alle URLer som /spillere/1, /spillere/42 osv.

import { Spiller } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// id-en fra URL-en er tilgjengelig via params-objektet nedenfor.
type Props = {
  params: Promise<{ id: string }>; // id fra URL-en, f.eks. "1"
};

export default async function SpillerPage({ params }: Props) {
  const { id } = await params; // Hent ut id-en

  const result = await fetch(`http://localhost:3000/api/spillere/${id}`);
  const spiller: Spiller = await result.json();

  return (
    <div className="flex min-h-screen items-start justify-center p-8">
      <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-xl border p-8">
        <Image
          src={`/spiller/${id}.png`}
          alt={`Profilbilde av ${spiller.navn}`}
          width={200}
          height={200}
          className="aspect-square rounded-4xl object-cover"
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">{spiller.navn}</h1>
          <p className="text-muted-foreground">
            {spiller.avdeling} - {spiller.kull}
          </p>
          <p>{spiller.posisjon}</p>
          <p>
            Rating: {spiller.rating} ({spiller.skyggerating})
          </p>
          {spiller.styrke && <p>Styrke: {spiller.styrke}</p>}
          {spiller.svakhet && <p>Svakhet: {spiller.svakhet}</p>}
        </div>
      </div>
    </div>
  );
}
