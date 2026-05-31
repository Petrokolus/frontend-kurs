export type SakStatus = "Åpen" | "Under behandling" | "Lukket";
export type SakType = "Klage" | "Søknad" | "Henvendelse";

export type Sak = {
  id: number;
  tittel: string;
  beskrivelse: string;
  status: SakStatus;
  type: SakType;
  saksbehandler: string;
  opprettet: string;
};
