import { StatusCodes } from 'http-status-codes'

import UserModel from '../schema/user.schema.js'
import crudRepo from './crudRepo.js'

export const getUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email })
    return user
  } catch (error) {
    console.log(error)
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'User not found'
    }
  }
}

export const getUserByUsername = async (username) => {
  try {
    const user = await UserModel.findOne({ username })
    return user
  } catch (error) {
    console.log('getUserByUsername', error)
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'User not found'
    }
  }
}

const userRepo = {
  ...crudRepo(UserModel),
  getUserByEmail,
  getUserByUsername
}

export default userRepo;