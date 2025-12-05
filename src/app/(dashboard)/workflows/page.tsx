import { Metadata } from "next";
import { Suspense } from "react";
import { WorkflowAutomationStudio } from "@/components/workflows/workflow-automation-studio";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Workflow Automation",
  description: "Build and manage intelligent automation workflows",
};

export default function WorkflowsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen" />}>
      <WorkflowAutomationStudio />
    </Suspense>
  );
}
