import mongoose from 'mongoose'

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Workspace name is required'],
      unique: true
    },
    image: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Workspace description is required']
    },
    members: [
      {
        member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member'
        }
      }
    ],
    joinCode: {
      type: String,
      required: [true, 'Join code is required'],
      unique: true
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
      }
    ]
  },
  { timestamps: true }
)

const WorkspaceModel = mongoose.model('Workspace', workspaceSchema)

export default WorkspaceModel
