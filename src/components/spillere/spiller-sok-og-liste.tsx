"use client";

import { Spiller } from "@/lib/types";
import { useEffect, useState } from "react";
import SpillereListe from "./spillere-liste";
import SpillerSok from "./spiller-sok";

type Props = {
  spillere: Spiller[];
};

export default function SpillerSokOgListe({ spillere }: Props) {
  const [sok, setSok] = useState("");

  useEffect(() => {
    setSok(localStorage.getItem("spillerSok") ?? "");
  }, []);

  useEffect(() => {
    localStorage.setItem("spillerSok", sok);
  }, [sok]);

  const filtrerteSpillere = spillere.filter((spiller) =>
    spiller.navn.toLowerCase().includes(sok.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <SpillerSok sok={sok} setSok={setSok} />
      <SpillereListe spillere={filtrerteSpillere} />
    </div>
  );
}
