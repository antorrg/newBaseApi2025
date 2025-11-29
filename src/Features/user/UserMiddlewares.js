import bcrypt from 'bcrypt'

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
}
