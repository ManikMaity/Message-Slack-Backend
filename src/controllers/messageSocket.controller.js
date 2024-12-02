import { createMessageService } from "../services/message.service.js";
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED } from "../utils/common/socketEventConstant.js";

export function messageHandler(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb){
    const { channelId } = data;
    const messageResponse = await createMessageService(data);
    console.log(channelId);
    io.to(channelId).emit(NEW_MESSAGE_RECEIVED, messageResponse);
    cb({
      success: true,
      message: 'Message created successfully',
      data: messageResponse
    });
  });
}


