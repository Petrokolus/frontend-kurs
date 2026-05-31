import { Badge } from "@/components/ui/badge";
import { SakStatus } from "@/lib/types";

type Props = {
  status: SakStatus;
};

const statusConfig: Record<
  SakStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  Åpen: { label: "Åpen", variant: "default" },
  "Under behandling": { label: "Under behandling", variant: "secondary" },
  Lukket: { label: "Lukket", variant: "outline" },
};

export function StatusBadge({ status }: Props) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
