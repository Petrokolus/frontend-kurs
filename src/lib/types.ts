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
  skyggerating: number;
};

export type Kamp = {
  id: number;
  lagVinner: number;
  taperMaal: number;
  dato: string;
  lag1Spiller1: Spiller;
  lag1Spiller2: Spiller;
  lag2Spiller1: Spiller;
  lag2Spiller2: Spiller;
};
