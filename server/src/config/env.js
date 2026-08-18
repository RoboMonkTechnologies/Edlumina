import 'dotenv/config'

function required(name) {
  const value = String(process.env[name] ?? '').trim()
  if (!value) {
    throw new Error(`${name} is not set`)
  }
  return value
}

function optional(name, fallback = '') {
  const value = String(process.env[name] ?? '').trim()
  return value || fallback
}

const nodeEnv = optional('NODE_ENV', 'development')
const isProduction = nodeEnv === 'production'

const clientOrigins = optional(
  'CLIENT_URL',
  isProduction ? '' : 'http://localhost:5173,http://127.0.0.1:5173',
)
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean)

if (isProduction && clientOrigins.length === 0) {
  throw new Error('CLIENT_URL is not set')
}

if (isProduction) {
  required('MONGODB_URI')
}

export const env = {
  nodeEnv,
  isProduction,
  port: Number(optional('PORT', '5000')) || 5000,
  mongodbUri: optional('MONGODB_URI'),
  clientOrigins,
  trustProxy: optional('TRUST_PROXY', 'false') === 'true' || optional('TRUST_PROXY') === '1',
  enquiryWindowMs: Number(optional('ENQUIRY_RATE_LIMIT_WINDOW_MS', String(15 * 60 * 1000))),
  enquiryMax: Number(optional('ENQUIRY_RATE_LIMIT_MAX', '8')) || 8,
  jsonLimit: optional('JSON_BODY_LIMIT', '16kb'),
}
