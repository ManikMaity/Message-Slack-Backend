import { StatusCodes } from 'http-status-codes'
import { customErrorResponse, internalServerError } from '../utils/customErrorResponse.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/variables.js'

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['slack_token']
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Missing token',
          explanation: "Slack token isn't provided"
        })
      )
    }
    const data = jwt.verify(token, JWT_SECRET)
    if (!data) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid token',
          explanation: 'Slack token is invalid'
        })
      )
    }
  } catch (err) {
    console.log(err)
    if (err.name === "JsonWebTokenError"){
        return res.status(StatusCodes.FORBIDDEN).json(
            customErrorResponse({
                message : "Invalid auth token provided",
                explanation :  "Invalid auth token provided"
            })
        )
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError())
  }
}

export default verifyToken
