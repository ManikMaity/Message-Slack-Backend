import {
  createMessageService,
  updateMessageService
} from '../services/message.service.js'
import {
  EDIT_MESSAGE_EVENT,
  EDITED_MESSAGE_RECEIVED,
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED
} from '../utils/common/socketEventConstant.js'

export function messageHandler(io, socket) {
  socket.on(EDIT_MESSAGE_EVENT, async function editMessageHandler(data, cb) {
    const { channelId } = data
    try {
      const updatedMessage = await updateMessageService(data)
      io.to(channelId).emit(EDITED_MESSAGE_RECEIVED, updatedMessage)
      if (cb) {
        cb({
          success: true,
          message: 'Message updated successfully',
          data: updatedMessage
        })
      }
    } catch (err) {
      if (cb) {
        cb({
          success: false,
          message: err.message,
          err: err.explanation
        })
      }
    }
  })

  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    const { channelId } = data
    const messageResponse = await createMessageService(data)
    io.to(channelId).emit(NEW_MESSAGE_RECEIVED, messageResponse)
    if (cb) {
      cb({
        success: true,
        message: 'Message created successfully',
        data: messageResponse
      })
    }
  })
}
