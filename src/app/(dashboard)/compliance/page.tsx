import { Metadata } from "next";
import { Suspense } from "react";
import { ComplianceStatus } from "@/components/ComplianceStatus";
import { ComplianceFrameworkConfig } from "@/components/ComplianceFrameworkConfig";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Compliance Framework",
  description: "Configure and monitor compliance across global regulatory frameworks",
};

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Compliance Framework Manager</h2>
        <p className="text-muted-foreground">
          Configure and monitor compliance across global regulatory frameworks
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-screen" />}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComplianceStatus />
          <ComplianceFrameworkConfig />
        </div>
      </Suspense>
    </div>
  );
}
