import { StatusCodes } from 'http-status-codes'

import { createWorkspaceService } from '../services/workspace.service.js'
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
    console.log(err);
    if (err.statusCode) {
      res.status(err.statusCode).json(customErrorResponse(err))
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalServerError(err))
    }
  }
}
