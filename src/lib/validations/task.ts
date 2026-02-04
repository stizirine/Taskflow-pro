import { Priority } from '@/types'
import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(100, 'Maximum 100 caractères'),
  description: z.string().max(1000, 'Maximum 1000 caractères').optional(),
  priority: z.nativeEnum(Priority),
  dueDate: z.string().optional(),
})

export type TaskFormData = z.infer<typeof taskSchema>