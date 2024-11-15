import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/variables.js'
import userRepo from '../repositories/user.repo.js'
import clientError from '../utils/errors/clientError.js'
import ValidationError from '../utils/validationError.js'

export const signupService = async (username, email, password) => {
  try {
    const user = await userRepo.create({ username, email, password })
    return user
  } catch (err) {
    console.log('user signup error', err)
    if (err.name === 'ValidationError') {
      throw new ValidationError({ error: err.errors }, err.message)
    }
    if (err.code === 11000) {
      throw new ValidationError(
        {
          error: 'A user with this email already exists'
        },
        'A user with this email already exists'
      )
    }
    throw err
  }
}

export const signinService = async (email, password) => {
  try {
    const user = await userRepo.getUserByEmail(email)
    if (!user) {
      throw new clientError({
        message: 'No registered user found with this email',
        explanation: 'User not found',
        statusCode: 404
      })
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new clientError({
        message: 'Invailid password given',
        explanation: "Password does'nt match with the user password"
      })
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET)
    // eslint-disable-next-line no-unused-vars
    const { password: pass, ...userData } = user._doc
    return { user: userData, token }
  } catch (err) {
    console.log(err)
    throw err
  }
}
