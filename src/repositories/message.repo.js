import MessageModel from '../schema/message.schema.js'
import crudRepo from './crudRepo.js'

const messageRepo = {
  ...crudRepo(MessageModel),
  getMessagePaginated: async function (messageParams, page = 1, limit = 10) {
    const messages = await MessageModel.find(messageParams)
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit).populate('senderId', 'username email avatar');

    return messages
  },
  getMessageDetail : async function (messageId) {
    const message = await MessageModel.findById(messageId).populate('senderId', 'username email avatar');
    return message
  },
  getMessageWithLikesDetail : async function (messageId) {
    const response = await MessageModel.findById(messageId).populate('likes');
    return response
  }
}

export default messageRepo
