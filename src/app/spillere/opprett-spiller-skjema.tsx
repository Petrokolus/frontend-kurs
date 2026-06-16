"use client";

import { useState } from "react";

// Oppgave 3b: Legg til de resterende feltene i dette objektet
type SkjemaData = {
  navn: string;
};

export default function OpprettSpillerSkjema() {
  // Oppgave 3b: Legg til de resterende feltene i startverdiene
  const [skjema, setSkjema] = useState<SkjemaData>({
    navn: "",
  });

  // Oppgave 3d: Fyll inn denne funksjonen slik at den sender skjema-dataen til APIet
  async function handleSubmit(data: SkjemaData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(skjema);
      }}
      className="flex flex-col gap-4"
    >
      {/* Oppgave 3a: Her er ett eksempel-felt. Kopier mønsteret for de andre feltene. */}
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

      {/* Oppgave 3a: Legg til inputfelter for avdeling, kull og posisjon her */}

      {/* Oppgave 3c: Legg til valgfrie felter for styrke og svakhet */}

      <button
        type="submit"
        className="bg-twoday-amber rounded px-4 py-2 font-semibold"
      >
        Opprett spiller
      </button>
    </form>
  );
}
