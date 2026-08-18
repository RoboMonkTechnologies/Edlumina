import mongoose from 'mongoose'
import { INTEREST_OPTIONS } from '../lib/validateEnquiry.js'

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 16 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    interest: { type: String, required: true, enum: INTEREST_OPTIONS },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
    strict: true,
    strictQuery: true,
  },
)

enquirySchema.index({ email: 1, phone: 1, createdAt: -1 })
enquirySchema.index({ createdAt: -1 })

export const Enquiry = mongoose.model('Enquiry', enquirySchema)
