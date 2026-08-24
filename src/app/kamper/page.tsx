import { Kamp, Spiller } from "@/lib/types";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import RedigerKampDialog from "./components/rediger-kamp-dialog";
import SlettKampKnapp from "./components/slett-kamp-knapp";

const PER_SIDE = 10;

type Props = {
  searchParams: Promise<{ side?: string }>;
};

export default async function KamperPage({ searchParams }: Props) {
  const { side: sideParam } = await searchParams;
  const side = Math.max(1, parseInt(sideParam ?? "1"));

  // Promise.all kjører begge kallene parallelt
  const [kamperResponse, spillereResponse] = await Promise.all([
    fetch(`http://localhost:3000/api/kamper?side=${side}&perSide=${PER_SIDE}`),
    fetch("http://localhost:3000/api/spillere"),
  ]);
  const { kamper, totalt }: { kamper: Kamp[]; totalt: number } =
    await kamperResponse.json();
  const spillere: Spiller[] = await spillereResponse.json();

  const antallSider = Math.ceil(totalt / PER_SIDE);

  function resultat(kamp: Kamp) {
    const lag1Maal = kamp.lagVinner === 1 ? 10 : kamp.taperMaal;
    const lag2Maal = kamp.lagVinner === 2 ? 10 : kamp.taperMaal;
    return `${lag1Maal} – ${lag2Maal}`;
  }

  return (
    <div className="max-w-5xl p-8 mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kamphistorikk</h1>
        <Button asChild>
          <Link href="/kamper/opprett">Registrer kamp</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dato</TableHead>
            <TableHead>Lag 1</TableHead>
            <TableHead>Resultat</TableHead>
            <TableHead>Lag 2</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kamper.map((kamp) => (
            <TableRow key={kamp.id}>
              <TableCell>
                {new Date(kamp.dato).toLocaleDateString("nb-NO")}
              </TableCell>
              <TableCell className="max-w-40 truncate">
                {kamp.lag1Spiller1.navn} & {kamp.lag1Spiller2.navn}
              </TableCell>
              <TableCell className="font-mono">{resultat(kamp)}</TableCell>
              <TableCell className="max-w-40 truncate">
                {kamp.lag2Spiller1.navn} & {kamp.lag2Spiller2.navn}
              </TableCell>
              <TableCell className="flex items-center justify-end gap-1">
                <Button asChild variant="ghost" size="icon-sm">
                  <Link href={`/kamper/${kamp.id}`}>
                    <Eye />
                    <span className="sr-only">Gå til kamp</span>
                  </Link>
                </Button>
                <RedigerKampDialog kamp={kamp} spillere={spillere} />
                <SlettKampKnapp kamp={kamp} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Side {side} av {antallSider}
        </p>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              {side > 1 && (
                <PaginationPrevious
                  href={`/kamper?side=${side - 1}`}
                  text="Forrige"
                />
              )}
            </PaginationItem>
            <PaginationItem>
              {side < antallSider && (
                <PaginationNext
                  href={`/kamper?side=${side + 1}`}
                  text="Neste"
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
