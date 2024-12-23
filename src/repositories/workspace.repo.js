import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

import UserModel from '../schema/user.schema.js'
import WorkspaceModel from '../schema/workspace.schema.js'
import clientError from '../utils/errors/clientError.js'
import channelRepo from './channel.repo.js'
import crudRepo from './crudRepo.js'

const workspaceRepo = {
  ...crudRepo(WorkspaceModel),
  getWorkspaceByName: async (name) => {
    const workspace = await WorkspaceModel.findOne({ name })
    if (!workspace) {
      throw new clientError({
        message: 'Workspace not found',
        explanation: 'Invailid data given',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    return workspace
  },
  getWorkspaceByJoinCode: async (joinCode) => {
    const workspace = await WorkspaceModel.findOne({ joinCode })
    if (!workspace) {
      throw new clientError({
        message: 'Workspace not found',
        explanation: 'Invailid data given',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    return workspace
  },
  addMemberToWorkspace: async (workspaceId, userId, role = 'member') => {
    const workspace = await WorkspaceModel.findById(workspaceId)
    if (!workspace) {
      throw new clientError({
        message: 'Workspace not found',
        explanation: 'Invailid data given',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const user = await UserModel.findById(userId)
    if (!user) {
      throw new clientError({
        message: 'User not found',
        explanation: 'Invailid data given',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const exitingMember = workspace.members.find(
      (member) => member.member.toString() === userId.toString()
    )
    if (exitingMember) {
      throw new clientError({
        message: 'User already exists in workspace',
        explanation: 'User already exists in workspace',
        statusCode: StatusCodes.BAD_REQUEST
      })
    }
    workspace.members.push({ member: userId, role: role })
    await workspace.save()
    return workspace
  },
  removeMemberFromWorkspace: async (workspaceId, userId) => {
    const workspace = await WorkspaceModel.findById(workspaceId)
    if (!workspace) {
      throw new clientError({
        message: 'Workspace not found',
        explanation: 'Invailid data given',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const exitingMember = workspace.members.find(
      (member) => member.member.toString() === userId.toString()
    )
    if (!exitingMember) {
      throw new clientError({
        message: 'User not found in workspace',
        explanation: 'User not found in workspace',
        statusCode: StatusCodes.BAD_REQUEST
      })
    }
    workspace.members = workspace.members.filter(
      (member) => member.member.toString() !== userId.toString()
    )
    await workspace.save()
    return workspace
  },
  addChannelToWorkspace: async (workspaceId, channelName) => {
    const workspace =
      await WorkspaceModel.findById(workspaceId).populate('channels')
    if (!workspace) {
      throw new clientError({
        message: 'Workspace not found',
        explanation: 'Invailid data given',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const exitingChannel = workspace.channels.find(
      (channel) => channel.name === channelName
    )
    if (exitingChannel) {
      throw new clientError({
        message: 'Channel already exists in workspace',
        explanation: 'Channel already exists in workspace',
        statusCode: StatusCodes.BAD_REQUEST
      })
    }
    const channel = await channelRepo.create({ name: channelName, workspaceId })
    workspace.channels.push(channel)
    await workspace.save()
    return workspace
  },
  fetchAllWorkspacesByMemberId: async (memberId) => {
    const workspaces = await WorkspaceModel.find({
      'members.member': memberId
    }).populate('members.member', 'username email avatar')
    return workspaces
  },
  getWorkspaceDetailsById: async (workspaceId) => {
    const workspace = await WorkspaceModel.findById(workspaceId).populate('channels').populate(
      'members.member',
      'username email avatar'
    )
    if (!workspace) {
      throw new clientError({
        message: 'Workspace not found',
        explanation: 'Invailid data given',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    return workspace
  },
  getWorkspaceFromChannelId: async (channelId) => {
    const workspace = await WorkspaceModel.findOne({
      channels: new mongoose.Types.ObjectId(channelId)
    });
    if (!workspace) {
      throw new clientError({
        message: 'Workspace not found',
        explanation: 'Invailid data given',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    return workspace
  },
  changeWorkspaceJoinCode : async (workspaceId, joinCode) => {
    const workspace = await WorkspaceModel.findById(workspaceId).populate('channels').populate(
      'members.member',
      'username email avatar'
    )
    workspace.joinCode = joinCode;
    await workspace.save();
    return workspace;
  }
}

export default workspaceRepo
