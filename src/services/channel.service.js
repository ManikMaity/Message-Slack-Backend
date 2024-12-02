import { StatusCodes } from "http-status-codes";

import channelRepo from "../repositories/channel.repo.js";
import messageRepo from "../repositories/message.repo.js";
import { isMemberOfWorkspace } from "./workspace.service.js";

export async function getChannelByIdService(channelId, userId) {
    const channel = await channelRepo.getChannelByIdWithWorkspace(channelId);
    if (!channel) {
        throw {
            statusCode: StatusCodes.NOT_FOUND,
            message: 'Channel not found',
            explanation: ['Channel not found']
        }
    }
    
    const isMember = isMemberOfWorkspace(channel.workspaceId, userId);
    if (!isMember) {
        throw {
            statusCode: StatusCodes.UNAUTHORIZED,
            message: 'You are not athorized to access this channel',
            explanation: ['You are not athorized to access this channel']
        }
    }

    const channelMessages = await messageRepo.getMessagePaginated({channelId}, 1, 20);

    return {
        _id : channel._id,
        name : channel.name,
        workspaceId : channel.workspaceId,
        createdAt : channel.createdAt,
        updatedAt : channel.updatedAt,
        messages : channelMessages
    };
}

