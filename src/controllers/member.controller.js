import { StatusCodes } from "http-status-codes";

import { isUserPartOfWorkspaceService } from "../services/member.service.js";
import { customErrorResponse, internalServerError } from "../utils/customErrorResponse.js";
import { customSuccessResponse } from "../utils/successResponseObj.js";

export async function isUserPartOfWorkspaceController(req, res) {
    try {
      const userId = req.user._id;
      const workspaceId = req.params.workspaceId;
      const response = await isUserPartOfWorkspaceService(workspaceId, userId);
      res.status(StatusCodes.OK).json(customSuccessResponse("User is part of workspace", response));
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