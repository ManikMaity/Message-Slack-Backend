import { Router } from "express";

import { getMessagePaginatedController } from "../../../controllers/message.controller.js";
import verifyToken from "../../../middlewares/authMiddleware.js";
const messageRouter = Router();

messageRouter.get("/messages/:channelId", verifyToken, getMessagePaginatedController);


export default messageRouter;
