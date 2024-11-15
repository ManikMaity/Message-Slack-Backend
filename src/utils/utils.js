import { StatusCodes } from 'http-status-codes'

export const handleErrorResponse = (err, res) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      err: err.explanation
    })
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message,
      err: err.explanation
    })
  }
}
