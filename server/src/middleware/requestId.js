import { randomUUID } from 'node:crypto'

export function requestId(req, res, next) {
  const headerId = String(req.headers['x-request-id'] ?? '').trim()
  const id = /^[a-zA-Z0-9-]{8,64}$/.test(headerId) ? headerId : randomUUID()
  req.requestId = id
  res.setHeader('X-Request-Id', id)
  next()
}
