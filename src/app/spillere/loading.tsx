import { Skeleton } from "@/components/ui/skeleton";

function SpillerCardSkeleton() {
  return (
    <div className="rounded-lg border p-4">
      <Skeleton className="mb-2 h-6 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SpillerCardSkeleton key={i} />
      ))}
    </div>
  );
}
