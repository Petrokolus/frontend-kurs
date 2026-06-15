import { Spiller } from "@/lib/types";

// Mappenavnet [id] gjør at Next.js fanger opp alle URLer som /spillere/1, /spillere/42 osv.
// id-en fra URL-en er tilgjengelig via params-objektet nedenfor.
type Props = {
  params: Promise<{ id: string }>; // id fra URL-en, f.eks. "1"
};

export default async function SpillerDetaljSide({ params }: Props) {
  const { id } = await params; // Hent ut id-en

  // TODO 2b: Hent spilleren fra API-et med id-en du har tilgjengelig.
  // API-ruten er /api/spillere/:id — erstatt :id med id-variabelen.
  // Husk å hente ut spilleren fra resultatet med .json(), akkurat som i oppgave 1!

  return (
    <div className="max-w-2xl p-8">
      {/* TODO 2c: Legg til bilde av spilleren her. Bildet finner du på /spiller/{id}.png */}

      <h1 className="text-3xl font-bold">Spiller {id}</h1>

      {/* TODO 2b: Erstatt teksten over med spillerens navn, og vis resten av detaljene under */}
    </div>
  );
}
