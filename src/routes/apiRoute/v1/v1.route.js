import express from 'express'

import userRouter from './user.route.js'
import workspaceRouter from './workspace.route.js'
const v1Router = express.Router()

v1Router.use('/user', userRouter)
v1Router.use('/workspace', workspaceRouter)

export default v1Router
