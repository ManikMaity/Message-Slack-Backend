import { StatusCodes } from "http-status-codes";

import messageRepo from "../repositories/message.repo.js";
import workspaceRepo from "../repositories/workspace.repo.js";
import clientError from "../utils/errors/clientError.js";
import { isMemberOfWorkspace } from "./workspace.service.js";

export async function getMessagePaginatedService(userId, messageParams, page, limit) {
    const workspace = await workspaceRepo.getWorkspaceFromChannelId(messageParams.channelId);
    if (!workspace) {
        throw new clientError({
            message: 'Workspace not found',
            explanation: ['Invailid data given'],
            statusCode: StatusCodes.NOT_FOUND
        })
    };

    const isMember = isMemberOfWorkspace(workspace, userId);
    if (!isMember) {
        throw new clientError({
            message: 'You are not athorized to access this channel',
            explanation: ['You are not athorized to access this channel'],
            statusCode: StatusCodes.UNAUTHORIZED
        })
    }
    const messages = await messageRepo.getMessagePaginated(messageParams, page, limit);
    return messages;
}


export async function createMessageService(messageData) {
    const newMessage = await messageRepo.create(messageData);
    return newMessage;
}