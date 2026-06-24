import { Metadata } from "next";
import { Suspense } from "react";
import { AIAssistancePanel } from "@/components/AIAssistancePanel";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "AI Governance Assistant",
  description: "AI-powered insights and command search for humanitarian operations",
};

export default function AIAssistantPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen" />}>
      <AIAssistancePanel />
    </Suspense>
  );
}
