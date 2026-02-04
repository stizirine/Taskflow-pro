import { z } from 'zod'

export const projectSchema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères').max(50, 'Maximum 50 caractères'),
  description: z.string().max(500, 'Maximum 500 caractères').optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide'),
  icon: z.string().min(1, 'Icône requise'),
})

export type ProjectFormData = z.infer<typeof projectSchema>