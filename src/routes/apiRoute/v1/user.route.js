import express from 'express'
import { StatusCodes } from 'http-status-codes'

import {
  forgetPasswordController,
  signinController,
  signupController
} from '../../../controllers/user.controller.js'
import signinSchema from '../../../validations/signin.validation.js'
import signupSchema from '../../../validations/signup.validation.js'
import validate from '../../../validations/validator.js'
import forgetPassSchema from '../../../validations/forgetPass.validation.js'
const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'User route is working✔️'
  })
})

userRouter.post('/signup', validate(signupSchema), signupController)
userRouter.post('/signin', validate(signinSchema), signinController)
userRouter.post('/forget-password', validate(forgetPassSchema), forgetPasswordController);

export default userRouter
