import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter.js';
import { ExpressAdapter } from '@bull-board/express'
import express from 'express'
import statusCodes from 'http-status-codes'

import connectDB from './config/db.config.js'
import { PORT } from './config/variables.js'
import mailQueue from './queues/mail.queue.js'
import apiRouter from './routes/apiRoute/api.route.js'

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullAdapter(mailQueue)],
  serverAdapter: serverAdapter,
});

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/admin/queues', serverAdapter.getRouter());
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
