export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'data-officer' | 'auditor' | 'analyst';
};

export type Beneficiary = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  country: string;
  region: string;
  registrationDate: string;
  status: 'active' | 'pending-verification' | 'suspended';
  verificationType: 'Biometric' | 'Document Only' | 'Biometric + Document' | 'Pending';
  householdSize: number;
  lastDistribution?: string;
  totalAid?: string;
};

export type FraudCase = {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  country: string;
  beneficiary: string;
  detectedAt: string;
  confidence: number;
  status: 'under-review' | 'confirmed' | 'resolved';
  details: string;
};

export type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  country: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'success' | 'blocked' | 'failed';
};
