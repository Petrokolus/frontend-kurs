"use client";

import { useState } from "react";
import { useForm, useFormContext, FormProvider, Path } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spiller } from "@/lib/types";

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
  required?: boolean;
};

function SkjemaFelt({ id, label, required }: SkjemaFeltProps) {
  const form = useFormContext<SkjemaData>();
  const requiredErrorMessage = required ? `${label} er påkrevd` : undefined;
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        {...form.register(id, { required: requiredErrorMessage })}
      />
      <FieldError errors={[form.formState.errors[id]]} />
    </div>
  );
}

type SkjemaProps = {
  spiller: Spiller;
  onSuccess: () => void;
};

function RedigerSpillerSkjema({ spiller, onSuccess }: SkjemaProps) {
  const router = useRouter();
  const form = useForm<SkjemaData>({
    defaultValues: {
      navn: spiller.navn,
      avdeling: spiller.avdeling,
      kull: spiller.kull,
      posisjon: spiller.posisjon,
      styrke: spiller.styrke ?? "",
      svakhet: spiller.svakhet ?? "",
    },
  });

  async function redigerSpiller(data: SkjemaData) {
    const response = await fetch(
      `http://localhost:3000/api/spillere/${spiller.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      form.setError("root", { message: "Noe gikk galt. Prøv igjen." });
      return;
    }

    router.refresh();
    onSuccess();
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(redigerSpiller)}
        className="flex flex-col gap-4"
      >
        <SkjemaFelt id="navn" label="Navn" required />
        <SkjemaFelt id="avdeling" label="Avdeling" required />
        <SkjemaFelt id="kull" label="Kull" required />
        <SkjemaFelt id="posisjon" label="Posisjon" required />
        <SkjemaFelt id="styrke" label="Styrke (valgfritt)" />
        <SkjemaFelt id="svakhet" label="Svakhet (valgfritt)" />

        <FieldError errors={[form.formState.errors.root]} />
        <Button
          type="submit"
          className="bg-twoday-amber"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Lagrer..." : "Lagre endringer"}
        </Button>
      </form>
    </FormProvider>
  );
}

type Props = {
  spiller: Spiller;
};

export default function RedigerSpillerDialog({ spiller }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-twoday-amber">Rediger</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger {spiller.navn}</DialogTitle>
        </DialogHeader>
        <RedigerSpillerSkjema
          spiller={spiller}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
