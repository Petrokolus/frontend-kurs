import { Spiller } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function StatistikkKort() {
  const [spillereRes, kamperRes] = await Promise.all([
    fetch("http://localhost:3000/api/spillere"),
    fetch("http://localhost:3000/api/kamper?side=1&perSide=1"),
  ]);
  const spillere: Spiller[] = await spillereRes.json();
  const { totalt }: { totalt: number } = await kamperRes.json();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Spillere</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{spillere.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Kamper spilt</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalt}</p>
        </CardContent>
      </Card>
    </div>
  );
}
