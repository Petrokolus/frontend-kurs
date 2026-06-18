import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const spillere = await prisma.spiller.findMany({
    orderBy: { rating: "desc" },
  });

  return NextResponse.json(spillere);
}

export async function POST(request: Request) {
  const body = await request.json();

  const spiller = await prisma.spiller.create({
    data: {
      navn: body.navn,
      avdeling: body.avdeling,
      kull: body.kull,
      posisjon: body.posisjon,
      styrke: body.styrke ?? null,
      svakhet: body.svakhet ?? null,
    },
  });

  return NextResponse.json(spiller, { status: 201 });
}
