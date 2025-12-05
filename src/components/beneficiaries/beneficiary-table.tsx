import Link from 'next/link';
import { Beneficiary } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Eye } from 'lucide-react';

interface BeneficiaryTableProps {
  beneficiaries: Beneficiary[];
}

export function BeneficiaryTable({ beneficiaries }: BeneficiaryTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Beneficiaries ({beneficiaries.length.toLocaleString()})</CardTitle>
        <CardDescription>View and manage individual beneficiary records</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age/Gender</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Household</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {beneficiaries.map((beneficiary) => (
              <TableRow key={beneficiary.id}>
                <TableCell className="font-mono text-sm">{beneficiary.id}</TableCell>
                <TableCell>
                  <div>
                    <p>{beneficiary.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Reg: {beneficiary.registrationDate}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{beneficiary.age} years</p>
                    <p className="text-muted-foreground">{beneficiary.gender}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-1">
                    <MapPin className="size-3 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p>{beneficiary.country}</p>
                      <p className="text-muted-foreground">{beneficiary.region}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {beneficiary.householdSize} members
                </TableCell>
                <TableCell>
                  <Badge variant={beneficiary.verificationType.includes('Biometric') ? 'default' : 'secondary'}>
                    {beneficiary.verificationType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      beneficiary.status === 'active' ? 'default' :
                      beneficiary.status === 'suspended' ? 'destructive' :
                      'secondary'
                    }
                  >
                    {beneficiary.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/beneficiaries/${beneficiary.id}`}>
                      <Eye className="size-4 mr-1" />
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
