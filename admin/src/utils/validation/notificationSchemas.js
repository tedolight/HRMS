import { z } from 'zod'

// Receipts affect the inbox only; source records remain owned by their modules.
export const notificationReceiptsSchema = z.array(z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  read: z.boolean(),
})).refine(receipts => new Set(receipts.map(item => item.id)).size === receipts.length,
  'Notification receipts must have unique IDs.')
