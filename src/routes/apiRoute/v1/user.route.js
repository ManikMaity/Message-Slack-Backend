import express from 'express'
import { StatusCodes } from 'http-status-codes'

import {
  forgetPasswordController,
  resetPasswordController,
  signinController,
  signupController
} from '../../../controllers/user.controller.js'
import forgetPassSchema from '../../../validations/forgetPass.validation.js'
import resetPasswordShema from '../../../validations/resetPassword.validation.js'
import signinSchema from '../../../validations/signin.validation.js'
import signupSchema from '../../../validations/signup.validation.js'
import validate from '../../../validations/validator.js'
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
userRouter.post("/reset-password", validate(resetPasswordShema), resetPasswordController);

export default userRouter
