import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is required']
    }
  },
  { timestamps: true }
);

const ChannelModel = mongoose.model('Channel', channelSchema)

export default ChannelModel;
