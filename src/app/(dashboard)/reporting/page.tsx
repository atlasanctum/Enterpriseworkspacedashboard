import { Metadata } from "next";
import { Suspense } from "react";
import { ReportingEngine } from "@/components/reporting/reporting-engine";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Reporting Engine",
  description: "Generate compliance reports for UN, World Bank, and national standards",
};

export default function ReportingPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen" />}>
      <ReportingEngine />
    </Suspense>
  );
}
