import { Metadata } from "next";
import { Suspense } from "react";
import { BeneficiaryList } from "@/components/beneficiaries/beneficiary-list";
import { BeneficiaryStats } from "@/components/beneficiaries/beneficiary-stats";
import { SearchParams } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Beneficiary Management",
  description: "Manage 12.4M beneficiaries across 23 countries",
};

interface PageProps {
  searchParams: SearchParams;
}

export default async function BeneficiariesPage({ searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;
  const country = searchParams?.country || 'all';
  const status = searchParams?.status || 'all';

  return (
    <div className="space-y-6">
      <div>
        <h2>Beneficiary Management</h2>
        <p className="text-muted-foreground">
          Manage 12.4M beneficiaries across 23 countries
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-32" />}>
        <BeneficiaryStats />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96" />}>
        <BeneficiaryList 
          query={query}
          page={page}
          country={country}
          status={status}
        />
      </Suspense>
    </div>
  );
}
