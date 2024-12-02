import { JOIN_CHANNEL } from "../utils/common/socketEventConstant.js";

export default function channelMessageHandler(socket) {
    socket.on(JOIN_CHANNEL, function joinChannel(data, cb) {
        const roomId = data.channelId;
        socket.join(roomId);
        console.log("Joined channel", roomId);
        cb({
            success: true,
            message: 'Joined channel successfully',             
            data: roomId
        });
    })
}