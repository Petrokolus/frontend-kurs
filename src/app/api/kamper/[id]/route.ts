import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const include = {
  lag1Spiller1: true,
  lag1Spiller2: true,
  lag2Spiller1: true,
  lag2Spiller2: true,
};

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  const kamp = await prisma.kamp.findUnique({
    where: { id: parseInt(id) },
    include,
  });

  if (!kamp) {
    return NextResponse.json({ error: "Kamp ikke funnet" }, { status: 404 });
  }

  return NextResponse.json(kamp);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();

  const kamp = await prisma.kamp.update({
    where: { id: parseInt(id) },
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

  return NextResponse.json(kamp);
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;

  await prisma.kamp.delete({ where: { id: parseInt(id) } });

  return new NextResponse(null, { status: 204 });
}
