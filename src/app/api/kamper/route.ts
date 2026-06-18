import { beregnEloEndringer, beregnSkyggerating } from "@/lib/elo";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const include = {
  lag1Spiller1: true,
  lag1Spiller2: true,
  lag2Spiller1: true,
  lag2Spiller2: true,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const side = Math.max(1, parseInt(searchParams.get("side") ?? "1"));
  const perSide = Math.max(1, parseInt(searchParams.get("perSide") ?? "10"));

  const [kamper, totalt] = await Promise.all([
    prisma.kamp.findMany({
      include,
      orderBy: { dato: "desc" },
      skip: (side - 1) * perSide,
      take: perSide,
    }),
    prisma.kamp.count(),
  ]);

  return NextResponse.json({ kamper, totalt });
}

async function hentSkyggerating(spillerId: number): Promise<number> {
  const kamper = await prisma.kamp.findMany({
    where: {
      OR: [
        { lag1Spiller1Id: spillerId },
        { lag1Spiller2Id: spillerId },
        { lag2Spiller1Id: spillerId },
        { lag2Spiller2Id: spillerId },
      ],
    },
    orderBy: { dato: "desc" },
    take: 5,
    select: {
      ratingDelta: true,
      lag1Spiller1Id: true,
      lag1Spiller2Id: true,
    },
  });

  const deltas = kamper.map((k) => {
    const erLag1 =
      k.lag1Spiller1Id === spillerId || k.lag1Spiller2Id === spillerId;
    return erLag1 ? k.ratingDelta : -k.ratingDelta;
  });

  return beregnSkyggerating(deltas);
}

export async function POST(request: Request) {
  const body = await request.json();

  const [s1, s2, s3, s4] = await Promise.all([
    prisma.spiller.findUniqueOrThrow({ where: { id: body.lag1Spiller1Id } }),
    prisma.spiller.findUniqueOrThrow({ where: { id: body.lag1Spiller2Id } }),
    prisma.spiller.findUniqueOrThrow({ where: { id: body.lag2Spiller1Id } }),
    prisma.spiller.findUniqueOrThrow({ where: { id: body.lag2Spiller2Id } }),
  ]);

  const { lag1Delta, lag2Delta } = beregnEloEndringer(
    s1.rating,
    s2.rating,
    s3.rating,
    s4.rating,
    body.lagVinner,
    body.taperMaal
  );

  const [kamp] = await prisma.$transaction([
    prisma.kamp.create({
      data: {
        lag1Spiller1Id: body.lag1Spiller1Id,
        lag1Spiller2Id: body.lag1Spiller2Id,
        lag2Spiller1Id: body.lag2Spiller1Id,
        lag2Spiller2Id: body.lag2Spiller2Id,
        lagVinner: body.lagVinner,
        taperMaal: body.taperMaal,
        ratingDelta: lag1Delta,
      },
      include,
    }),
    prisma.spiller.update({
      where: { id: s1.id },
      data: { rating: Math.round(s1.rating + lag1Delta) },
    }),
    prisma.spiller.update({
      where: { id: s2.id },
      data: { rating: Math.round(s2.rating + lag1Delta) },
    }),
    prisma.spiller.update({
      where: { id: s3.id },
      data: { rating: Math.round(s3.rating + lag2Delta) },
    }),
    prisma.spiller.update({
      where: { id: s4.id },
      data: { rating: Math.round(s4.rating + lag2Delta) },
    }),
  ]);

  const [sky1, sky2, sky3, sky4] = await Promise.all([
    hentSkyggerating(s1.id),
    hentSkyggerating(s2.id),
    hentSkyggerating(s3.id),
    hentSkyggerating(s4.id),
  ]);

  await prisma.$transaction([
    prisma.spiller.update({ where: { id: s1.id }, data: { skyggerating: sky1 } }),
    prisma.spiller.update({ where: { id: s2.id }, data: { skyggerating: sky2 } }),
    prisma.spiller.update({ where: { id: s3.id }, data: { skyggerating: sky3 } }),
    prisma.spiller.update({ where: { id: s4.id }, data: { skyggerating: sky4 } }),
  ]);

  return NextResponse.json(kamp, { status: 201 });
}
