'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

const WorkflowSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  trigger: z.string().min(1, 'Trigger is required'),
  actions: z.coerce.number().min(1, 'Must have at least 1 action'),
  status: z.enum(['active', 'paused', 'disabled']),
});

export type WorkflowState = {
  errors?: {
    name?: string[];
    description?: string[];
    trigger?: string[];
    actions?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createWorkflow(
  prevState: WorkflowState,
  formData: FormData
): Promise<WorkflowState> {
  const validatedFields = WorkflowSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    trigger: formData.get('trigger'),
    actions: formData.get('actions'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create workflow.',
    };
  }

  const { name, description, trigger, actions, status } = validatedFields.data;
  const id = `WF-${Date.now()}`;

  try {
    await sql`
      INSERT INTO workflows (id, name, description, trigger, actions, status, executions, success_rate, created_at)
      VALUES (${id}, ${name}, ${description}, ${trigger}, ${actions}, ${status}, 0, 100, NOW())
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to create workflow.',
    };
  }

  revalidatePath('/workflows');
  return { message: 'Workflow created successfully.' };
}

export async function updateWorkflow(
  id: string,
  prevState: WorkflowState,
  formData: FormData
): Promise<WorkflowState> {
  const validatedFields = WorkflowSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    trigger: formData.get('trigger'),
    actions: formData.get('actions'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update workflow.',
    };
  }

  const { name, description, trigger, actions, status } = validatedFields.data;

  try {
    await sql`
      UPDATE workflows
      SET name = ${name},
          description = ${description},
          trigger = ${trigger},
          actions = ${actions},
          status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to update workflow.',
    };
  }

  revalidatePath('/workflows');
  return { message: 'Workflow updated successfully.' };
}

export async function deleteWorkflow(id: string) {
  try {
    await sql`DELETE FROM workflows WHERE id = ${id}`;
    revalidatePath('/workflows');
    return { message: 'Workflow deleted successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to delete workflow.' };
  }
}

export async function toggleWorkflowStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === 'active' ? 'paused' : 'active';
  
  try {
    await sql`
      UPDATE workflows
      SET status = ${newStatus}
      WHERE id = ${id}
    `;
    revalidatePath('/workflows');
    return { message: `Workflow ${newStatus} successfully.` };
  } catch (error) {
    return { message: 'Database Error: Failed to toggle workflow status.' };
  }
}
