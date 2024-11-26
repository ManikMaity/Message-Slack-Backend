import { StatusCodes } from 'http-status-codes'

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
  const response = await workspaceRepo.delete(workspaceId)
  return response
}
