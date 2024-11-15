import { StatusCodes } from 'http-status-codes'

import { signinService, signupService } from '../services/user.service.js'
import {
  customErrorResponse,
  internalServerError
} from '../utils/customErrorResponse.js'
import { customSuccessResponse } from '../utils/successResponseObj.js'

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await signupService(username, email, password)
    res
      .status(StatusCodes.CREATED)
      .json(customSuccessResponse('User created successfully', user))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(customErrorResponse(err))
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(err))
    }
  }
}

export const signinController = async (req, res) => {
  try {
    const { email, password } = req.body
    const data = await signinService(email, password)
    res
      .status(StatusCodes.OK)
      .json(customSuccessResponse('User signed in successfully', data))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(customErrorResponse(err))
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(err))
    }
  }
}
