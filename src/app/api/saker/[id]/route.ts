import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sak = await prisma.sak.findUnique({
    where: { id: Number(id) },
  });

  if (!sak) {
    return NextResponse.json({ error: "Sak ikke funnet" }, { status: 404 });
  }

  return NextResponse.json(sak);
}
