import express from 'express'
import statusCodes from 'http-status-codes'

import connectDB from './config/db.config.js'
import { PORT } from './config/variables.js'
import apiRouter from './routes/apiRoute/api.route.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
  res.status(statusCodes.OK).json({
    success: true,
    message: 'pong'
  })
})
app.use('/api', apiRouter)

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server is running on port http://localhost:${PORT}`)
})
