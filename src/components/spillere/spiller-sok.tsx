"use client";

import { ChangeEvent, useEffect, useRef } from "react";

type Props = {
  sok: string;
  setSok: (verdi: string) => void;
};

export default function SpillerSok({ sok, setSok }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSok(e.target.value);
    localStorage.setItem("spillerSok", e.target.value);
  }
  return (
    <div>
      <label htmlFor="sok" className="sr-only">
        Søk etter spillere
      </label>
      <input
        id="sok"
        ref={inputRef}
        type="text"
        placeholder="Søk etter spillere..."
        className="mb-4 w-full rounded border px-3 py-2"
        value={sok}
        onChange={handleChange}
      />
    </div>
  );
}
