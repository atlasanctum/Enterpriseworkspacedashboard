'use client';

import { FraudDetectionModule as FraudModule } from '../FraudDetectionModule';

interface FraudDetectionModuleProps {
  status: string;
  severity: string;
}

export function FraudDetectionModule({ status, severity }: FraudDetectionModuleProps) {
  return <FraudModule />;
}
