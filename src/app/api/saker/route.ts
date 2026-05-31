import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const saker = await prisma.sak.findMany({
    orderBy: { opprettet: "desc" },
  });

  return NextResponse.json(saker);
}
