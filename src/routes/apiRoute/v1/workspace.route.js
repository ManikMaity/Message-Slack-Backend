import { Router } from 'express'

import {
  addMemberToWorkspaceController,
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspaceController,
  getWorkSpaceByJoinCodeController,
  getWorkspaceController,
  removeMemberFromWorkspaceController,
  updateWorkspaceController
} from '../../../controllers/workspace.controller.js'
import verifyToken from '../../../middlewares/authMiddleware.js'
import validate from '../../../validations/validator.js'
import { addMemberSchema, removeMemberSchema, updateWorkspaceSchema, workspaceSchema } from '../../../validations/workspace.validation.js'
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

export default workspaceRouter
