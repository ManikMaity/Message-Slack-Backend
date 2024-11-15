import { StatusCodes } from "http-status-codes";
import WorkspaceModel from "../schema/workspace.schema.js";
import clientError from "../utils/errors/clientError.js";
import crudRepo from "./crudRepo.js";
import UserModel from "../schema/user.schema.js";
import ChannelModel from "../schema/channel.schema.js";
import channelRepo from "./channel.repo.js";

const workspaceRepo = {
    ...crudRepo(WorkspaceModel),
    getWorkspaceByName : async (name) => {
        const workspace = await WorkspaceModel.findOne({name});
        if (!workspace) {
            throw new clientError({
                message : 'Workspace not found',
                explanation : 'Invailid data given',
                statusCode : StatusCodes.NOT_FOUND
            })
        }
        return workspace;
    },
    getWorkspaceByJoinCode : async (joinCode) => {
        const workspace = await WorkspaceModel.findOne({joinCode});
        if (!workspace) {
            throw new clientError({
                message : 'Workspace not found',
                explanation : 'Invailid data given',
                statusCode : StatusCodes.NOT_FOUND
            })
        }
        return workspace;
    },
    addMemberToWorkspace : async (workspaceId, userId, role = 'member') => {
        const workspace = await WorkspaceModel.findById(workspaceId);
        if (!workspace) {
            throw new clientError({
                message : 'Workspace not found',
                explanation : 'Invailid data given',
                statusCode : StatusCodes.NOT_FOUND
            })
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new clientError({
                message : 'User not found',
                explanation : 'Invailid data given',
                statusCode : StatusCodes.NOT_FOUND
            })
        }
        const exitingMember = workspace.members.find(member => member.member.toString() === userId.toString());
        if (exitingMember) {
            throw new clientError({
                message : 'User already exists in workspace',
                explanation : 'User already exists in workspace',
                statusCode : StatusCodes.BAD_REQUEST
            })
        }
        workspace.members.push({member : userId, role : role});
        await workspace.save();
        return workspace;
    },
    addChannelToWorkspace : async (workspaceId, channelName) => {
        const workspace = await WorkspaceModel.findById(workspaceId).populate('channels');
        if (!workspace) {
            throw new clientError({
                message : 'Workspace not found',
                explanation : 'Invailid data given',
                statusCode : StatusCodes.NOT_FOUND
            })
        }
        const exitingChannel = workspace.channels.find(channel => channel.name === channelName);
        if (exitingChannel) {
            throw new clientError({
                message : 'Channel already exists in workspace',
                explanation : 'Channel already exists in workspace',
                statusCode : StatusCodes.BAD_REQUEST
            })
        }
        const channel = await channelRepo.create({name : channelName});
        workspace.channels.push(channel);
        await workspace.save();
        return workspace;
    },
    fetchAllWorkspacesByMemberId : async (memberId) => {
        const workspaces = await WorkspaceModel.find({'members.member' : memberId}).populate("members.member", 'username email avatar');
        return workspaces;
    },

}

export default workspaceRepo