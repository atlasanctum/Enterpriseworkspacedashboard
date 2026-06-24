import { Metadata } from "next";
import { Suspense } from "react";
import { FraudDetectionModule } from "@/components/fraud/fraud-detection-module";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchParams } from "@/lib/types";

export const metadata: Metadata = {
  title: "Fraud Detection",
  description: "AI-powered fraud detection and anomaly analysis",
};

interface PageProps {
  searchParams: SearchParams;
}

export default function FraudDetectionPage({ searchParams }: PageProps) {
  const status = searchParams?.status || 'all';
  const severity = searchParams?.severity || 'all';

  return (
    <Suspense fallback={<Skeleton className="h-screen" />}>
      <FraudDetectionModule status={status} severity={severity} />
    </Suspense>
  );
}
