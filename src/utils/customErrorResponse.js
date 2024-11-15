export const internalServerError = (err) => {
  return {
    success: false,
    message: 'Internal server error',
    err: err.explanation,
    data: {}
  }
}

export const customErrorResponse = (err) => {
  if (!err.message && !err.explanation) {
    return internalServerError(err)
  }

  return {
    success: false,
    message: err.message,
    err: err.explanation,
    data: {}
  }
}
