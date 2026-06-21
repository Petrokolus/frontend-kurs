"use client";

import { useEffect, useRef } from "react";

type Props = {
  sok: string;
  setSok: (sok: string) => void;
};

export default function SpillerSok({ sok, setSok }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Søk etter spillere..."
      className="w-full rounded border px-3 py-2"
      value={sok}
      onChange={(e) => setSok(e.target.value)}
    />
  );
}
