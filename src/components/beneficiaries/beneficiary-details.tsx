import { Beneficiary } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Trash2, MapPin, Users, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface BeneficiaryDetailsProps {
  beneficiary: Beneficiary;
}

export function BeneficiaryDetails({ beneficiary }: BeneficiaryDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/beneficiaries">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h2>{beneficiary.name}</h2>
            <p className="text-muted-foreground">{beneficiary.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="size-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Trash2 className="size-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic beneficiary details and demographics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{beneficiary.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Beneficiary ID</p>
                <p className="font-mono">{beneficiary.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p>{beneficiary.age} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p>{beneficiary.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Household Size</p>
                <p>{beneficiary.householdSize} members</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registration Date</p>
                <p>{beneficiary.registrationDate}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Country</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="size-4" />
                  <p>{beneficiary.country}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Region</p>
                <p>{beneficiary.region}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Verification Type</p>
                <Badge className="mt-1" variant={beneficiary.verificationType.includes('Biometric') ? 'default' : 'secondary'}>
                  {beneficiary.verificationType}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  className="mt-1"
                  variant={
                    beneficiary.status === 'active' ? 'default' :
                    beneficiary.status === 'suspended' ? 'destructive' :
                    'secondary'
                  }
                >
                  {beneficiary.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution History</CardTitle>
              <CardDescription>Aid distribution records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Last Distribution</p>
                <p className="font-medium">{beneficiary.lastDistribution || 'No distributions'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Aid Received</p>
                <p className="font-medium">{beneficiary.totalAid || '$0'}</p>
              </div>
              <Button className="w-full">View Full History</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Calendar className="size-4 mr-2" />
                Schedule Distribution
              </Button>
              <Button variant="outline" className="w-full">
                <CheckCircle className="size-4 mr-2" />
                Update Verification
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="size-4 mr-2" />
                View Household
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
