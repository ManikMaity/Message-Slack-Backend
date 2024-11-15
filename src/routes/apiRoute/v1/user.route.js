import express from 'express'
import { StatusCodes } from 'http-status-codes'
const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'User route is working✔️'
  })
})

export default userRouter
