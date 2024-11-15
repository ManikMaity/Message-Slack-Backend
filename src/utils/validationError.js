import { StatusCodes } from 'http-status-codes'

class ValidationError extends Error {
  constructor(errorDeatails, message) {
    super(message)
    this.name = 'ValidationError'
    let explanation = []
    Object.keys(errorDeatails).forEach((key) => {
      explanation.push(errorDeatails[key])
    })
    this.explanation = explanation
    this.statusCode = StatusCodes.BAD_REQUEST
    this.message = message
  }
}

export default ValidationError
