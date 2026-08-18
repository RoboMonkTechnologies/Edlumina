const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g
const TAGS = /<\/?[^>]+>/g
const URLS = /https?:\/\/[^\s]+/gi

export function asPlainString(value) {
  if (typeof value !== 'string') return ''
  return value.replace(CONTROL_CHARS, '').replace(TAGS, ' ').replace(/\s+/g, ' ').trim()
}

export function countUrls(value) {
  return String(value ?? '').match(URLS)?.length ?? 0
}

export function looksLikeOperatorPayload(value) {
  return value !== null && typeof value === 'object'
}
