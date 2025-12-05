import { db } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';
import { Beneficiary } from '@/lib/types';

const ITEMS_PER_PAGE = 20;

// Mock data for development
const mockBeneficiaries: Beneficiary[] = [
  {
    id: "BEN-2025-892341",
    name: "Ahmed M. Hassan",
    age: 34,
    gender: "Male",
    country: "Yemen",
    region: "Sana'a",
    registrationDate: "2024-03-15",
    status: "active",
    verificationType: "Biometric",
    householdSize: 6,
    lastDistribution: "2025-10-05",
    totalAid: "$2,340"
  },
  {
    id: "BEN-2025-892340",
    name: "Fatima Al-Rashid",
    age: 28,
    gender: "Female",
    country: "Syria",
    region: "Damascus",
    registrationDate: "2024-08-22",
    status: "active",
    verificationType: "Biometric + Document",
    householdSize: 4,
    lastDistribution: "2025-10-08",
    totalAid: "$1,890"
  },
  {
    id: "BEN-2025-892339",
    name: "Mary K. Johnson",
    age: 42,
    gender: "Female",
    country: "South Sudan",
    region: "Juba",
    registrationDate: "2023-11-30",
    status: "suspended",
    verificationType: "Document Only",
    householdSize: 8,
    lastDistribution: "2025-09-12",
    totalAid: "$4,120"
  },
  {
    id: "BEN-2025-892338",
    name: "Abebe Desta",
    age: 51,
    gender: "Male",
    country: "Ethiopia",
    region: "Addis Ababa",
    registrationDate: "2024-01-10",
    status: "active",
    verificationType: "Biometric",
    householdSize: 5,
    lastDistribution: "2025-10-10",
    totalAid: "$3,560"
  },
  {
    id: "BEN-2025-892337",
    name: "Rashid Khan",
    age: 29,
    gender: "Male",
    country: "Bangladesh",
    region: "Dhaka",
    registrationDate: "2024-05-18",
    status: "pending-verification",
    verificationType: "Pending",
    householdSize: 3,
    lastDistribution: "-",
    totalAid: "$0"
  },
];

export async function getBeneficiaries(
  query: string,
  page: number,
  country: string,
  status: string
): Promise<Beneficiary[]> {
  noStore();
  
  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const where: Record<string, any> = {};
    
    if (country !== 'all') {
      where.country = country;
    }
    
    if (status !== 'all') {
      where.status = status;
    }
    
    const result = await db.beneficiaries.findMany({
      where,
      skip: offset,
      take: ITEMS_PER_PAGE,
    });
    
    if (query) {
      return result.filter(b => 
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.id.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return result;
  } catch (error) {
    console.error('Database error:', error);
    // Return mock data as fallback
    return mockBeneficiaries.filter(b => {
      if (country !== 'all' && b.country !== country) return false;
      if (status !== 'all' && b.status !== status) return false;
      if (query && !b.name.toLowerCase().includes(query.toLowerCase()) && !b.id.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }
}

export async function getBeneficiariesCount(
  query: string,
  country: string,
  status: string
): Promise<number> {
  noStore();
  
  try {
    const where: Record<string, any> = {};
    
    if (country !== 'all') {
      where.country = country;
    }
    
    if (status !== 'all') {
      where.status = status;
    }
    
    return await db.beneficiaries.count(where);
  } catch (error) {
    console.error('Database error:', error);
    return mockBeneficiaries.length;
  }
}

export async function getBeneficiary(id: string): Promise<Beneficiary | null> {
  noStore();
  
  try {
    return await db.beneficiaries.findById(id);
  } catch (error) {
    console.error('Database error:', error);
    return mockBeneficiaries.find(b => b.id === id) || null;
  }
}

export async function getBeneficiaryStats() {
  noStore();
  
  try {
    const total = await db.beneficiaries.count();
    const active = await db.beneficiaries.count({ status: 'active' });
    const pending = await db.beneficiaries.count({ status: 'pending-verification' });
    const suspended = await db.beneficiaries.count({ status: 'suspended' });
    
    return {
      total,
      active,
      pending,
      suspended,
    };
  } catch (error) {
    console.error('Database error:', error);
    // Return mock stats
    return {
      total: 12427384,
      active: 11892104,
      pending: 342891,
      suspended: 192389,
    };
  }
}
