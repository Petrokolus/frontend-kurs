import { Spiller } from "@/lib/types";
import OpprettKampSkjema from "./opprett-kamp-skjema";

export default async function OpprettKampPage() {
  const response = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await response.json();

  return (
    <div className="max-w-2xl p-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Registrer kamp</h1>
      <OpprettKampSkjema spillere={spillere} />
    </div>
  );
}
