'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

const MessageSchema = z.object({
  channelId: z.string().min(1, 'Channel is required'),
  message: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
});

export type MessageState = {
  errors?: {
    channelId?: string[];
    message?: string[];
  };
  message?: string | null;
};

export async function sendMessage(
  userId: string,
  prevState: MessageState,
  formData: FormData
): Promise<MessageState> {
  const validatedFields = MessageSchema.safeParse({
    channelId: formData.get('channelId'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to send message.',
    };
  }

  const { channelId, message } = validatedFields.data;
  const id = `MSG-${Date.now()}`;
  const timestamp = new Date().toISOString();

  try {
    await sql`
      INSERT INTO messages (id, channel_id, user_id, message, timestamp, pinned)
      VALUES (${id}, ${channelId}, ${userId}, ${message}, ${timestamp}, false)
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to send message.',
    };
  }

  revalidatePath('/messaging');
  return { message: 'Message sent successfully.' };
}

export async function deleteMessage(id: string) {
  try {
    await sql`DELETE FROM messages WHERE id = ${id}`;
    revalidatePath('/messaging');
    return { message: 'Message deleted successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to delete message.' };
  }
}

export async function pinMessage(id: string, pinned: boolean) {
  try {
    await sql`
      UPDATE messages
      SET pinned = ${pinned}
      WHERE id = ${id}
    `;
    revalidatePath('/messaging');
    return { message: pinned ? 'Message pinned successfully.' : 'Message unpinned successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to pin message.' };
  }
}

export async function editMessage(id: string, newMessage: string) {
  try {
    await sql`
      UPDATE messages
      SET message = ${newMessage},
          edited = true,
          edited_at = NOW()
      WHERE id = ${id}
    `;
    revalidatePath('/messaging');
    return { message: 'Message edited successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to edit message.' };
  }
}
