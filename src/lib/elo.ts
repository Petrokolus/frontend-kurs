const K = 40;
const K_SKYGGE = 80;
const D = 500;
const VINNER_MAAL = 10;
const SKYGGE_VEKTER = [1.0, 0.8, 0.6, 0.4, 0.2];

function forventetResultat(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / D));
}

function maalDifferanseVekting(diff: number): number {
  return Math.pow(1 + 0.1 * diff, 2);
}

export function beregnEloEndringer(
  lag1Spiller1Rating: number,
  lag1Spiller2Rating: number,
  lag2Spiller1Rating: number,
  lag2Spiller2Rating: number,
  lagVinner: number,
  taperMaal: number
): { lag1Delta: number; lag2Delta: number } {
  const lagARating = (lag1Spiller1Rating + lag1Spiller2Rating) / 2;
  const lagBRating = (lag2Spiller1Rating + lag2Spiller2Rating) / 2;

  const diff = VINNER_MAAL - taperMaal;
  const G = maalDifferanseVekting(diff);
  const E_A = forventetResultat(lagARating, lagBRating);
  const S_A = lagVinner === 1 ? 1 : 0;

  const deltaLag = G * K * (S_A - E_A);

  return {
    lag1Delta: deltaLag / 2,
    lag2Delta: -deltaLag / 2,
  };
}

// deltas: individuelle ELO-endringer for spilleren, nyeste kamp forst (maks 5)
export function beregnSkyggerating(deltas: number[]): number {
  const skalering = K_SKYGGE / K;
  const sum = deltas.reduce(
    (acc, delta, i) => acc + SKYGGE_VEKTER[i] * skalering * delta,
    0
  );
  return Math.round(500 + sum);
}
