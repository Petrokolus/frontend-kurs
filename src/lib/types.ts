export type Posisjon = "Angriper" | "Midtbane" | "Forsvarer" | "Keeper";

export type Spiller = {
  id: number;
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
  styrke?: string | null;
  svakhet?: string | null;
  rating: number;
  skyggerating?: number | null;
};
