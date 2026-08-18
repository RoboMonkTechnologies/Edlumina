import mongoose from 'mongoose'
import { logger } from '../lib/logger.js'

export async function connectDb(uri) {
  if (!uri) {
    throw new Error('MONGODB_URI is not set')
  }

  mongoose.set('strictQuery', true)

  mongoose.connection.on('error', (error) => {
    logger.error('mongo_error', { name: error.name })
  })

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
    maxPoolSize: 10,
  })

  logger.info('mongo_connected')
}

export function isDbReady() {
  return mongoose.connection.readyState === 1
}
