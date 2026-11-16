'use server'

import { Resend } from 'resend'

const OWNER_EMAIL = 'EliteRoyalFlush7@gmail.com'
const FALLBACK_EMAIL = 'cj08delgado@gmail.com'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ReviewFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const field = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? '')
    .trim()
    .slice(0, max)

export async function submitReview(
  _prev: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(formData, 'company', 200)) {
    return { status: 'success', message: 'Thank you! Your review has been sent.' }
  }

  const name = field(formData, 'name', 80)
  const email = field(formData, 'email', 120)
  const event = field(formData, 'event', 80)
  const review = field(formData, 'review', 2000)
  const rating = Number(formData.get('rating'))

  if (!name || !review) {
    return { status: 'error', message: 'Please share your name and a few words about your experience.' }
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { status: 'error', message: 'Please choose a star rating.' }
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email || 'Not provided'],
    ['Event', event || 'Not provided'],
    ['Rating', `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)`],
    ['Review', review],
  ]

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#111">
      <h2 style="margin:0 0 4px">New ${rating}-star review from ${escapeHtml(name)}</h2>
      <p style="margin:0 0 16px;color:#555">Submitted on your website's reviews page.</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;width:30%">${escapeHtml(label)}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
    </div>`

  const message = {
    replyTo: email || undefined,
    subject: `New ${rating}-star review: ${name}`,
    html,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
  }

  const primary = await resend.emails.send({
    ...message,
    from: `Elite Royal Flush Reviews <reviews@${process.env.RESEND_EMAIL_DOMAIN}>`,
    to: OWNER_EMAIL,
  })

  if (primary.error) {
    console.error('Review email failed, trying fallback:', primary.error)
    // Until the sending domain is verified, Resend only allows its test sender to reach the account owner.
    const fallback = await resend.emails.send({
      ...message,
      from: 'Elite Royal Flush Reviews <onboarding@resend.dev>',
      to: FALLBACK_EMAIL,
    })
    if (fallback.error) {
      console.error('Fallback review email failed:', fallback.error)
      return { status: 'error', message: 'Something went wrong sending your review. Please try again.' }
    }
  }

  return { status: 'success', message: 'Thank you! Your review has been sent to our team.' }
}
