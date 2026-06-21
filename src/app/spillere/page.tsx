import SpillerSokOgListe from "@/components/spillere/spiller-sok-og-liste";
import Link from "next/link";

export default async function SpillerePage() {
  const result = await fetch("http://localhost:3000/api/spillere");
  const spillere = await result.json();
  return (
    <div className="max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        <Link
          href="/spillere/opprett"
          className="bg-twoday-amber rounded px-4 py-2 font-semibold"
        >
          Opprett ny spiller
        </Link>
      </div>
      <SpillerSokOgListe spillere={spillere} />
    </div>
  );
}
