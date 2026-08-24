import { Kamp } from "@/lib/types";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function KampPage({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/kamper/${id}`);
  const kamp: Kamp = await response.json();

  const lag1Maal = kamp.lagVinner === 1 ? 10 : kamp.taperMaal;
  const lag2Maal = kamp.lagVinner === 2 ? 10 : kamp.taperMaal;

  return (
    <div className="max-w-2xl p-8 mx-auto">
      <Link href="/kamper" className="text-muted-foreground text-sm">
        Tilbake til kamphistorikk
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Kamp</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        {new Date(kamp.dato).toLocaleDateString("nb-NO")}
      </p>
      <div className="mt-6 flex items-center gap-8">
        <div>
          <p className="font-semibold">Lag 1</p>
          <p>{kamp.lag1Spiller1.navn}</p>
          <p>{kamp.lag1Spiller2.navn}</p>
        </div>
        <p className="font-mono text-3xl font-bold">
          {lag1Maal} – {lag2Maal}
        </p>
        <div>
          <p className="font-semibold">Lag 2</p>
          <p>{kamp.lag2Spiller1.navn}</p>
          <p>{kamp.lag2Spiller2.navn}</p>
        </div>
      </div>
    </div>
  );
}
