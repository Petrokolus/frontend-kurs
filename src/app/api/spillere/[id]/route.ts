import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const spiller = await prisma.spiller.findUnique({
    where: { id: Number(id) },
  });

  if (!spiller) {
    return NextResponse.json({ error: "Spiller ikke funnet" }, { status: 404 });
  }

  return NextResponse.json(spiller);
}
