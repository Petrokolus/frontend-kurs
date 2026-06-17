"use client";

import { Spiller } from "@/lib/types";
import { useState } from "react";
import SpillereListe from "./spillere-liste";
import SpillerSok from "./spiller-sok";

type Props = {
  spillere: Spiller[];
};

export default function SpillerSokOgListe({ spillere }: Props) {
  // Oppgave 4b: Legg til useState for søketeksten her

  // Oppgave 4b: Filtrer spillerlisten basert på søketeksten her

  return (
    <div className="flex flex-col gap-4">
      {/* Oppgave 4b: Vis SpillerSok her og send inn sok og setSok som props */}
      <SpillereListe spillere={spillere} />
    </div>
  );
}
