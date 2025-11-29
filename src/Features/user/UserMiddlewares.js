import bcrypt from 'bcrypt'
import { middError } from '../../Configs/errorHandlers'

export class UserMiddlewares {
  static createUser = async (req, res, next) => {
    const { email, password, picture } = req.body
    const nickname = email.split('@')[0]
    const hashedPassword = await bcrypt.hash(password, 12)
    req.body = {
      email,
      password: hashedPassword,
      nickname,
      picture
    }
    next()
  }

  static restrictProfile = (req, res, next) => {
    const { UserId } = req.UserInfo
    const { id } = req.params
    if (id !== UserId) { middError('Only owner can updated his profile', 400) }
    next()
  }

  static resetPassword = async (req, res, next) => {
    const passwordGenerated = generatePassword(10)
    const hashedPass = await bcrypt.hash(passwordGenerated, 12)
    req.body.password = hashedPass
    req.body.newPassword = passwordGenerated
    next()
  }
}
export function generatePassword (length = 12) {
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  // const symbols = '!@#$%^&*()-_=+[]{};:,.<>/?'

  const all = lower + digits + upper// + symbols

  let password = ''

  // 1. Garantizar al menos una mayúscula
  password += upper[crypto.randomInt(upper.length)]

  // 2. Completar el resto hasta el largo deseado
  for (let i = 1; i < length; i++) {
    password += all[crypto.randomInt(all.length)]
  }

  // 3. Mezclar el resultado para que la mayúscula no quede siempre al principio
  return password
    .split('')
    .sort(() => crypto.randomInt(2) - 1)
    .join('')
}
