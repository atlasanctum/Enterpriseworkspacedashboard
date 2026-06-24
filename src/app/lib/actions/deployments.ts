'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

const DeploymentSchema = z.object({
  country: z.string().min(2, 'Country name is required'),
  region: z.string().min(2, 'Region is required'),
  beneficiaries: z.string().min(1, 'Beneficiaries count is required'),
  status: z.enum(['active', 'maintenance', 'deploying', 'inactive']),
});

export type DeploymentState = {
  errors?: {
    country?: string[];
    region?: string[];
    beneficiaries?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createDeployment(
  prevState: DeploymentState,
  formData: FormData
): Promise<DeploymentState> {
  const validatedFields = DeploymentSchema.safeParse({
    country: formData.get('country'),
    region: formData.get('region'),
    beneficiaries: formData.get('beneficiaries'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create deployment.',
    };
  }

  const { country, region, beneficiaries, status } = validatedFields.data;
  const id = `DEP-${Date.now()}`;

  try {
    await sql`
      INSERT INTO deployments (id, country, region, beneficiaries, status, uptime, created_at)
      VALUES (${id}, ${country}, ${region}, ${beneficiaries}, ${status}, '99.99%', NOW())
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to create deployment.',
    };
  }

  revalidatePath('/deployments');
  return { message: 'Deployment created successfully.' };
}

export async function updateDeployment(
  id: string,
  prevState: DeploymentState,
  formData: FormData
): Promise<DeploymentState> {
  const validatedFields = DeploymentSchema.safeParse({
    country: formData.get('country'),
    region: formData.get('region'),
    beneficiaries: formData.get('beneficiaries'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update deployment.',
    };
  }

  const { country, region, beneficiaries, status } = validatedFields.data;

  try {
    await sql`
      UPDATE deployments
      SET country = ${country},
          region = ${region},
          beneficiaries = ${beneficiaries},
          status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to update deployment.',
    };
  }

  revalidatePath('/deployments');
  return { message: 'Deployment updated successfully.' };
}

export async function deleteDeployment(id: string) {
  try {
    await sql`DELETE FROM deployments WHERE id = ${id}`;
    revalidatePath('/deployments');
    return { message: 'Deployment deleted successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to delete deployment.' };
  }
}

export async function updateDeploymentStatus(id: string, status: string) {
  try {
    await sql`
      UPDATE deployments
      SET status = ${status}
      WHERE id = ${id}
    `;
    revalidatePath('/deployments');
    return { message: 'Deployment status updated successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to update status.' };
  }
}
