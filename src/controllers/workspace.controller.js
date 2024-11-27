import { StatusCodes } from 'http-status-codes'

import {
  createWorkspaceService,
  deleteWorkspaceService,
  getAllWorspaceSerive,
  getWorkSpaceByJoinCodeService,
  getWorkspaceService,
  updateWorkspaceService
} from '../services/workspace.service.js'
import {
  customErrorResponse,
  internalServerError
} from '../utils/customErrorResponse.js'
import { customSuccessResponse } from '../utils/successResponseObj.js'

export async function createWorkspaceController(req, res) {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.user._id
    })
    res
      .status(StatusCodes.CREATED)
      .json(
        customSuccessResponse('Workspace created successfully 😃', response)
      )
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(customErrorResponse(err))
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(err))
    }
  }
}

export async function getAllWorkspaceController(req, res) {
  try {
    const userId = req.user._id
    const resposne = await getAllWorspaceSerive(userId)
    res
      .status(StatusCodes.OK)
      .json(
        customSuccessResponse('All Workspace fetched successfully', resposne)
      )
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(customErrorResponse(err))
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(err))
    }
  }
}

export async function deleteWorkspaceController(req, res) {
  try {
    const userId = req.user._id
    const workspaceId = req.params.workspaceId
    const deletedWorkspace = await deleteWorkspaceService(workspaceId, userId)
    res
      .status(StatusCodes.OK)
      .json(
        customSuccessResponse(
          'Workspace deleted successfully',
          deletedWorkspace
        )
      )
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(customErrorResponse(err))
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(err))
    }
  }
}

export async function updateWorkspaceController(req, res) {
  try {
    const userId = req.user._id
    const workspaceId = req.params.workspaceId
    const updateData = req.body
    const updatedWorkspace = await updateWorkspaceService(
      workspaceId,
      updateData,
      userId
    )
    res
      .status(StatusCodes.OK)
      .json(
        customSuccessResponse(
          'Workspace updated successfully',
          updatedWorkspace
        )
      )
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(customErrorResponse(err))
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(err))
    }
  }
}

export async function getWorkspaceController(req, res) {
  try {
    const userId = req.user._id;
    const workspaceId = req.params.workspaceId;
    const workspaceData = await getWorkspaceService(workspaceId, userId);
    res.status(StatusCodes.OK).json(customSuccessResponse("Workspace fetched successfully", workspaceData));
  } 
  catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(customErrorResponse(err))
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(err))
    }
  }
}

export async function getWorkSpaceByJoinCodeController(req, res) {
  try {
    const joinCode = req.params.joinCode;
    const workspace = await getWorkSpaceByJoinCodeService(joinCode);
    res.status(StatusCodes.OK).json(customSuccessResponse("Workspace fetched successfully by join code", workspace));
  }
  catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(customErrorResponse(err))
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(err))
    }
  }
}