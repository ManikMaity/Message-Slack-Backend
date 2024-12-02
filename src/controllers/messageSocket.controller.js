import { createMessageService } from "../services/message.service.js";
import { NEW_CHANNEL_MESSAGE, NEW_CHANNEL_MESSAGE_RECEIVED, NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED } from "../utils/common/socketEventConstant.js";

export function messageHandler(io, socket) {

  const roomId = socket.handshake.query.roomId;
  if (roomId) {
    socket.join(roomId);
    console.log('Joined room', roomId);
  }

  socket.on(NEW_CHANNEL_MESSAGE, async function createChannelMessage(data, cb) {
    const messageResponse = await createMessageService({...data, channelId: roomId});
    socket.to(roomId).emit(NEW_CHANNEL_MESSAGE_RECEIVED, messageResponse);
    cb({
      success: true,
      message: 'Message created successfully',
      data: messageResponse
    })
  })

  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb){
    const messageResponse = await createMessageService(data);
    socket.broadcast.emit(NEW_MESSAGE_RECEIVED, messageResponse);
    cb({
      success: true,
      message: 'Message created successfully',
      data: messageResponse
    });
  });
}


