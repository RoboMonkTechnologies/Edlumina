export const CONTACT = {
  centre: 'Edlumina Excellence Centre',
  campus: 'Fortune School of Business',
  lines: [
    'Metro Pillar No. 830',
    'Kothari Solitaire, NH65',
    'beside Govt. Degree College',
    'Vivek Nagar, Kukatpally',
    'Hyderabad — 500072',
  ],
  phones: [
    { display: '+91 87124 43601', tel: '+918712443601', wa: '918712443601' },
    { display: '+91 87124 43602', tel: '+918712443602', wa: '918712443602' },
  ],
  emails: [
    'enquiry@edluminaexcellencecenter.com',
    'info@edluminaexcellencecenter.com',
  ],
  email: 'enquiry@edluminaexcellencecenter.com',
  hours: [
    { days: 'Mon–Thu', time: '4:30–7:30 PM' },
    { days: 'Sat–Sun', time: '9 AM–7 PM' },
  ],
}

export const INTEREST_OPTIONS = [
  'School Program',
  'College Skill Builder',
  'Job Certification',
  'Lab Setup',
  'Free Sunday Workshop',
  'Free Saturday Webinar',
]

export const DEFAULT_MAP_EMBED =
  'https://maps.google.com/maps?q=Fortune+School+of+Business+Vivek+Nagar+Kukatpally+Hyderabad+500072&z=16&output=embed'

export const MAP_PAGE_URL =
  'https://www.google.com/maps/search/?api=1&query=Fortune+School+of+Business+Vivek+Nagar+Kukatpally+Hyderabad+500072'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalisePhone(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]/.test(digits.slice(2))) {
    return `+${digits}`
  }
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `+91${digits}`
  }
  return null
}

export function validateEnquiryClient(values) {
  const name = values.name.trim()
  const email = values.email.trim().toLowerCase()
  const interest = values.interest.trim()
  const message = values.message.trim()
  const phone = normalisePhone(values.phone)
  const errors = {}

  if (name.length < 2 || name.length > 80) errors.name = 'Please enter your full name.'
  if (!phone) errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'
  if (!INTEREST_OPTIONS.includes(interest)) errors.interest = 'Select what you are interested in.'
  if (message.length < 10) errors.message = 'Please add a little more detail (at least 10 characters).'
  if (message.length > 2000) errors.message = 'Please keep the message under 2000 characters.'

  return {
    errors,
    payload: { name, phone, email, interest, message },
  }
}
