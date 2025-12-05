'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createDeployment, updateDeployment, DeploymentState } from '@/lib/actions/deployments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface DeploymentFormProps {
  deployment?: any;
  onCancel?: () => void;
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {isEdit ? 'Update' : 'Create'} Deployment
    </Button>
  );
}

export function DeploymentForm({ deployment, onCancel }: DeploymentFormProps) {
  const isEdit = !!deployment;
  const initialState: DeploymentState = { message: null, errors: {} };
  
  const action = isEdit 
    ? updateDeployment.bind(null, deployment.id)
    : createDeployment;
    
  const [state, formAction] = useFormState(action, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit' : 'New'} Country Deployment</CardTitle>
        <CardDescription>
          {isEdit ? 'Update deployment configuration' : 'Deploy to a new country'}
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
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                name="country"
                defaultValue={deployment?.country}
                placeholder="Haiti"
                required
              />
              {state.errors?.country && (
                <p className="text-sm text-destructive">{state.errors.country[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Input
                id="region"
                name="region"
                defaultValue={deployment?.region}
                placeholder="Caribbean"
                required
              />
              {state.errors?.region && (
                <p className="text-sm text-destructive">{state.errors.region[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficiaries">Beneficiaries *</Label>
              <Input
                id="beneficiaries"
                name="beneficiaries"
                defaultValue={deployment?.beneficiaries}
                placeholder="410K"
                required
              />
              {state.errors?.beneficiaries && (
                <p className="text-sm text-destructive">{state.errors.beneficiaries[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select name="status" defaultValue={deployment?.status || 'deploying'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="deploying">Deploying</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.status && (
                <p className="text-sm text-destructive">{state.errors.status[0]}</p>
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
