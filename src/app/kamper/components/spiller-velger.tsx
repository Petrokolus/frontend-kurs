"use client";

import { Spiller } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  label: string;
  spillere: Spiller[];
  value: string;
  onChange: (val: string) => void;
};

export default function SpillerVelger({
  label,
  spillere,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Velg spiller" />
        </SelectTrigger>
        <SelectContent>
          {spillere.map((s) => (
            <SelectItem key={s.id} value={String(s.id)}>
              {s.navn}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
