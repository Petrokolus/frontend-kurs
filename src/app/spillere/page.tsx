import { Spiller } from "@/lib/types";
import SpillerSok from "@/components/spillere/spiller-sok";
import SpillereListe from "@/components/spillere/spillere-liste";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ sok?: string; sorter?: string }>;
};

export default async function SpillerePage({ searchParams }: Props) {
  const { sok, sorter = "rating-desc" } = await searchParams;

  const response = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await response.json();

  const spillereListe = spillere
    .filter(
      (spiller) =>
        !sok || spiller.navn.toLowerCase().includes(sok.toLowerCase())
    )
    .sort((a, b) => {
      if (sorter === "rating-asc") return a.rating - b.rating;
      if (sorter === "navn-asc") return a.navn.localeCompare(b.navn);
      return b.rating - a.rating;
    });

  return (
    <div className="max-w-4xl p-8 mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        <Link
          href="/spillere/opprett"
          className="bg-twoday-amber rounded px-4 py-2 font-semibold"
        >
          Opprett spiller
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <SpillerSok />
        <SpillereListe spillere={spillereListe} />
      </div>
    </div>
  );
}
