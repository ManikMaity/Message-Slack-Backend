import MessageModel from '../schema/message.schema.js'
import crudRepo from './crudRepo.js'

const messageRepo = {
  ...crudRepo(MessageModel),
  getMessagePaginated: async function (messageParams, page = 1, limit = 10) {
    const messages = await MessageModel.find(messageParams)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit).populate('senderId', 'username email avatar');

    return messages
  }
}

export default messageRepo
