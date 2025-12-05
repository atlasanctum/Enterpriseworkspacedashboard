import { getBeneficiaries, getBeneficiariesCount } from "@/lib/data/beneficiaries";
import { BeneficiaryTable } from "./beneficiary-table";
import { BeneficiarySearch } from "./beneficiary-search";
import { Pagination } from "@/components/ui/pagination-controls";

interface BeneficiaryListProps {
  query: string;
  page: number;
  country: string;
  status: string;
}

export async function BeneficiaryList({
  query,
  page,
  country,
  status,
}: BeneficiaryListProps) {
  const beneficiaries = await getBeneficiaries(query, page, country, status);
  const totalCount = await getBeneficiariesCount(query, country, status);
  const totalPages = Math.ceil(totalCount / 20);

  return (
    <div className="space-y-4">
      <BeneficiarySearch />
      <BeneficiaryTable beneficiaries={beneficiaries} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
