import { StatusCodes } from 'http-status-codes'

class clientError extends Error {
  constructor(error) {
    super()
    this.name = 'clientError'
    this.message = error.message
    this.explanation = error.explanation
    this.statusCode = error.statusCode || StatusCodes.BAD_REQUEST
  }
}

export default clientError
