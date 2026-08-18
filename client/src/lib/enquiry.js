import { INTEREST_OPTIONS } from '../data/contact'

export const ENQUIRY_EVENT = 'edlumina:enquiry'
const STORAGE_KEY = 'edlumina-enquiry-interest'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function readEnquiryInterest() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return INTEREST_OPTIONS.includes(stored) ? stored : ''
  } catch {
    return ''
  }
}

export function setEnquiryInterest(interest) {
  const next = INTEREST_OPTIONS.includes(interest) ? interest : ''
  try {
    if (next) sessionStorage.setItem(STORAGE_KEY, next)
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT, { detail: { interest: next } }))
  return next
}

export function openEnquiry(interest) {
  const next = setEnquiryInterest(interest)
  const hash = '#contact'

  if (window.location.hash !== hash) {
    window.location.hash = 'contact'
  } else {
    document.getElementById('contact')?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const targetId = next ? 'enquiry-interest' : 'enquiry-name'
  const delay = prefersReducedMotion() ? 0 : 200
  let attempts = 0

  const focusField = () => {
    const field = document.getElementById(targetId)
    if (field) {
      field.focus()
      return
    }
    attempts += 1
    if (attempts < 25) window.setTimeout(focusField, 100)
  }

  window.setTimeout(focusField, delay)
  return next
}

export function handleEnquiryClick(event, interest) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    setEnquiryInterest(interest)
    return
  }
  event.preventDefault()
  openEnquiry(interest)
}
