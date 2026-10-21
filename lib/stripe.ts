import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const DEPOSIT_AMOUNT_CENTS = 20000
