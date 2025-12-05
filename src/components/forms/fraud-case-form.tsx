'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createFraudCase, updateFraudCase, FraudCaseState } from '@/lib/actions/fraud-cases';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface FraudCaseFormProps {
  fraudCase?: any;
  onCancel?: () => void;
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {isEdit ? 'Update' : 'Create'} Fraud Case
    </Button>
  );
}

export function FraudCaseForm({ fraudCase, onCancel }: FraudCaseFormProps) {
  const isEdit = !!fraudCase;
  const initialState: FraudCaseState = { message: null, errors: {} };
  
  const action = isEdit 
    ? updateFraudCase.bind(null, fraudCase.id)
    : createFraudCase;
    
  const [state, formAction] = useFormState(action, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit' : 'Report'} Fraud Case</CardTitle>
        <CardDescription>
          {isEdit ? 'Update fraud case details' : 'Report a new fraud case for investigation'}
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
              <Label htmlFor="type">Fraud Type *</Label>
              <Select name="type" defaultValue={fraudCase?.type || 'Duplicate Registration'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Duplicate Registration">Duplicate Registration</SelectItem>
                  <SelectItem value="Ghost Beneficiary">Ghost Beneficiary</SelectItem>
                  <SelectItem value="Age Manipulation">Age Manipulation</SelectItem>
                  <SelectItem value="Location Anomaly">Location Anomaly</SelectItem>
                  <SelectItem value="Document Fraud">Document Fraud</SelectItem>
                  <SelectItem value="Identity Theft">Identity Theft</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.type && (
                <p className="text-sm text-destructive">{state.errors.type[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity *</Label>
              <Select name="severity" defaultValue={fraudCase?.severity || 'medium'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.severity && (
                <p className="text-sm text-destructive">{state.errors.severity[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                name="country"
                defaultValue={fraudCase?.country}
                placeholder="Yemen"
                required
              />
              {state.errors?.country && (
                <p className="text-sm text-destructive">{state.errors.country[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficiary">Beneficiary Name *</Label>
              <Input
                id="beneficiary"
                name="beneficiary"
                defaultValue={fraudCase?.beneficiary}
                placeholder="Ahmed M. Hassan"
                required
              />
              {state.errors?.beneficiary && (
                <p className="text-sm text-destructive">{state.errors.beneficiary[0]}</p>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="confidence">AI Confidence (%) *</Label>
              <Input
                id="confidence"
                name="confidence"
                type="number"
                min="0"
                max="100"
                defaultValue={fraudCase?.confidence || 75}
                placeholder="85"
                required
              />
              {state.errors?.confidence && (
                <p className="text-sm text-destructive">{state.errors.confidence[0]}</p>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="details">Details *</Label>
              <Textarea
                id="details"
                name="details"
                defaultValue={fraudCase?.details}
                placeholder="Describe the fraud case details..."
                rows={4}
                required
              />
              {state.errors?.details && (
                <p className="text-sm text-destructive">{state.errors.details[0]}</p>
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
