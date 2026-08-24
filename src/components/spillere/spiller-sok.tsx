"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sorteringsalternativer = [
  { verdi: "rating-desc", label: "Rating (høyest først)" },
  { verdi: "rating-asc", label: "Rating (lavest først)" },
  { verdi: "navn-asc", label: "Navn (A-Z)" },
];

export default function SpillerSok() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sorter = searchParams.get("sorter") ?? "rating-desc";
  const [inputVerdi, setInputVerdi] = useState(searchParams.get("sok") ?? "");

  function oppdaterParams(nokkel: string, verdi: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (verdi) {
      params.set(nokkel, verdi);
    } else {
      params.delete(nokkel);
    }
    router.replace(`/spillere?${params.toString()}`);
  }

  const debouncedOppdater = useDebouncedCallback((verdi: string) => {
    oppdaterParams("sok", verdi);
  }, 300);

  function handleChange(verdi: string) {
    setInputVerdi(verdi);
    debouncedOppdater(verdi);
  }

  return (
    <div className="flex gap-4">
      <div>
        <label htmlFor="sok" className="sr-only">
          Søk etter spillere
        </label>
        <input
          id="sok"
          ref={inputRef}
          value={inputVerdi}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Søk etter spiller..."
          className="rounded border px-3 py-2"
        />
      </div>
      <Select
        value={sorter}
        onValueChange={(verdi) => oppdaterParams("sorter", verdi)}
      >
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sorteringsalternativer.map((alternativ) => (
            <SelectItem key={alternativ.verdi} value={alternativ.verdi}>
              {alternativ.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
