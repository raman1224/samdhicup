


import { z } from 'zod'

export const teamSchema = z.object({
  teamName: z.string().min(3, 'Min 3 characters').max(50, 'Max 50 characters'),
  teamLogo: z.string().optional().default(''),
  captainName: z.string().min(3, 'Captain name required'),
  captainPhone: z.string().length(10, 'Must be 10 digits').regex(/^[0-9]+$/, 'Numbers only'),
  captainEmail: z.string().email('Invalid email'),
  district: z.string().min(1, 'District required'),
  municipality: z.string().min(1, 'Municipality required'),
  address: z.string().min(5, 'Address too short (min 5 chars)'),
  motto: z.string().optional().default(''),
  description: z.string().optional().default(''),
})

export const positionEnum = z.enum([
  'setter', 'libero', 'middle_blocker', 'outside_hitter', 'opposite_hitter'
])

export const jerseySizeEnum = z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'])

export const playerSchema = z.object({
  fullName: z.string().min(3, 'Name required'),
  dateOfBirth: z.string().min(1, 'Date of birth required'),
  phoneNumber: z.string().length(10, 'Must be 10 digits').regex(/^[0-9]+$/, 'Numbers only'),
  address: z.string().min(5, 'Address too short'),
  position: positionEnum,
  age: z.number().min(15, 'Must be 15+ years').max(50, 'Must be under 50'),
  jerseyName: z.string().optional().default(''),
  jerseyNumber: z.number().min(1).max(99).nullable().default(null),
  jerseySize: jerseySizeEnum.optional().default('M'),
  passportPhoto: z.string().optional().default(''),
  citizenshipFront: z.string().optional().default(''),
  citizenshipBack: z.string().optional().default(''),
})

// Custom validation for age based on dateOfBirth
export const playerSchemaWithAgeValidation = playerSchema.refine(
  (data) => {
    if (!data.dateOfBirth) return true
    const dob = new Date(data.dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const monthDiff = today.getMonth() - dob.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--
    }
    return age >= 15 && age <= 50
  },
  { message: 'Player must be 15-50 years old', path: ['dateOfBirth'] }
)

export const paymentSchema = z.object({
  transactionId: z.string().min(3, 'Transaction ID required'),
  paymentMethod: z.enum(['esewa', 'bank']).default('esewa'),
  amount: z.number().min(8000, 'Minimum NPR 8,000').default(8000),
  screenshot: z.string().min(1, 'Payment screenshot required'),
})

export const registrationSchema = z.object({
  team: teamSchema,
  players: z.array(playerSchema).length(10, 'Exactly 10 players required'),
  payment: paymentSchema,
})

export type TeamFormData = z.infer<typeof teamSchema>
export type PlayerFormData = z.infer<typeof playerSchema>
export type PaymentFormData = z.infer<typeof paymentSchema>
export type RegistrationFormData = z.infer<typeof registrationSchema>   // OUTPUT (post-validation, defaults applied)
export type RegistrationFormInput = z.input<typeof registrationSchema>  // INPUT (what the form actually holds)