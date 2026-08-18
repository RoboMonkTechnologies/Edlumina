import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { connectDb, isDbReady } from './config/db.js'
import { env } from './config/env.js'
import { logger } from './lib/logger.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'
import { requestId } from './middleware/requestId.js'
import { requestLogger } from './middleware/requestLogger.js'
import { enquiryRouter } from './routes/enquiries.js'

const app = express()

if (env.trustProxy) {
  app.set('trust proxy', 1)
}

app.disable('x-powered-by')
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)
app.use(requestId)
app.use(requestLogger)

const originSet = new Set(env.clientOrigins)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, false)
      }
      if (originSet.has(origin)) {
        return callback(null, true)
      }
      return callback(null, false)
    },
    methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Request-Id'],
    credentials: false,
    maxAge: 600,
  }),
)

app.use(express.json({ limit: env.jsonLimit }))

app.get('/api/health', (_req, res) => {
  const db = isDbReady()
  res.status(db ? 200 : 503).json({
    ok: db,
    service: 'edlumina-api',
  })
})

const enquiryLimiter = rateLimit({
  windowMs: env.enquiryWindowMs,
  limit: env.enquiryMax,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { ok: false, message: 'Too many enquiries. Please try again later.' },
  statusCode: 429,
  skipFailedRequests: false,
})

app.use('/api/enquiries', enquiryLimiter, enquiryRouter)

app.use(notFound)
app.use(errorHandler)

try {
  await connectDb(env.mongodbUri)
} catch (error) {
  logger.error('mongo_unavailable', { name: error.name })
  if (env.isProduction) {
    process.exit(1)
  }
}

app.listen(env.port, () => {
  logger.info('api_listening', { port: env.port, env: env.nodeEnv })
})

process.on('unhandledRejection', (reason) => {
  logger.error('unhandled_rejection', { name: reason?.name })
})
