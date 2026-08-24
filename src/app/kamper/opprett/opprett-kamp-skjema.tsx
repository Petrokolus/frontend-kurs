"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Spiller } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SpillerVelger from "@/app/kamper/components/spiller-velger";

type SkjemaData = {
  lag1Spiller1Id: string;
  lag1Spiller2Id: string;
  lag2Spiller1Id: string;
  lag2Spiller2Id: string;
  lagVinner: string;
  taperMaal: string;
};

type Props = {
  spillere: Spiller[];
};

const taperMaalAlternativer = Array.from({ length: 10 }, (_, i) => String(i));

export default function OpprettKampSkjema({ spillere }: Props) {
  const router = useRouter();
  const { handleSubmit, setValue, watch } = useForm<SkjemaData>();

  const [s1, s2, s3, s4] = [
    watch("lag1Spiller1Id"),
    watch("lag1Spiller2Id"),
    watch("lag2Spiller1Id"),
    watch("lag2Spiller2Id"),
  ];

  function tilgjengelige(ekskluder: (string | undefined)[]) {
    const ids = ekskluder.filter(Boolean) as string[];
    return spillere.filter((s) => !ids.includes(String(s.id)));
  }

  async function registrerKampResultat(data: SkjemaData) {
    await fetch("http://localhost:3000/api/kamper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lag1Spiller1Id: parseInt(data.lag1Spiller1Id),
        lag1Spiller2Id: parseInt(data.lag1Spiller2Id),
        lag2Spiller1Id: parseInt(data.lag2Spiller1Id),
        lag2Spiller2Id: parseInt(data.lag2Spiller2Id),
        lagVinner: parseInt(data.lagVinner),
        taperMaal: parseInt(data.taperMaal),
      }),
    });
    router.push("/kamper");
  }

  return (
    <form
      onSubmit={handleSubmit(registrerKampResultat)}
      className="flex flex-col gap-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Lag 1</p>
          <SpillerVelger
            label="Spiller 1"
            spillere={tilgjengelige([s2, s3, s4])}
            value={s1 ?? ""}
            onChange={(val) => setValue("lag1Spiller1Id", val)}
          />
          <SpillerVelger
            label="Spiller 2"
            spillere={tilgjengelige([s1, s3, s4])}
            value={s2 ?? ""}
            onChange={(val) => setValue("lag1Spiller2Id", val)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Lag 2</p>
          <SpillerVelger
            label="Spiller 1"
            spillere={tilgjengelige([s1, s2, s4])}
            value={s3 ?? ""}
            onChange={(val) => setValue("lag2Spiller1Id", val)}
          />
          <SpillerVelger
            label="Spiller 2"
            spillere={tilgjengelige([s1, s2, s3])}
            value={s4 ?? ""}
            onChange={(val) => setValue("lag2Spiller2Id", val)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Vinnende lag</label>
        <Select
          value={watch("lagVinner") ?? ""}
          onValueChange={(val) => setValue("lagVinner", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Velg lag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Lag 1</SelectItem>
            <SelectItem value="2">Lag 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Taperlagets mål</label>
        <Select
          value={watch("taperMaal") ?? ""}
          onValueChange={(val) => setValue("taperMaal", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Velg antall mål" />
          </SelectTrigger>
          <SelectContent>
            {taperMaalAlternativer.map((maal) => (
              <SelectItem key={maal} value={maal}>
                {maal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Registrer kamp</Button>
    </form>
  );
}
