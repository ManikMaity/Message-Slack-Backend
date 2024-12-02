import express from 'express'
import { createServer } from 'http';
import statusCodes from 'http-status-codes'
import { Server } from 'socket.io';

import serverAdapter from './config/bullBorad.config.js'
import connectDB from './config/db.config.js'
import { PORT } from './config/variables.js'
import { messageHandler } from './controllers/messageSocket.controller.js'
import apiRouter from './routes/apiRoute/api.route.js'



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  messageHandler(io, socket);
})



app.use('/admin/queues', serverAdapter.getRouter());
app.get('/ping', (req, res) => {
  res.status(statusCodes.OK).json({
    success: true,
    message: 'pong'
  })
})
app.use('/api', apiRouter)

server.listen(PORT, async () => {
  await connectDB()
  console.log(`Server is running on port http://localhost:${PORT}`)
})
