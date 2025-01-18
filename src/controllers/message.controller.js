import { StatusCodes } from 'http-status-codes'

import { getDMPaginatedMessagesService, getMessagePaginatedService, searchMessagesService } from '../services/message.service.js'
import {
  customErrorResponse,
  internalServerError
} from '../utils/customErrorResponse.js'
import { customSuccessResponse } from '../utils/successResponseObj.js';

export async function getMessagePaginatedController(req, res) {
  try {
    const messages = await getMessagePaginatedService(
      req.user._id,
      req.params,
      req.query.page || 1,
      req.query.limit || 20
    );

    res
      .status(StatusCodes.OK)
      .json(customSuccessResponse('Messages fetched successfully', messages));
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

export async function getDMMessagesPaginatedController(req, res) {
  try {
    const messages = await getDMPaginatedMessagesService(
      req.user._id,
      req.params.workspaceId,
      req.params.combinedId,
      req.query.page || 1,
      req.query.limit || 20
    );

    res
      .status(StatusCodes.OK)
      .json(customSuccessResponse('Messages fetched successfully', messages));
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

export async function searchMessagesController(req, res) {
  try {
    const {searchQuery, workspaceId} = req.body;
    const userId = req.user._id;
    const messages = await searchMessagesService(workspaceId, userId, searchQuery);
    res.status(StatusCodes.OK).json(customSuccessResponse("Messages fetched successfully", messages));
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
