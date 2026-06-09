export default function VelkommenPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 text-4xl font-bold">Foosball-portalen</h1>
      <p className="text-muted-foreground mb-8 max-w-lg text-lg">
        Din oversikt over alle spillere, ratings og statistikk. Utforsk
        spillerne, følg med på rangeringer og finn ut hvem som egentlig er best
        på bordet.
      </p>
      <div className="text-muted-foreground text-sm">
        <p className="mb-2">Bruk navigasjonen til venstre for å komme i gang.</p>
        <ul className="space-y-1">
          <li>
            <strong>Spillere</strong> — oversikt over alle registrerte spillere
          </li>
          <li>
            <strong>Oppgaver</strong> — kursets oppgavebeskrivelser
          </li>
          <li>
            <strong>API-dokumentasjon</strong> — referanse for tilgjengelige endepunkter
          </li>
        </ul>
      </div>
    </div>
  );
}
