import { Router } from 'express'

import { isUserPartOfWorkspaceController } from '../../../controllers/member.controller.js';
import verifyToken from '../../../middlewares/authMiddleware.js';
const memberRouter = Router();


memberRouter.get("/workspace/:workspaceId", verifyToken, isUserPartOfWorkspaceController);


export default memberRouter;