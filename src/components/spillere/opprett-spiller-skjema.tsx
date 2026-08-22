"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spiller } from "@/lib/types";

type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
  styrke?: string;
  svakhet?: string;
};

export default function OpprettSpillerSkjema() {
  const router = useRouter();

  const [skjema, setSkjema] = useState<SkjemaData>({
    navn: "",
    avdeling: "",
    kull: "",
    posisjon: "",
    styrke: "",
    svakhet: "",
  });

  async function handleSubmit(data: SkjemaData) {
    const response = await fetch("http://localhost:3000/api/spillere", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const spiller: Spiller = await response.json();
      router.push(`/spillere/${spiller.id}`);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(skjema);
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="navn">Navn</label>
        <input
          id="navn"
          type="text"
          value={skjema.navn}
          onChange={(e) => setSkjema({ ...skjema, navn: e.target.value })}
          className="rounded border px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="avdeling">Avdeling</label>
        <input
          id="avdeling"
          type="text"
          value={skjema.avdeling}
          onChange={(e) => setSkjema({ ...skjema, avdeling: e.target.value })}
          className="rounded border px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="kull">Kull</label>
        <input
          id="kull"
          type="text"
          value={skjema.kull}
          onChange={(e) => setSkjema({ ...skjema, kull: e.target.value })}
          className="rounded border px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="posisjon">Posisjon</label>
        <input
          id="posisjon"
          type="text"
          value={skjema.posisjon}
          onChange={(e) => setSkjema({ ...skjema, posisjon: e.target.value })}
          className="rounded border px-3 py-2"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="styrke">Styrke (valgfritt)</label>
        <input
          id="styrke"
          type="text"
          value={skjema.styrke}
          onChange={(e) => setSkjema({ ...skjema, styrke: e.target.value })}
          className="rounded border px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="svakhet">Svakhet (valgfritt)</label>
        <input
          id="svakhet"
          type="text"
          value={skjema.svakhet}
          onChange={(e) => setSkjema({ ...skjema, svakhet: e.target.value })}
          className="rounded border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-twoday-amber cursor-pointer rounded px-4 py-2 font-semibold"
      >
        Opprett spiller
      </button>
    </form>
  );
}
