import { Metadata } from "next";
import { Suspense } from "react";
import { DeploymentMap } from "@/components/DeploymentMap";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Multi-Country Deployments",
  description: "Manage and monitor deployments across 23 countries",
};

export default function DeploymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Multi-Country Deployments</h2>
        <p className="text-muted-foreground">
          Manage and monitor deployments across 23 countries
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-96" />}>
        <DeploymentMap />
      </Suspense>
    </div>
  );
}
