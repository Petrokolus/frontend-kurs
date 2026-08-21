import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getNextOppgave, getPrevOppgave, oppgaver } from "@/lib/oppgaver";

type Props = {
  // Utelates for oversikt-siden (README), som ligger "før" oppgave 1.
  del?: number;
};

export function OppgaveNav({ del }: Props) {
  const prev = del !== undefined ? getPrevOppgave(del) : undefined;
  const next = del !== undefined ? getNextOppgave(del) : oppgaver[0];
  const visOversikt = del !== undefined;

  return (
    <div className="flex items-center justify-between gap-4">
      {prev ? (
        <Button asChild variant="outline">
          <Link href={`/oppgaver?del=${prev.del}`}>← {prev.navLabel}</Link>
        </Button>
      ) : (
        <span />
      )}
      {visOversikt ? (
        <Button asChild variant="ghost" size="sm">
          <Link href="/oppgaver">Alle oppgaver</Link>
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button asChild variant="outline">
          <Link href={`/oppgaver?del=${next.del}`}>{next.navLabel} →</Link>
        </Button>
      ) : (
        <span />
      )}
    </div>
  );
}
