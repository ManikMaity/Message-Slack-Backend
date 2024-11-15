import { z } from 'zod'

const signupSchema = z.object({
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username must be a string'
    })
    .min(3, 'username must be at least 3 characters')
    .max(20, 'username must be at most 20 characters')
    .refine(
      (username) => /^[a-zA-Z0-9]+$/.test(username),
      'Username must contain only latters and numbers'
    ),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string'
    })
    .email('invalid email format'),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string'
    })
    .min(6, 'password must be at least 6 characters')
    .max(20, 'password must be at most 20 characters')
})

export default signupSchema
