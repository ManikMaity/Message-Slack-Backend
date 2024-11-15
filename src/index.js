import express from 'express'
import statusCodes from 'http-status-codes'

import { PORT } from './config/variables.js'

const app = express()
app.use(express.json())

app.get('/ping', (req, res) => {
  res.status(statusCodes.OK).json({
    success: true,
    message: 'pong'
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
