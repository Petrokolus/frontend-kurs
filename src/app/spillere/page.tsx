import SpillereListe from "@/components/spillere/spillere-liste";
import { Spiller } from "@/lib/types";
import Link from "next/link";

export default async function SpillerePage() {
  const result = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await result.json();

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        <Link href={"/spillere/opprett"}>Opprett spiller</Link>
      </div>
      <SpillereListe spillere={spillere} />
    </div>
  );
}
