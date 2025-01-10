import { StatusCodes } from "http-status-codes";

import messageRepo from "../repositories/message.repo.js";
import workspaceRepo from "../repositories/workspace.repo.js";
import clientError from "../utils/errors/clientError.js";
import { isMemberOfWorkspace } from "./workspace.service.js";

import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/variables.js";


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
    const messageDetail = await messageRepo.getMessageDetail(newMessage._id);
    return messageDetail;
}

export async function updateMessageService(messageData) {

    if (!messageData?.token){
        throw {
            statusCode: StatusCodes.UNAUTHORIZED,
            message: 'Slack token is required',
            explanation: ['Slack token is required']
        }   
    }
    const message = await messageRepo.getById(messageData.messageId);
    if (!message) {
        throw {
            statusCode: StatusCodes.NOT_FOUND,
            message: 'Message not found',
            explanation: ['Message not found']
        }
    }

    const {id} = jwt.verify(messageData?.token, JWT_SECRET);
    console.log(id, message.senderId.toString());

    if (id.toString() !== message.senderId.toString()) {
        throw {
            statusCode: StatusCodes.UNAUTHORIZED,
            message: 'You are not athorized to edit this message',
            explanation: ['You are not athorized to edit this message']
        }
    }

    const updatedMessage = await messageRepo.update(messageData?.messageId, messageData.updateContent);
    const messageDetail = await messageRepo.getMessageDetail(updatedMessage._id);
    return messageDetail;
}