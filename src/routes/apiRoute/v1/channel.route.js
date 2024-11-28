import { Router } from "express";

import { getChannelByIdController } from "../../../controllers/channel.controller.js";
import verifyToken from "../../../middlewares/authMiddleware.js";
const channelRouter = Router();

channelRouter.get("/:channelId", verifyToken, getChannelByIdController);

export default channelRouter;