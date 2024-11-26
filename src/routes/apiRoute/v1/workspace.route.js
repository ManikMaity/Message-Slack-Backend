import { Router } from 'express'

import {
  createWorkspaceController,
  deleteWorkspaceController,
  getAllWorkspaceController
} from '../../../controllers/workspace.controller.js'
import verifyToken from '../../../middlewares/authMiddleware.js'
import validate from '../../../validations/validator.js'
import { workspaceSchema } from '../../../validations/workspace.validation.js'
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

export default workspaceRouter
