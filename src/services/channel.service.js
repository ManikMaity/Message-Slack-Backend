import { StatusCodes } from "http-status-codes";

import channelRepo from "../repositories/channel.repo.js";
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
    
    return channel;
}