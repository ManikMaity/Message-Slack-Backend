import express from 'express'
import statusCodes from 'http-status-codes'

import connectDB from './config/db.config.js'
import { PORT } from './config/variables.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
  res.status(statusCodes.OK).json({
    success: true,
    message: 'pong'
  })
})

await connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
