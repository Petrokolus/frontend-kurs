import { Spiller } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  sorterPa: "rating" | "skyggerating";
  tittel: string;
};

export default async function Toppliste({ sorterPa, tittel }: Props) {
  const res = await fetch("http://localhost:3000/api/spillere");
  const spillere: Spiller[] = await res.json();

  const topp5 = spillere
    .toSorted((a, b) => b[sorterPa] - a[sorterPa])
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tittel}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-2">
          {topp5.map((spiller, index) => (
            <li key={spiller.id} className="flex items-center justify-between">
              <span>
                <span className="text-muted-foreground mr-3">{index + 1}.</span>
                {spiller.navn}
              </span>
              <span className="font-mono font-semibold">
                {spiller[sorterPa]}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
