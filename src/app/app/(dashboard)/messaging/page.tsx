import { Metadata } from "next";
import { Suspense } from "react";
import { InterAgencyMessaging } from "@/components/messaging/inter-agency-messaging";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Inter-Agency Collaboration",
  description: "Secure communication and shared dashboards",
};

export default function MessagingPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen" />}>
      <InterAgencyMessaging />
    </Suspense>
  );
}
