import { Router } from 'express'

import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  changeWorkspaceJoinCodeController,
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspaceController,
  getWorkSpaceByJoinCodeController,
  getWorkspaceController,
  joinWorkspaceByCodeController,
  removeMemberFromWorkspaceController,
  updateWorkspaceController
} from '../../../controllers/workspace.controller.js'
import verifyToken from '../../../middlewares/authMiddleware.js'
import validate from '../../../validations/validator.js'
import { addChannelSchema, addMemberSchema, removeMemberSchema, updateWorkspaceSchema, workspaceSchema } from '../../../validations/workspace.validation.js'
const workspaceRouter = Router()

workspaceRouter.get('/ping', (req, res) => {
  res.json({ msg: 'Workspace router working' })
})
workspaceRouter.post(
  '/create',
  validate(workspaceSchema),
  verifyToken,
  createWorkspaceController
)
workspaceRouter.get('/', verifyToken, getAllWorkspaceController)
workspaceRouter.delete('/:workspaceId', verifyToken, deleteWorkspaceController)
workspaceRouter.post("/update/:workspaceId", validate(updateWorkspaceSchema), verifyToken, updateWorkspaceController);
workspaceRouter.get("/:workspaceId", verifyToken, getWorkspaceController);
workspaceRouter.get("/code/:joinCode", verifyToken, getWorkSpaceByJoinCodeController);
workspaceRouter.put("/add-member", validate(addMemberSchema), verifyToken, addMemberToWorkspaceController);
workspaceRouter.patch("/remove-member", validate(removeMemberSchema), verifyToken, removeMemberFromWorkspaceController);
workspaceRouter.put("/add-channel", validate(addChannelSchema), verifyToken, addChannelToWorkspaceController);
workspaceRouter.put("/change-joinCode/:workspaceId", verifyToken, changeWorkspaceJoinCodeController)
workspaceRouter.put("/joinByCode/:joinCode", verifyToken, joinWorkspaceByCodeController)

export default workspaceRouter
