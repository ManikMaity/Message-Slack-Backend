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

export const updateWorkspaceSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string'
    })
    .min(3, 'name must be at least 3 characters')
    .max(50, 'name must be at most 50 characters')
    .optional(),
  description: z
    .string({
      invalid_type_error: 'description must be a string'
    })
    .min(3, 'description must be at least 3 characters')
    .max(500, 'description must be at most 500 characters')
    .optional(),
  image: z.string({
    invalid_type_error: 'image must be a string'
  })
  .optional()
})

export const addMemberSchema = z.object({
  memberId: z.string({
    required_error: 'memberId is required',
    invalid_type_error: 'memberId must be a string'
  }),
  role: z.enum(['admin', 'member'], {
    required_error: 'role is required',
    invalid_type_error: 'role must be a string'
  }),
  workspaceId: z.string({
    required_error: 'workspaceId is required',
    invalid_type_error: 'workspaceId must be a string'
  })
})

export const removeMemberSchema = z.object({
  memberId: z.string({
    required_error: 'memberId is required',
    invalid_type_error: 'memberId must be a string'
  }),
  workspaceId: z.string({
    required_error: 'workspaceId is required',
    invalid_type_error: 'workspaceId must be a string'
  })
})