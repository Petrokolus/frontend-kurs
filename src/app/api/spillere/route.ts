import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const spillere = await prisma.spiller.findMany({
    orderBy: { rating: "desc" },
  });

  return NextResponse.json(spillere);
}
