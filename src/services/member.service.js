import { StatusCodes } from "http-status-codes";
import workspaceRepo from "../repositories/workspace.repo.js";
import { isMemberOfWorkspace } from "./workspace.service.js";
import userRepo from "../repositories/user.repo.js";

export async function isUserPartOfWorkspaceService(workspaceId, userId) {
    const workspace = await workspaceRepo.getById(workspaceId);
    if (!workspace) {
      throw {
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Workspace not found',
        explanation: ['Workspace not found']
      }
    }
    const isMember = isMemberOfWorkspace(workspace, userId);
  
    if (!isMember) {
      throw {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'User is not part of this workspace',
        explanation: ['User is not part of this workspace']
      }
    }
    const userDeatils = await userRepo.getById(userId);
    return userDeatils;
  }