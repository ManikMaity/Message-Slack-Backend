import { StatusCodes } from 'http-status-codes'

import channelRepo from '../repositories/channel.repo.js'
import workspaceRepo from '../repositories/workspace.repo.js'
import createJoinCode from '../utils/createJoinCode.js'

export async function createWorkspaceService(workspace) {
  try {
    const joinCode = createJoinCode(6)
    const response = await workspaceRepo.create({
      name: workspace.name,
      description: workspace.description,
      image: workspace.image,
      joinCode
    })
    await workspaceRepo.addMemberToWorkspace(
      response._id,
      workspace.owner,
      'admin'
    )
    const w1 = await workspaceRepo.addChannelToWorkspace(
      response._id,
      'general'
    )
    return w1
  } catch (err) {
    if (err.code === 11000) {
      throw {
        message: 'A workspace with this name already exists',
        explanation: ['A workspace with this name already exists'],
        statusCode: StatusCodes.BAD_REQUEST
      }
    } else {
      throw err
    }
  }
}

export async function getAllWorspaceSerive(userId) {
  const respose = await workspaceRepo.fetchAllWorkspacesByMemberId(userId)
  return respose
}

export async function deleteWorkspaceService(workspaceId, userId) {
  const workspace = await workspaceRepo.getById(workspaceId)
  if (!workspace) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Workspace not found',
      explanation: ['Workspace not found']
    }
  }
  const exitsAsAdmin = workspace.members.find((member) => {
    if (
      member.member.toString() === userId.toString() &&
      member.role === 'admin'
    ) {
      return true
    }
    return false
  })
  if (!exitsAsAdmin) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'You are not athorized to delete this workspace',
      explanation: ['You are not athorized to delete this workspace']
    }
  }
  await channelRepo.deleteManyByIds(workspace.channels)
  const response = await workspaceRepo.delete(workspaceId)
  return response
}

export async function updateWorkspaceService(workspaceId, data, userId) {
  const workspace = await workspaceRepo.getById(workspaceId)
  if (!workspace) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Workspace not found',
      explanation: ['Workspace not found']
    }
  }

  const isAdmin = workspace.members.find(
    (member) =>
      member.member.toString() == userId.toString() && member.role == 'admin'
  )
  if (!isAdmin) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'You are not athorized to update this workspace',
      explanation: ['You are not athorized to update this workspace']
    }
  }
  const response = await workspaceRepo.update(workspaceId, data)
  return response
}

export async function getWorkspaceService(workspaceId, userId) {
  const workspace = await workspaceRepo.getById(workspaceId);
  if (!workspace) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Workspace not found',
      explanation: ['Workspace not found']
    }
  }
  const isMember = workspace.members.find(member => member.member.toString() === userId.toString());
  if (!isMember) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'You are not athorized to access this workspace',
      explanation: ['You are not athorized to access this workspace']
    }
  }

  return workspace;
}

export async function getWorkSpaceByJoinCodeService(joinCode) {
  const workspace = await workspaceRepo.getWorkspaceByJoinCode(joinCode);
  if (!workspace){
    throw {
      statusCode : StatusCodes.NOT_FOUND,
      message : "Workspace with this join code not found",
      explanation : ["Workspace with this join code not found"]
    }
  }
  return workspace;
}

export async function addMemberToWorkspaceService(workspaceId, userId, memberId, role) {
  const workspace = await workspaceRepo.getById(workspaceId);
  if (!workspace) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Workspace not found',
      explanation: ['Workspace not found']
    }
  }

  const isAdmin = workspace.members.find(
    (member) =>
      member.member.toString() == userId.toString() && member.role == 'admin'
  )

  if (!isAdmin){
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'You are not athorized to add members to this workspace',
      explanation: ['You are not athorized to add members to this workspace']
    }
  }

  const respose = await workspaceRepo.addMemberToWorkspace(workspaceId, memberId, role);
  return respose
}

export async function removeMemberFromWorkspaceService(workspaceId, memberId, userId) {
  const workspace = await workspaceRepo.getById(workspaceId);
  if (!workspace) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Workspace not found',
      explanation: ['Workspace not found']
    }
  }
  const isAdmin = workspace.members.find(
    (member) =>
      member.member.toString() == userId.toString() && member.role == 'admin'
  )
  if (!isAdmin) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'You are not athorized to remove members from this workspace',
      explanation: ['You are not athorized to remove members from this workspace']
    }
  }
  const isMemberExit = workspace.members.find(member => member.member.toString() === memberId.toString());
  if (!isMemberExit) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Member not found in this workspace',
      explanation: ['Member not found in this workspace']
    }
  }
  const response = await workspaceRepo.removeMemberFromWorkspace(workspaceId, memberId);
  return response;
}

// export async function addChannelToWorkspaceService(
//   workspaceId,
//   channelName,
//   userId
// ) {}
