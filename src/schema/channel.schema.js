import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is required']
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: [true, 'Workspace id is required']
    }
  },
  { timestamps: true }
)

const ChannelModel = mongoose.model('Channel', channelSchema)

export default ChannelModel
