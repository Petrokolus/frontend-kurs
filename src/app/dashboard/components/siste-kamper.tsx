import { Kamp } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SisteKamper() {
  const res = await fetch("http://localhost:3000/api/kamper?side=1&perSide=5");
  const { kamper }: { kamper: Kamp[] } = await res.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Siste kamper</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {kamper.map((kamp) => {
            const lag1Maal = kamp.lagVinner === 1 ? 10 : kamp.taperMaal;
            const lag2Maal = kamp.lagVinner === 2 ? 10 : kamp.taperMaal;
            return (
              <li
                key={kamp.id}
                className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 text-sm"
              >
                <span className="truncate text-right">
                  {kamp.lag1Spiller1.navn} & {kamp.lag1Spiller2.navn}
                </span>
                <span className="font-mono font-semibold whitespace-nowrap">
                  {lag1Maal} – {lag2Maal}
                </span>
                <span className="truncate">
                  {kamp.lag2Spiller1.navn} & {kamp.lag2Spiller2.navn}
                </span>
                <span className="text-muted-foreground col-span-3 text-center text-xs">
                  {new Date(kamp.dato).toLocaleDateString("nb-NO")}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
