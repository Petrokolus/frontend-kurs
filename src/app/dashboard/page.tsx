import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatistikkKort from "./components/statistikk-kort";
import Toppliste from "./components/toppliste";
import SisteKamper from "./components/siste-kamper";

function StatistikkKortSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ListeSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-5xl p-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="flex flex-col gap-6">
        <Suspense fallback={<StatistikkKortSkeleton />}>
          <StatistikkKort />
        </Suspense>
        <div className="grid grid-cols-2 gap-6">
          <Suspense fallback={<ListeSkeleton />}>
            <Toppliste sorterPa="rating" tittel="Toppliste" />
          </Suspense>
          <Suspense fallback={<ListeSkeleton />}>
            <Toppliste sorterPa="skyggerating" tittel="Toppliste (form)" />
          </Suspense>
        </div>
        <Suspense fallback={<ListeSkeleton />}>
          <SisteKamper />
        </Suspense>
      </div>
    </div>
  );
}
