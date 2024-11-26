import { StatusCodes } from 'http-status-codes'

import { customErrorResponse } from '../utils/customErrorResponse.js'

function validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (err) {
      const explanation = err.issues.map((issue) => {
        return issue.message
      })
      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: 'Validation error : ' + explanation[0],
          explanation
        })
      )
    }
  }
}

export default validate
