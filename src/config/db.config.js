import mongoose from 'mongoose'

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from './variables.js'

export default async function connectDB() {
  try {
    if (NODE_ENV == 'development') {
      await mongoose.connect(DEV_DB_URL)
      console.log('Connected to development database')
    } else if (NODE_ENV == 'production') {
      await mongoose.connect(PROD_DB_URL)
      console.log('Connected to production database')
    } else {
      console.log('Invalid DB environment variable')
    }
  } catch (error) {
    console.log('Error connecting to database', error)
  }
}
