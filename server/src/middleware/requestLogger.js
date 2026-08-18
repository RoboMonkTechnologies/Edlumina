import { logger } from '../lib/logger.js'

export function requestLogger(req, res, next) {
  const started = Date.now()

  res.on('finish', () => {
    logger.info('request', {
      id: req.requestId,
      method: req.method,
      path: req.originalUrl?.split('?')[0],
      status: res.statusCode,
      ms: Date.now() - started,
    })
  })

  next()
}
