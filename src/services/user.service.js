import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/variables.js'
import userRepo from '../repositories/user.repo.js'

export const signupService = async (username, email, password) => {
  const user = await userRepo.create({ username, email, password })
  return user
}

export const signinService = async (email, password) => {
  const user = await userRepo.getUserByEmail(email)
  if (!user) {
    throw {
      statusCode: StatusCodes.NOT_FOUND,
      message: 'User not found check email'
    }
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'Invalid password'
    }
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET)
  return { user, token }
}
