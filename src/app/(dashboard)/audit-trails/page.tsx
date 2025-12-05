import { Metadata } from "next";
import { Suspense } from "react";
import { AuditTrails } from "@/components/audit/audit-trails";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchParams } from "@/lib/types";

export const metadata: Metadata = {
  title: "Audit Trails",
  description: "Complete audit history and compliance tracking",
};

interface PageProps {
  searchParams: SearchParams;
}

export default function AuditTrailsPage({ searchParams }: PageProps) {
  const action = searchParams?.action || 'all';
  const severity = searchParams?.severity || 'all';
  const page = Number(searchParams?.page) || 1;

  return (
    <Suspense fallback={<Skeleton className="h-screen" />}>
      <AuditTrails action={action} severity={severity} page={page} />
    </Suspense>
  );
}
