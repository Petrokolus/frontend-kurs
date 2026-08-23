"use client";

import { useForm, UseFormReturn, Path } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import { useRef } from "react";

type SkjemaData = {
  navn: string;
  avdeling: string;
  kull: string;
  posisjon: string;
  styrke?: string;
  svakhet?: string;
};

export default function OpprettSpillerSkjema() {
  const router = useRouter();
  const form = useForm<SkjemaData>();
  const bildeRef = useRef<HTMLInputElement>(null);

  async function opprettSpiller(data: SkjemaData) {
    const response = await fetch("http://localhost:3000/api/spillere", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      form.setError("root", { message: "Noe gikk galt. Prøv igjen." });
      return;
    }

    const spiller = await response.json();
    const fil = bildeRef.current?.files?.[0];
    if (fil) {
      const formData = new FormData();
      formData.append("bilde", fil);
      await fetch(`http://localhost:3000/api/spillere/${spiller.id}/bilde`, {
        method: "POST",
        body: formData,
      });
    }
    router.push(`/spillere/${spiller.id}`);
  }

  return (
    <form
      // eslint-disable-next-line react-hooks/refs
      onSubmit={form.handleSubmit(opprettSpiller)}
      className="flex flex-col gap-4"
    >
      <SkjemaFelt id="navn" label="Navn" isRequired form={form} />
      <SkjemaFelt id="avdeling" label="Avdeling" isRequired form={form} />
      <SkjemaFelt id="kull" label="Kull" isRequired form={form} />
      <SkjemaFelt id="posisjon" label="Posisjon" isRequired form={form} />
      <SkjemaFelt id="styrke" label="Styrke (valgfritt)" form={form} />
      <SkjemaFelt id="svakhet" label="Svakhet (valgfritt)" form={form} />

      <div className="flex flex-col gap-1">
        <Label className="text-lg" htmlFor="bilde">
          Bilde (valgfritt)
        </Label>
        <input
          id="bilde"
          type="file"
          accept="image/*"
          ref={bildeRef}
          className="file:bg-twoday-olive cursor-pointer file:mr-4 file:cursor-pointer file:rounded file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
        />
      </div>

      <FieldError errors={[form.formState.errors.root]} />
      <Button type="submit" className="bg-twoday-amber">
        Opprett spiller
      </Button>
    </form>
  );
}

type SkjemaFeltProps = {
  id: Path<SkjemaData>;
  label: string;
  isRequired?: boolean;
  form: UseFormReturn<SkjemaData>;
};

function SkjemaFelt({ id, label, isRequired, form }: SkjemaFeltProps) {
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
