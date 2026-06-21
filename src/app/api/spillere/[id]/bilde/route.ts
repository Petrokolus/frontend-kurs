import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await request.formData();
  const file = formData.get("bilde") as File;

  if (!file) {
    return NextResponse.json({ error: "Ingen fil oppgitt" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = join(process.cwd(), "public", "spiller", `${id}.png`);

  await writeFile(filePath, buffer);

  return NextResponse.json({ ok: true });
}
