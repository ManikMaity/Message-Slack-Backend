import { Router } from "express";

import { getDMMessagesPaginatedController, getMessagePaginatedController } from "../../../controllers/message.controller.js";
import verifyToken from "../../../middlewares/authMiddleware.js";
const messageRouter = Router();

messageRouter.get("/messages/:workspaceId/:channelId", verifyToken, getMessagePaginatedController);
messageRouter.get("/dm/:workspaceId/:combinedId", verifyToken, getDMMessagesPaginatedController);


export default messageRouter;
