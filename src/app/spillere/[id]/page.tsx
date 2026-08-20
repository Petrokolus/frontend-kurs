import { Spiller } from "@/lib/types";

// Mappenavnet [id] gjør at Next.js fanger opp alle URLer som /spillere/1, /spillere/42 osv.
// id-en fra URL-en er tilgjengelig via params-objektet nedenfor.
type Props = {
  params: Promise<{ id: string }>; // id fra URL-en, f.eks. "1"
};

export default async function SpillerPage({ params }: Props) {
  const { id } = await params; // Hent ut id-en

  const result = await fetch(`http://localhost:3000/api/spillere/${id}`);
  const spiller: Spiller = await result.json();

  return (
    <div className="max-w-2xl p-8">
      <h1 className="text-3xl font-bold">{spiller.navn}</h1>
      <p>
        {spiller.avdeling} - {spiller.kull}
      </p>
      <p>{spiller.posisjon}</p>
      <p>Rating: {spiller.rating}</p>
    </div>
  );
}
