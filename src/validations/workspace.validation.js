import { z } from 'zod'

export const workspaceSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .min(3, 'name must be at least 3 characters')
    .max(50, 'name must be at most 50 characters'),
  description: z
    .string({
      required_error: 'description is required',
      invalid_type_error: 'description must be a string'
    })
    .min(3, 'description must be at least 3 characters')
    .max(500, 'description must be at most 500 characters'),
  image: z.string({
    required_error: 'image is required',
    invalid_type_error: 'image must be a string'
  })
})
