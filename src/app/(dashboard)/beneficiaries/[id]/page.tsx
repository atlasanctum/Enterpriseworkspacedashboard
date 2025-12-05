import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBeneficiary } from "@/lib/data/beneficiaries";
import { BeneficiaryDetails } from "@/components/beneficiaries/beneficiary-details";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const beneficiary = await getBeneficiary(params.id);

  if (!beneficiary) {
    return {
      title: "Beneficiary Not Found",
    };
  }

  return {
    title: `${beneficiary.name} - Beneficiary Details`,
    description: `View and manage beneficiary record for ${beneficiary.name}`,
  };
}

export default async function BeneficiaryPage({ params }: PageProps) {
  const beneficiary = await getBeneficiary(params.id);

  if (!beneficiary) {
    notFound();
  }

  return <BeneficiaryDetails beneficiary={beneficiary} />;
}
