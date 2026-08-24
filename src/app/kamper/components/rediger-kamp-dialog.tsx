"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Kamp, Spiller } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SpillerVelger from "./spiller-velger";

type SkjemaData = {
  lag1Spiller1Id: string;
  lag1Spiller2Id: string;
  lag2Spiller1Id: string;
  lag2Spiller2Id: string;
  lagVinner: string;
  taperMaal: string;
};

type Props = {
  kamp: Kamp;
  spillere: Spiller[];
};

const taperMaalAlternativer = Array.from({ length: 10 }, (_, i) => String(i));

export default function RedigerKampDialog({ kamp, spillere }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { handleSubmit, setValue, watch } = useForm<SkjemaData>({
    defaultValues: {
      lag1Spiller1Id: String(kamp.lag1Spiller1.id),
      lag1Spiller2Id: String(kamp.lag1Spiller2.id),
      lag2Spiller1Id: String(kamp.lag2Spiller1.id),
      lag2Spiller2Id: String(kamp.lag2Spiller2.id),
      lagVinner: String(kamp.lagVinner),
      taperMaal: String(kamp.taperMaal),
    },
  });

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
    await fetch(`http://localhost:3000/api/kamper/${kamp.id}`, {
      method: "PUT",
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
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <Pencil />
          <span className="sr-only">Rediger kamp</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger kamp</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(registrerKampResultat)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Lag 1</p>
              <SpillerVelger
                label="Spiller 1"
                spillere={tilgjengelige([s2, s3, s4])}
                value={s1}
                onChange={(val) => setValue("lag1Spiller1Id", val)}
              />
              <SpillerVelger
                label="Spiller 2"
                spillere={tilgjengelige([s1, s3, s4])}
                value={s2}
                onChange={(val) => setValue("lag1Spiller2Id", val)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Lag 2</p>
              <SpillerVelger
                label="Spiller 1"
                spillere={tilgjengelige([s1, s2, s4])}
                value={s3}
                onChange={(val) => setValue("lag2Spiller1Id", val)}
              />
              <SpillerVelger
                label="Spiller 2"
                spillere={tilgjengelige([s1, s2, s3])}
                value={s4}
                onChange={(val) => setValue("lag2Spiller2Id", val)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Vinnende lag</label>
            <Select
              value={watch("lagVinner")}
              onValueChange={(val) => setValue("lagVinner", val)}
            >
              <SelectTrigger>
                <SelectValue />
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
              value={watch("taperMaal")}
              onValueChange={(val) => setValue("taperMaal", val)}
            >
              <SelectTrigger>
                <SelectValue />
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
          <Button type="submit">Lagre endringer</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
