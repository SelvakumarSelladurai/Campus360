import { z } from 'zod'

export const createAccountSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.'),
  email: z.email('Enter a valid institutional email address.'),
  inviteCode: z.string().trim().min(1, 'Enter the invite code from your institution.'),
  password: z.string().min(12, 'Use at least 12 characters.'),
  confirmPassword: z.string().min(1, 'Confirm your password.'),
  acceptTerms: z.boolean().refine((accepted) => accepted, 'You must agree to the terms to continue.'),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
})

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>
