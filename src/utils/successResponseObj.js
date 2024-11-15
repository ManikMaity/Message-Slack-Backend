export const customSuccessResponse = (message, data) => {
  return {
    success: true,
    message: message,
    data: data,
    err: {}
  }
}
