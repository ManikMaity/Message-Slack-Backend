import { StatusCodes } from 'http-status-codes'

import { signinService, signupService } from '../services/user.service.js'
import { handleErrorResponse } from '../utils/utils.js'

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await signupService(username, email, password)

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: user
    })
  } catch (err) {
    handleErrorResponse(err, res)
  }
}

export const signinController = async (req, res) => {
  try {
    const { email, password } = req.body
    const data = await signinService(email, password)
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'User signed in successfully',
      data: data.user,
      token: data.token
    })
  } catch (err) {
    handleErrorResponse(err, res)
  }
}
