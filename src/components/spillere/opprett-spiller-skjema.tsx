"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";

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

  async function opprettSpiller(data: SkjemaData) {
    const response = await fetch("http://localhost:3000/api/spillere", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const spiller = await response.json();
      router.push(`/spillere/${spiller.id}`);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(opprettSpiller)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="navn" className="text-lg">
          Navn
        </Label>
        <Input
          id="navn"
          {...form.register("navn", { required: "Navn er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.navn]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="avdeling" className="text-lg">
          Avdeling
        </Label>
        <Input
          id="avdeling"
          {...form.register("avdeling", { required: "Avdeling er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.avdeling]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="kull" className="text-lg">
          Kull
        </Label>
        <Input
          id="kull"
          {...form.register("kull", { required: "Kull er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.kull]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="posisjon" className="text-lg">
          Posisjon
        </Label>
        <Input
          id="posisjon"
          {...form.register("posisjon", { required: "Posisjon er påkrevd" })}
        />
        <FieldError errors={[form.formState.errors.posisjon]} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="styrke" className="text-lg">
          Styrke (valgfritt)
        </Label>
        <Input id="styrke" {...form.register("styrke")} />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="svakhet" className="text-lg">
          Svakhet (valgfritt)
        </Label>
        <Input id="svakhet" {...form.register("svakhet")} />
      </div>

      <Button type="submit" className="bg-twoday-amber">
        Opprett spiller
      </Button>
    </form>
  );
}
