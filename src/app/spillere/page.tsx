import SpillerCard from "@/components/spillere/spiller-card";

export default async function SpillerePage() {
  return (
    <div className="max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Spillere</h1>
        {/* Oppgave 3a - LEGG TIL EN LENKE TIL /spillere/opprett HER */}
      </div>
      <SpillerCard />
    </div>
  );
}
