'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const BeneficiarySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(0).max(150),
  gender: z.enum(['Male', 'Female', 'Other']),
  country: z.string().min(2),
  region: z.string().min(2),
  householdSize: z.coerce.number().min(1).max(50),
  verificationType: z.enum(['Biometric', 'Document Only', 'Biometric + Document', 'Pending']),
});

export type BeneficiaryState = {
  errors?: {
    name?: string[];
    age?: string[];
    gender?: string[];
    country?: string[];
    region?: string[];
    householdSize?: string[];
    verificationType?: string[];
  };
  message?: string | null;
};

export async function createBeneficiary(
  prevState: BeneficiaryState,
  formData: FormData
): Promise<BeneficiaryState> {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return {
      message: 'Unauthorized',
    };
  }

  // Validate form data
  const validatedFields = BeneficiarySchema.safeParse({
    name: formData.get('name'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    country: formData.get('country'),
    region: formData.get('region'),
    householdSize: formData.get('householdSize'),
    verificationType: formData.get('verificationType'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create beneficiary.',
    };
  }

  const { name, age, gender, country, region, householdSize, verificationType } = validatedFields.data;
  const registrationDate = new Date().toISOString().split('T')[0];
  const id = `BEN-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000)}`;

  try {
    await sql`
      INSERT INTO beneficiaries (id, name, age, gender, country, region, household_size, verification_type, registration_date, status)
      VALUES (${id}, ${name}, ${age}, ${gender}, ${country}, ${region}, ${householdSize}, ${verificationType}, ${registrationDate}, 'pending-verification')
    `;
    
    // Create audit log
    await sql`
      INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, severity, timestamp)
      VALUES (${session.user.id}, 'CREATE', 'Beneficiary Record', ${id}, 'Created new beneficiary registration', '0.0.0.0', 'low', NOW())
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to create beneficiary.',
    };
  }

  revalidatePath('/beneficiaries');
  redirect('/beneficiaries');
}

export async function updateBeneficiary(
  id: string,
  prevState: BeneficiaryState,
  formData: FormData
): Promise<BeneficiaryState> {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return {
      message: 'Unauthorized',
    };
  }

  const validatedFields = BeneficiarySchema.safeParse({
    name: formData.get('name'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    country: formData.get('country'),
    region: formData.get('region'),
    householdSize: formData.get('householdSize'),
    verificationType: formData.get('verificationType'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update beneficiary.',
    };
  }

  const { name, age, gender, country, region, householdSize, verificationType } = validatedFields.data;

  try {
    await sql`
      UPDATE beneficiaries
      SET name = ${name},
          age = ${age},
          gender = ${gender},
          country = ${country},
          region = ${region},
          household_size = ${householdSize},
          verification_type = ${verificationType}
      WHERE id = ${id}
    `;
    
    // Create audit log
    await sql`
      INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, severity, timestamp)
      VALUES (${session.user.id}, 'UPDATE', 'Beneficiary Record', ${id}, 'Updated beneficiary information', '0.0.0.0', 'low', NOW())
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to update beneficiary.',
    };
  }

  revalidatePath('/beneficiaries');
  revalidatePath(`/beneficiaries/${id}`);
  redirect('/beneficiaries');
}

export async function deleteBeneficiary(id: string) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    await sql`DELETE FROM beneficiaries WHERE id = ${id}`;
    
    // Create audit log
    await sql`
      INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, severity, timestamp)
      VALUES (${session.user.id}, 'DELETE', 'Beneficiary Record', ${id}, 'Deleted beneficiary record', '0.0.0.0', 'high', NOW())
    `;
    
    revalidatePath('/beneficiaries');
    return { message: 'Beneficiary deleted successfully' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to delete beneficiary.' };
  }
}

export async function updateBeneficiaryStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    await sql`
      UPDATE beneficiaries
      SET status = ${status}
      WHERE id = ${id}
    `;
    
    // Create audit log
    await sql`
      INSERT INTO audit_logs (user_id, action, resource, resource_id, details, ip_address, severity, timestamp)
      VALUES (${session.user.id}, 'UPDATE', 'Beneficiary Record', ${id}, ${'Updated status to ' + status}, '0.0.0.0', 'medium', NOW())
    `;
    
    revalidatePath('/beneficiaries');
    revalidatePath(`/beneficiaries/${id}`);
    return { message: 'Status updated successfully' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to update status.' };
  }
}
