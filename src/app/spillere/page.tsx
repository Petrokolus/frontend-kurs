import SpillereListe from "@/components/spillere/spillere-liste";
import { Spiller } from "@/lib/types";

export default async function SpillerePage() {
  const mockSpillere: Spiller[] = [
    {
      id: 1,
      navn: "Ola Nordmann",
      avdeling: "Digital Engineering",
      kull: "NK20",
      posisjon: "Angrep",
      rating: 100,
      skyggerating: 100,
    },
    {
      id: 2,
      navn: "Kari Nordmann",
      avdeling: "Design",
      kull: "NK21",
      posisjon: "Forsvar",
      rating: 90,
      skyggerating: 85,
    },
  ];
  return (
    <div className="max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        {/* Oppgave 3a - LEGG TIL EN LENKE TIL /spillere/opprett HER */}
      </div>
      <SpillereListe spillere={mockSpillere} />
    </div>
  );
}
