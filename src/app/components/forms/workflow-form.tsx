'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createWorkflow, updateWorkflow, WorkflowState } from '@/lib/actions/workflows';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface WorkflowFormProps {
  workflow?: any;
  onCancel?: () => void;
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      {isEdit ? 'Update' : 'Create'} Workflow
    </Button>
  );
}

export function WorkflowForm({ workflow, onCancel }: WorkflowFormProps) {
  const isEdit = !!workflow;
  const initialState: WorkflowState = { message: null, errors: {} };
  
  const action = isEdit 
    ? updateWorkflow.bind(null, workflow.id)
    : createWorkflow;
    
  const [state, formAction] = useFormState(action, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit' : 'Create'} Workflow</CardTitle>
        <CardDescription>
          {isEdit ? 'Update workflow automation' : 'Create a new automated workflow'}
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

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workflow Name *</Label>
              <Input
                id="name"
                name="name"
                defaultValue={workflow?.name}
                placeholder="Auto-Verify New Beneficiaries"
                required
              />
              {state.errors?.name && (
                <p className="text-sm text-destructive">{state.errors.name[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={workflow?.description}
                placeholder="Describe what this workflow does..."
                rows={3}
                required
              />
              {state.errors?.description && (
                <p className="text-sm text-destructive">{state.errors.description[0]}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trigger">Trigger *</Label>
                <Select name="trigger" defaultValue={workflow?.trigger || 'New registration'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New registration">New registration</SelectItem>
                    <SelectItem value="Daily at 2:00 AM UTC">Daily at 2:00 AM UTC</SelectItem>
                    <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                    <SelectItem value="Monday at 9:00 AM">Monday at 9:00 AM</SelectItem>
                    <SelectItem value="Manual">Manual trigger</SelectItem>
                    <SelectItem value="On data change">On data change</SelectItem>
                  </SelectContent>
                </Select>
                {state.errors?.trigger && (
                  <p className="text-sm text-destructive">{state.errors.trigger[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="actions">Number of Actions *</Label>
                <Input
                  id="actions"
                  name="actions"
                  type="number"
                  min="1"
                  max="50"
                  defaultValue={workflow?.actions || 4}
                  required
                />
                {state.errors?.actions && (
                  <p className="text-sm text-destructive">{state.errors.actions[0]}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select name="status" defaultValue={workflow?.status || 'active'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
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
