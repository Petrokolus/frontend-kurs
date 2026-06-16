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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.spiller.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    return NextResponse.json({ error: "Spiller ikke funnet" }, { status: 404 });
  }

  const spiller = await prisma.spiller.update({
    where: { id: Number(id) },
    data: {
      navn: body.navn,
      avdeling: body.avdeling,
      kull: body.kull,
      posisjon: body.posisjon,
      styrke: body.styrke || null,
      svakhet: body.svakhet || null,
    },
  });

  return NextResponse.json(spiller);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existing = await prisma.spiller.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) {
    return NextResponse.json({ error: "Spiller ikke funnet" }, { status: 404 });
  }

  await prisma.spiller.delete({
    where: { id: Number(id) },
  });

  return new NextResponse(null, { status: 204 });
}
