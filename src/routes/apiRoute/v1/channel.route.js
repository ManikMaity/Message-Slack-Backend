import { Router } from "express";

import { deleteChannelController, getChannelByIdController, updateChannelController } from "../../../controllers/channel.controller.js";
import verifyToken from "../../../middlewares/authMiddleware.js";
import validate from "../../../validations/validator.js";
import { updateWorkspaceSchema } from "../../../validations/workspace.validation.js";
const channelRouter = Router();

channelRouter.get("/:channelId", verifyToken, getChannelByIdController);
channelRouter.delete("/:channelId", verifyToken, deleteChannelController);
channelRouter.post("/:channelId", validate(updateWorkspaceSchema), verifyToken, updateChannelController);

export default channelRouter;