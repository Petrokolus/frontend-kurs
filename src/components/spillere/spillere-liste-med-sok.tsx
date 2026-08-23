"use client";

import { Spiller } from "@/lib/types";
import { useEffect, useState } from "react";
import SpillereListe from "./spillere-liste";
import SpillerSok from "./spiller-sok";

type Props = {
  spillere: Spiller[];
};

export default function SpillereListeMedSok({ spillere }: Props) {
  const [sok, setSok] = useState("");

  useEffect(() => {
    setSok(localStorage.getItem("spillerSok") ?? "");
  }, []);

  const filtrerteSpillere = spillere.filter((spiller) =>
    spiller.navn.toLowerCase().includes(sok.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-4">
      <SpillerSok setSok={setSok} sok={sok} />
      <SpillereListe spillere={filtrerteSpillere} />
    </div>
  );
}
