import 'server-only'

import Stripe from 'stripe'

// STRIPE_ACCESS_TOKEN_2 is the live restricted key for acct_1USkA6LdjvmKHTW5 and must pair
// with the live publishable key in components/deposit-checkout.tsx.
export const stripe = new Stripe(process.env.STRIPE_ACCESS_TOKEN_2 as string)

export const DEPOSIT_AMOUNT_CENTS = 20000
