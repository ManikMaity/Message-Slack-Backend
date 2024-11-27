import { Router } from 'express'

import {
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspaceController,
  updateWorkspaceController
} from '../../../controllers/workspace.controller.js'
import verifyToken from '../../../middlewares/authMiddleware.js'
import validate from '../../../validations/validator.js'
import { updateWorkspaceSchema, workspaceSchema } from '../../../validations/workspace.validation.js'
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

export default workspaceRouter
