"use client";

import { UseFormReturn, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";

type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
  styrke?: string;
  svakhet?: string;
};

type SkjemaFeltProps = {
  id: Path<SkjemaData>;
  label: string;
  isRequired?: boolean;
  form: UseFormReturn<SkjemaData>;
};

export default function SkjemaFelt({
  id,
  label,
  isRequired,
  form,
}: SkjemaFeltProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-lg" htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        {...form.register(id, {
          required: isRequired ? `${label} er påkrevd` : false,
        })}
      />
      <FieldError errors={[form.formState.errors[id]]} />
    </div>
  );
}
