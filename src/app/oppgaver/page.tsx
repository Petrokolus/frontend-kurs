import fs from "node:fs";
import path from "node:path";
import { ReadmeRenderer } from "@/components/readme-renderer";
import { OppgaveNav } from "@/components/oppgave-nav";
import { getOppgaveByDel, stripNavMarkers } from "@/lib/oppgaver";

type Props = {
  searchParams: Promise<{ del?: string }>;
};

export default async function OppgaverPage({ searchParams }: Props) {
  const { del: delParam } = await searchParams;
  const oppgave = getOppgaveByDel(delParam ? Number(delParam) : undefined);

  if (!oppgave) {
    const rawReadme = fs.readFileSync(
      path.join(process.cwd(), "README.md"),
      "utf-8"
    );
    const readme = stripNavMarkers(rawReadme);

    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
        <ReadmeRenderer content={readme} />
        <OppgaveNav />
      </div>
    );
  }

  const rawContent = fs.readFileSync(
    path.join(process.cwd(), "docs", "oppgaver", oppgave.file),
    "utf-8"
  );
  const content = stripNavMarkers(rawContent);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-8">
      <OppgaveNav del={oppgave.del} />
      <ReadmeRenderer content={content} />
      <OppgaveNav del={oppgave.del} />
    </div>
  );
}
