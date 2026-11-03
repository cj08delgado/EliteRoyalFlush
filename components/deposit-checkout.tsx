'use client'

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Publishable keys are safe to ship to the browser; this one matches the live secret key in lib/stripe.ts.
const STRIPE_LIVE_PUBLISHABLE_KEY =
  'pk_live_51USkA6LdjvmKHTW5wkwBpAHGfi3XTNyDvqxqZbiTKG7SNYJI9IiUBqFzmx67LZI1Sjw4d3QmQz2J2g2Dk6in0JhG00jFP1WCY7'

const stripePromise = loadStripe(STRIPE_LIVE_PUBLISHABLE_KEY)

export function DepositCheckout({
  clientSecret,
  onComplete,
}: {
  clientSecret: string
  onComplete: () => void
}) {
  return (
    <div id="checkout" className="overflow-hidden rounded-2xl">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret, onComplete }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
