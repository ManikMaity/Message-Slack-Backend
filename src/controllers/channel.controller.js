import { StatusCodes } from "http-status-codes"

import { getChannelByIdService } from "../services/channel.service.js";
import { customErrorResponse, internalServerError } from "../utils/customErrorResponse.js"
import { customSuccessResponse } from "../utils/successResponseObj.js";

export async function getChannelByIdController(req, res) {
    try {
        const channelId = req.params.channelId;
        const userId = req.user._id;
        const channel = await getChannelByIdService(channelId, userId);
        res.status(StatusCodes.OK).json(customSuccessResponse("Channel fetched successfully", channel));
    }
    catch(err) {
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