import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Velkommen til frontend-kurset</h1>
      <p className="text-muted-foreground mb-8">
        I dag skal du lære å bygge et frontend-system fra bunnen av — slik du ville gjort det på jobb.
        Du har fått en applikasjon med et ferdig API og et komponentbibliotek. Oppgaven din er å bygge
        brukergrensesnittet som kobler det hele sammen.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Saksbehandlingssystem</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Applikasjonen du skal bygge. En oversikt over saker med mulighet til å se detaljer for hver enkelt sak.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Komponentbibliotek</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Du har tilgang til ferdige UI-komponenter fra shadcn/ui, samt domenespesifikke komponenter
            som <code className="text-xs bg-muted px-1 py-0.5 rounded">SakCard</code> og{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">StatusBadge</code>.
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-semibold mb-3">Kom i gang</h2>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>
          📄 Les gjennom{" "}
          <Link href="/api-docs" className="underline underline-offset-4 text-foreground hover:text-muted-foreground">
            API-dokumentasjonen
          </Link>{" "}
          for å forstå hvilke data du har tilgjengelig.
        </li>
        <li>
          📋 Åpne{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">README.md</code>{" "}
          i prosjektmappen — der finner du oppgavene.
        </li>
        <li>
          🧩 Komponentene du kan bruke ligger i{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">src/components/</code>.
        </li>
      </ul>
    </div>
  );
}
