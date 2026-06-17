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

export async function POST(request: Request) {
  const body = await request.json();

  const kamp = await prisma.kamp.create({
    data: {
      lag1Spiller1Id: body.lag1Spiller1Id,
      lag1Spiller2Id: body.lag1Spiller2Id,
      lag2Spiller1Id: body.lag2Spiller1Id,
      lag2Spiller2Id: body.lag2Spiller2Id,
      lagVinner: body.lagVinner,
      taperMaal: body.taperMaal,
    },
    include,
  });

  return NextResponse.json(kamp, { status: 201 });
}
