import { env } from '../config/env.js'
import { logger } from '../lib/logger.js'

function publicMessage(err) {
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return { status: 400, message: 'Invalid JSON body.' }
  }

  if (err.type === 'entity.too.large' || err.status === 413) {
    return { status: 413, message: 'Request is too large.' }
  }

  if (err.name === 'ValidationError') {
    return { status: 400, message: 'Please check the highlighted fields.' }
  }

  if (err.status && err.status < 500) {
    return { status: err.status, message: err.expose ? err.message : 'Request could not be processed.' }
  }

  return { status: 500, message: 'Something went wrong. Please try again.' }
}

export function errorHandler(err, req, res, _next) {
  const { status, message } = publicMessage(err)

  logger.error('request_failed', {
    id: req.requestId,
    status,
    name: err.name,
    ...(env.isProduction ? {} : { detail: err.message }),
  })

  if (!env.isProduction && err.stack) {
    logger.error('stack', { id: req.requestId, stack: err.stack })
  }

  res.status(status).json({
    ok: false,
    message,
  })
}
