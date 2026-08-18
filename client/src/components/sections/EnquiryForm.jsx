import { cloneElement, useEffect, useState } from 'react'
import { PrimaryButton } from '../ui'
import { INTEREST_OPTIONS, validateEnquiryClient } from '../../data/contact'
import { ENQUIRY_EVENT, readEnquiryInterest } from '../../lib/enquiry'
import { cn } from '../../lib/cn'

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  interest: '',
  message: '',
  website: '',
}

const API_URL = import.meta.env.VITE_API_URL || '/api'

function applyInterest(interest) {
  return INTEREST_OPTIONS.includes(interest) ? interest : ''
}

export function EnquiryForm() {
  const [values, setValues] = useState(() => ({
    ...EMPTY,
    interest: applyInterest(readEnquiryInterest()),
  }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')

  useEffect(() => {
    const prefill = (interest) => {
      const next = applyInterest(interest)
      setStatus((current) => (current === 'loading' ? current : 'idle'))
      setValues((current) => ({ ...current, interest: next }))
      setErrors((current) => ({ ...current, interest: undefined }))
    }

    const onPrefill = (event) => prefill(event.detail?.interest)
    window.addEventListener(ENQUIRY_EVENT, onPrefill)
    return () => window.removeEventListener(ENQUIRY_EVENT, onPrefill)
  }, [])

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const { errors: nextErrors, payload } = validateEnquiryClient(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('invalid')
      return
    }

    setStatus('loading')
    setServerMessage('')

    try {
      const response = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, website: values.website }),
      })
      const body = await response.json().catch(() => ({}))

      if (!response.ok || !body.ok) {
        if (response.status === 429) {
          setStatus('error')
          setServerMessage(body.message || 'Too many enquiries. Please try again later.')
          return
        }
        setErrors(body.errors || {})
        setStatus('error')
        setServerMessage(body.message || 'Could not send your enquiry. Please call us.')
        return
      }

      setStatus('success')
      setValues(EMPTY)
      setServerMessage(body.message || 'Enquiry received.')
    } catch {
      setStatus('error')
      setServerMessage('Could not reach the server. Please call or WhatsApp us.')
    }
  }

  if (status === 'success') {
    return (
      <div className="ed-form-success" role="status">
        <p className="ed-form-success__kicker">Enquiry sent</p>
        <p className="ed-form-success__title">We have your details.</p>
        <p className="ed-form-success__copy">
          {serverMessage} A coordinator will follow up on the number you shared.
        </p>
        <PrimaryButton type="button" onClick={() => setStatus('idle')}>
          Send another enquiry
        </PrimaryButton>
      </div>
    )
  }

  const loading = status === 'loading'

  return (
    <form className="ed-form" onSubmit={onSubmit} noValidate aria-busy={loading}>
      <div className="ed-form__hp" aria-hidden="true">
        <label htmlFor="enquiry-website">Website</label>
        <input
          id="enquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onChange}
        />
      </div>
      <Field label="Name" error={errors.name}>
        <input
          id="enquiry-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={80}
          value={values.name}
          onChange={onChange}
          disabled={loading}
          required
        />
      </Field>

      <Field label="Phone" error={errors.phone}>
        <input
          id="enquiry-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91"
          value={values.phone}
          onChange={onChange}
          disabled={loading}
          required
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          id="enquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={120}
          value={values.email}
          onChange={onChange}
          disabled={loading}
          required
        />
      </Field>

      <Field label="I'm interested in..." error={errors.interest}>
        <select
          id="enquiry-interest"
          name="interest"
          value={values.interest}
          onChange={onChange}
          disabled={loading}
          required
        >
          <option value="">Select a programme</option>
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message}>
        <textarea
          id="enquiry-message"
          name="message"
          rows={5}
          maxLength={2000}
          value={values.message}
          onChange={onChange}
          disabled={loading}
          required
        />
      </Field>

      {status === 'error' && (
        <p className="ed-form__banner" role="alert">
          {serverMessage}
        </p>
      )}

      <PrimaryButton type="submit" size="lg" className="ed-form__submit" disabled={loading}>
        {loading ? 'Sending…' : 'Book a free demo'}
      </PrimaryButton>
    </form>
  )
}

function Field({ label, error, children }) {
  const id = children.props.id
  const errorId = `${id}-error`
  return (
    <label className={cn('ed-field', error && 'ed-field--error')} htmlFor={id}>
      <span className="ed-field__label">{label}</span>
      {cloneElement(children, {
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <span id={errorId} className="ed-field__error" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}
