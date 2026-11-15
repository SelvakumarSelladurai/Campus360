import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Enter a valid institutional email address.'),
  password: z.string().min(1, 'Enter your password.'),
  rememberEmail: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
