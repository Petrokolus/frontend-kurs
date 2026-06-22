import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spiller } from "@/lib/types";

type Props = {
  spiller: Spiller;
};

export default function RedigerSpillerDialog({ spiller }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-twoday-amber">Rediger spiller</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger spiller</DialogTitle>
        </DialogHeader>
        <p>Skjemaet for {spiller.navn} kommer her.</p>
      </DialogContent>
    </Dialog>
  );
}
