import { Router } from 'express'
import verifyToken from '../../../middlewares/authMiddleware.js';
import { isUserPartOfWorkspaceController } from '../../../controllers/member.controller.js';
const memberRouter = Router();


memberRouter.get("/workspace/:workspaceId", verifyToken, isUserPartOfWorkspaceController);


export default memberRouter;