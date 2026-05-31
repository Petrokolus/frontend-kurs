import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sak } from "@/lib/types";
import { StatusBadge } from "./status-badge";

type Props = {
  sak: Sak;
};

export function SakCard({ sak }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <CardTitle className="text-base">{sak.tittel}</CardTitle>
        <StatusBadge status={sak.status} />
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-1">
        <p>Type: {sak.type}</p>
        <p>Saksbehandler: {sak.saksbehandler}</p>
        <p>Opprettet: {new Date(sak.opprettet).toLocaleDateString("nb-NO")}</p>
      </CardContent>
    </Card>
  );
}
