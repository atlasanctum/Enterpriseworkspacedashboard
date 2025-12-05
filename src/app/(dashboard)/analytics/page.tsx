import { Metadata } from "next";
import { Suspense } from "react";
import { PredictiveAnalytics } from "@/components/analytics/predictive-analytics";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Predictive Analytics",
  description: "AI-powered forecasting and crisis prediction",
};

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen" />}>
      <PredictiveAnalytics />
    </Suspense>
  );
}
