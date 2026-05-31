import fs from "node:fs";
import path from "node:path";
import { ReadmeRenderer } from "@/components/readme-renderer";

export default function OppgaverPage() {
  const readme = fs.readFileSync(
    path.join(process.cwd(), "README.md"),
    "utf-8",
  );

  return (
    <div className="p-8 max-w-3xl">
      <ReadmeRenderer content={readme} />
    </div>
  );
}
