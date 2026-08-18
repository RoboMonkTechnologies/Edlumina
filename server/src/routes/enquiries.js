import { Router } from 'express'
import { Enquiry } from '../models/Enquiry.js'
import { isDbReady } from '../config/db.js'
import { logger } from '../lib/logger.js'
import { validateEnquiry } from '../lib/validateEnquiry.js'
import { methodNotAllowed } from '../middleware/methodNotAllowed.js'

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000
const SUCCESS = {
  ok: true,
  message: 'Enquiry received. We will contact you shortly.',
}

export const enquiryRouter = Router()

enquiryRouter.post('/', async (req, res, next) => {
  try {
    const { errors, data, discarded } = validateEnquiry(req.body ?? {})

    if (discarded) {
      logger.warn('enquiry_discarded', { id: req.requestId, reason: 'automation' })
      return res.status(201).json(SUCCESS)
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Please check the highlighted fields.',
        errors,
      })
    }

    if (!isDbReady()) {
      logger.error('enquiry_db_unavailable', { id: req.requestId })
      return res.status(503).json({
        ok: false,
        message: 'The enquiry desk is temporarily unavailable. Please call or WhatsApp us.',
      })
    }

    const since = new Date(Date.now() - DUPLICATE_WINDOW_MS)
    const duplicate = await Enquiry.exists({
      email: data.email,
      phone: data.phone,
      createdAt: { $gte: since },
    })

    if (duplicate) {
      logger.info('enquiry_duplicate', { id: req.requestId })
      return res.status(201).json(SUCCESS)
    }

    await Enquiry.create({
      name: data.name,
      phone: data.phone,
      email: data.email,
      interest: data.interest,
      message: data.message,
    })

    logger.info('enquiry_created', { id: req.requestId, interest: data.interest })
    return res.status(201).json(SUCCESS)
  } catch (error) {
    next(error)
  }
})

enquiryRouter.all('/', methodNotAllowed('POST'))
