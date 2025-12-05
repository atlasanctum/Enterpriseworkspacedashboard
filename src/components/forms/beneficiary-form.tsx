'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createBeneficiary, updateBeneficiary, BeneficiaryState } from '@/lib/actions/beneficiaries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Beneficiary } from '@/lib/types';

interface BeneficiaryFormProps {
  beneficiary?: Beneficiary;
  onCancel?: () => void;
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {isEdit ? 'Update' : 'Create'} Beneficiary
    </Button>
  );
}

export function BeneficiaryForm({ beneficiary, onCancel }: BeneficiaryFormProps) {
  const isEdit = !!beneficiary;
  const initialState: BeneficiaryState = { message: null, errors: {} };
  
  const action = isEdit 
    ? updateBeneficiary.bind(null, beneficiary.id)
    : createBeneficiary;
    
  const [state, formAction] = useFormState(action, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit' : 'Create'} Beneficiary</CardTitle>
        <CardDescription>
          {isEdit ? 'Update beneficiary information' : 'Add a new beneficiary to the system'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state.message && (
            <Alert variant={state.errors ? 'destructive' : 'default'}>
              <AlertCircle className="size-4" />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                defaultValue={beneficiary?.name}
                placeholder="John Doe"
                required
              />
              {state.errors?.name && (
                <p className="text-sm text-destructive">{state.errors.name[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="0"
                max="150"
                defaultValue={beneficiary?.age}
                placeholder="34"
                required
              />
              {state.errors?.age && (
                <p className="text-sm text-destructive">{state.errors.age[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select name="gender" defaultValue={beneficiary?.gender || 'Male'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.gender && (
                <p className="text-sm text-destructive">{state.errors.gender[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select name="country" defaultValue={beneficiary?.country || 'Yemen'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yemen">Yemen</SelectItem>
                  <SelectItem value="Syria">Syria</SelectItem>
                  <SelectItem value="South Sudan">South Sudan</SelectItem>
                  <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                  <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                  <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                  <SelectItem value="Myanmar">Myanmar</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.country && (
                <p className="text-sm text-destructive">{state.errors.country[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Input
                id="region"
                name="region"
                defaultValue={beneficiary?.region}
                placeholder="Sana'a"
                required
              />
              {state.errors?.region && (
                <p className="text-sm text-destructive">{state.errors.region[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="householdSize">Household Size *</Label>
              <Input
                id="householdSize"
                name="householdSize"
                type="number"
                min="1"
                max="50"
                defaultValue={beneficiary?.householdSize}
                placeholder="6"
                required
              />
              {state.errors?.householdSize && (
                <p className="text-sm text-destructive">{state.errors.householdSize[0]}</p>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="verificationType">Verification Type *</Label>
              <Select name="verificationType" defaultValue={beneficiary?.verificationType || 'Pending'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select verification type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Biometric">Biometric</SelectItem>
                  <SelectItem value="Document Only">Document Only</SelectItem>
                  <SelectItem value="Biometric + Document">Biometric + Document</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.verificationType && (
                <p className="text-sm text-destructive">{state.errors.verificationType[0]}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <SubmitButton isEdit={isEdit} />
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
