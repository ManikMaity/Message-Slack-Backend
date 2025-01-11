import express from 'express'

import channelRouter from './channel.route.js'
import memberRouter from './member.route.js'
import messageRouter from './message.route.js'
import userRouter from './user.route.js'
import workspaceRouter from './workspace.route.js'
import likeRouter from './like.route.js'
const v1Router = express.Router()

v1Router.use('/user', userRouter)
v1Router.use('/workspace', workspaceRouter)
v1Router.use("/channel", channelRouter);
v1Router.use("/member", memberRouter);
v1Router.use("/message", messageRouter);
v1Router.use("/like", likeRouter);

export default v1Router
