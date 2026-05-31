import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="mb-2 text-3xl font-bold">Velkommen til frontend-kurset</h1>
      <p className="text-muted-foreground mb-8">
        I dag skal du lære å bygge et frontend-system fra bunnen av — slik du
        ville gjort det på jobb. Du har fått en applikasjon med et ferdig API og
        et komponentbibliotek. Oppgaven din er å bygge brukergrensesnittet som
        kobler det hele sammen.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Saksbehandlingssystem</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Applikasjonen du skal bygge. En oversikt over saker med mulighet til
            å se detaljer for hver enkelt sak.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Komponentbibliotek</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Du har tilgang til ferdige UI-komponenter fra shadcn/ui, samt
            domenespesifikke komponenter som{" "}
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              SakCard
            </code>{" "}
            og{" "}
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              StatusBadge
            </code>
            .
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-3 text-lg font-semibold">Kom i gang</h2>
      <ul className="text-muted-foreground space-y-2 text-sm">
        <li>
          📄 Les gjennom{" "}
          <Link
            href="/api-docs"
            className="text-foreground hover:text-muted-foreground underline underline-offset-4"
          >
            API-dokumentasjonen
          </Link>{" "}
          for å forstå hvilke data du har tilgjengelig.
        </li>
        <li>
          📋 Åpne{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            README.md
          </code>{" "}
          i prosjektmappen — der finner du oppgavene.
        </li>
        <li>
          🧩 Komponentene du kan bruke ligger i{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            src/components/
          </code>
          .
        </li>
      </ul>
    </div>
  );
}
