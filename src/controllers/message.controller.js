import { StatusCodes } from 'http-status-codes'

import { getMessagePaginatedService } from '../services/message.service.js'
import {
  customErrorResponse,
  internalServerError
} from '../utils/customErrorResponse.js'
import { customSuccessResponse } from '../utils/successResponseObj.js';

export async function getMessagePaginatedController(req, res) {
  try {
    const messages = await getMessagePaginatedService(
      req.user._id,
      {
        channelId: req.params.channelId
      },
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
