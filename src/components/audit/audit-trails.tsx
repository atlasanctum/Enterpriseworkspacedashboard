'use client';

import { AuditTrails as Audit } from '../AuditTrails';

interface AuditTrailsProps {
  action: string;
  severity: string;
  page: number;
}

export function AuditTrails({ action, severity, page }: AuditTrailsProps) {
  return <Audit />;
}
