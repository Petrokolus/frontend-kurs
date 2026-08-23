export type OppgaveManifestEntry = {
  del: number;
  nr: number | null;
  navLabel: string;
  tittel: string;
  file: string;
};

export const oppgaver: OppgaveManifestEntry[] = [
  {
    del: 1,
    nr: 1,
    navLabel: "Oppgave 1",
    tittel: "Vis alle spillere",
    file: "01-vis-alle-spillere.md",
  },
  {
    del: 2,
    nr: 2,
    navLabel: "Oppgave 2",
    tittel: "Spillerdetaljer",
    file: "02-spillerdetaljer.md",
  },
  {
    del: 3,
    nr: 3,
    navLabel: "Oppgave 3",
    tittel: "Opprett spiller",
    file: "03-opprett-spiller.md",
  },
  {
    del: 4,
    nr: 4,
    navLabel: "Oppgave 4",
    tittel: "Hooks i praksis",
    file: "04-hooks-i-praksis.md",
  },
  {
    del: 5,
    nr: 5,
    navLabel: "Oppgave 5",
    tittel: "Opprett spiller med React Hook Form",
    file: "05-opprett-spiller-med-react-hook-form.md",
  },
  {
    del: 6,
    nr: 6,
    navLabel: "Oppgave 6",
    tittel: "Rediger spiller",
    file: "06-rediger-spiller.md",
  },
  {
    del: 7,
    nr: 7,
    navLabel: "Oppgave 7",
    tittel: "Slett spiller",
    file: "07-slett-spiller.md",
  },
  {
    del: 8,
    nr: 8,
    navLabel: "Oppgave 8",
    tittel: "Filtrering og sortering",
    file: "08-filtrering-og-sortering-av-spillere.md",
  },
  {
    del: 9,
    nr: 9,
    navLabel: "Oppgave 9",
    tittel: "Alt du kan, brukt på nytt",
    file: "09-alt-du-kan-brukt-pa-nytt.md",
  },
  {
    del: 10,
    nr: 10,
    navLabel: "Oppgave 10",
    tittel: "Dashboard",
    file: "10-dashboard.md",
  },
  {
    del: 11,
    nr: null,
    navLabel: "Veien videre",
    tittel: "Veien videre",
    file: "11-veien-videre.md",
  },
];

export function getOppgaveByDel(del: number | undefined) {
  if (!del) return undefined;
  return oppgaver.find((o) => o.del === del);
}

export function getPrevOppgave(del: number) {
  return oppgaver.find((o) => o.del === del - 1);
}

export function getNextOppgave(del: number) {
  return oppgaver.find((o) => o.del === del + 1);
}

const NAV_MARKER = /<!-- nav:start -->[\s\S]*?<!-- nav:end -->/g;

// README.md og docs/oppgaver/*.md har lenker for forrige/neste-navigasjon
// inni nav:start/nav:end-kommentarer, slik at de også fungerer på GitHub. I
// appen har vi egen navigasjon via <OppgaveNav>, så vi fjerner disse markørene her.
export function stripNavMarkers(content: string): string {
  return content.replace(NAV_MARKER, "").trim();
}
