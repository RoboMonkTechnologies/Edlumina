import { asPlainString, countUrls, looksLikeOperatorPayload } from './sanitize.js'

export const INTEREST_OPTIONS = [
  'School Program',
  'College Skill Builder',
  'Job Certification',
  'Lab Setup',
  'Free Sunday Workshop',
  'Free Saturday Webinar',
]

const ALLOWED_KEYS = new Set(['name', 'phone', 'email', 'interest', 'message', 'website'])
const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
const NAME_RE = /^[\p{L}\p{M} .'-]+$/u

export function normalisePhone(raw) {
  const digits = asPlainString(raw).replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]/.test(digits.slice(2))) {
    return `+${digits}`
  }
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `+91${digits}`
  }
  return null
}

export function validateEnquiry(body) {
  const errors = {}

  if (body == null || typeof body !== 'object' || Array.isArray(body)) {
    return {
      errors: { form: 'Invalid request.' },
      data: null,
      discarded: false,
    }
  }

  for (const key of Object.keys(body)) {
    if (!ALLOWED_KEYS.has(key)) {
      return {
        errors: { form: 'Invalid request.' },
        data: null,
        discarded: false,
      }
    }
    if (looksLikeOperatorPayload(body[key])) {
      return {
        errors: { form: 'Invalid request.' },
        data: null,
        discarded: false,
      }
    }
  }

  const honeypot = asPlainString(body.website)
  if (honeypot) {
    return { errors: {}, data: null, discarded: true }
  }

  const name = asPlainString(body.name)
  const email = asPlainString(body.email).toLowerCase()
  const interest = asPlainString(body.interest)
  const message = asPlainString(body.message)
  const phone = normalisePhone(body.phone)

  if (name.length < 2 || name.length > 80 || !NAME_RE.test(name)) {
    errors.name = 'Please enter your full name.'
  }

  if (!phone) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  }

  if (!EMAIL_RE.test(email) || email.length > 120) {
    errors.email = 'Enter a valid email address.'
  }

  if (!INTEREST_OPTIONS.includes(interest)) {
    errors.interest = 'Select what you are interested in.'
  }

  if (message.length < 10) {
    errors.message = 'Please add a little more detail (at least 10 characters).'
  } else if (message.length > 2000) {
    errors.message = 'Please keep the message under 2000 characters.'
  } else if (countUrls(message) > 2) {
    errors.message = 'Please keep links out of this message, or include at most two.'
  }

  return {
    errors,
    discarded: false,
    data: { name, phone, email, interest, message },
  }
}
