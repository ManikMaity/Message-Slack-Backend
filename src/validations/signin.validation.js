import { z } from 'zod'

const signinSchema = z.object({
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

export default signinSchema
