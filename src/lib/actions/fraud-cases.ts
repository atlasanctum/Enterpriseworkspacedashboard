'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

const FraudCaseSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  country: z.string().min(1, 'Country is required'),
  beneficiary: z.string().min(1, 'Beneficiary name is required'),
  details: z.string().min(10, 'Details must be at least 10 characters'),
  confidence: z.coerce.number().min(0).max(100),
});

export type FraudCaseState = {
  errors?: {
    type?: string[];
    severity?: string[];
    country?: string[];
    beneficiary?: string[];
    details?: string[];
    confidence?: string[];
  };
  message?: string | null;
};

export async function createFraudCase(
  prevState: FraudCaseState,
  formData: FormData
): Promise<FraudCaseState> {
  const validatedFields = FraudCaseSchema.safeParse({
    type: formData.get('type'),
    severity: formData.get('severity'),
    country: formData.get('country'),
    beneficiary: formData.get('beneficiary'),
    details: formData.get('details'),
    confidence: formData.get('confidence'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create fraud case.',
    };
  }

  const { type, severity, country, beneficiary, details, confidence } = validatedFields.data;
  const id = `FD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`;
  const detectedAt = new Date().toISOString();

  try {
    await sql`
      INSERT INTO fraud_cases (id, type, severity, country, beneficiary, detected_at, confidence, status, details)
      VALUES (${id}, ${type}, ${severity}, ${country}, ${beneficiary}, ${detectedAt}, ${confidence}, 'under-review', ${details})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to create fraud case.',
    };
  }

  revalidatePath('/fraud-detection');
  return { message: 'Fraud case created successfully.' };
}

export async function updateFraudCase(
  id: string,
  prevState: FraudCaseState,
  formData: FormData
): Promise<FraudCaseState> {
  const validatedFields = FraudCaseSchema.safeParse({
    type: formData.get('type'),
    severity: formData.get('severity'),
    country: formData.get('country'),
    beneficiary: formData.get('beneficiary'),
    details: formData.get('details'),
    confidence: formData.get('confidence'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update fraud case.',
    };
  }

  const { type, severity, country, beneficiary, details, confidence } = validatedFields.data;

  try {
    await sql`
      UPDATE fraud_cases
      SET type = ${type},
          severity = ${severity},
          country = ${country},
          beneficiary = ${beneficiary},
          details = ${details},
          confidence = ${confidence}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to update fraud case.',
    };
  }

  revalidatePath('/fraud-detection');
  return { message: 'Fraud case updated successfully.' };
}

export async function deleteFraudCase(id: string) {
  try {
    await sql`DELETE FROM fraud_cases WHERE id = ${id}`;
    revalidatePath('/fraud-detection');
    return { message: 'Fraud case deleted successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to delete fraud case.' };
  }
}

export async function updateFraudCaseStatus(id: string, status: string) {
  try {
    await sql`
      UPDATE fraud_cases
      SET status = ${status}
      WHERE id = ${id}
    `;
    revalidatePath('/fraud-detection');
    return { message: 'Fraud case status updated successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to update status.' };
  }
}
