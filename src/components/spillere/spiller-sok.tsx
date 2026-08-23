"use client";

import { useState } from "react";

export default function SpillerSok() {
  const [sok, setSok] = useState("");
  return (
    <div>
      <label htmlFor="sok" className="sr-only">
        Søk etter spillere
      </label>
      <input
        id="sok"
        type="text"
        placeholder="Søk etter spillere..."
        className="mb-4 w-full rounded border px-3 py-2"
        value={sok}
        onChange={(e) => setSok(e.target.value)}
      />
    </div>
  );
}
