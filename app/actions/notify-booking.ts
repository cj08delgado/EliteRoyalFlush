'use server'

import { Resend } from 'resend'
import { stripe } from '@/lib/stripe'

const OWNER_EMAIL = 'EliteRoyalFlush7@gmail.com'

const resend = new Resend(process.env.RESEND_API_KEY)

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export async function notifyBooking(sessionId: string) {
  if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) return

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (session.payment_status !== 'paid') return

  const meta = session.metadata ?? {}
  if (meta.notified === 'true') return

  const customerEmail = session.customer_details?.email ?? session.customer_email ?? 'Not provided'
  const amountPaid = ((session.amount_total ?? 0) / 100).toFixed(2)

  const rows: [string, string][] = [
    ['Name', meta.name ?? ''],
    ['Phone', meta.phone ?? ''],
    ['Email', customerEmail],
    ['Package', meta.package ?? ''],
    ['Event date', meta.eventDate ?? ''],
    ['Event type', meta.eventType ?? ''],
    ['Location', meta.location ?? ''],
    ['Guests', meta.guests ?? ''],
    ['Electricity on site', meta.electricity ?? ''],
    ['Additional details', meta.details ?? ''],
    ['Deposit paid', `$${amountPaid}`],
    ['Stripe payment', typeof session.payment_intent === 'string' ? session.payment_intent : session.id],
  ]

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#111">
      <h2 style="margin:0 0 4px">New booking — ${escapeHtml(meta.eventDate ?? '')}</h2>
      <p style="margin:0 0 16px;color:#555">A $${amountPaid} deposit was just paid on your website.</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;width:40%">${escapeHtml(label)}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
    </div>`

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')

  const { error } = await resend.emails.send({
    from: `Elite Royal Flush Bookings <bookings@${process.env.RESEND_EMAIL_DOMAIN}>`,
    to: OWNER_EMAIL,
    replyTo: customerEmail.includes('@') ? customerEmail : undefined,
    subject: `New booking: ${meta.name ?? 'Customer'} — ${meta.eventDate ?? ''}`,
    html,
    text,
  })

  if (error) {
    console.error('Booking email failed:', error)
    return
  }

  await stripe.checkout.sessions.update(sessionId, { metadata: { notified: 'true' } })
}
