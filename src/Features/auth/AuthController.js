import { BaseController } from '../../Shared/Controllers/BaseController.js'
import envConfig from '../../Configs/envConfig.js'

export class AuthController extends BaseController {
  constructor (service) {
    super(service)
  }

  auth0Login = async (req, res) => {
    const data = req.body
    const user = req.auth
    console.log('data', data)
    console.log('auth:', user)
  }

  login = async (req, res) => {
    const data = req.body
    const { user, token, refreshToken } = await this.service.login(data)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    BaseController.responder(res, 200, true, 'AUTH_LOGIN_SUCCESS', { user, token })
  }

  refresh = async (req, res) => {
    const { UserId } = req.userInfo
    const { token, refreshToken } = await this.service.restoreToken(UserId)
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    res.status(200).json({ success: true, message: 'AUTH_TOKEN_REFRESHED', token })
  }

  logout = async (req, res) => {
    const { UserId } = req.userInfo
    console.log(UserId)
    await this.service.logout(UserId)
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: envConfig.Status === 'production',
      sameSite: 'strict',
      path: '/refresh'
    })
    BaseController.responder(res, 200, true, 'AUTH_LOGOUT_SUCCESS', null)
  }
}
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: envConfig.Status === 'production',
  sameSite: 'strict',
  path: '/refresh',
  maxAge: 7 * 24 * 60 * 60 * 1000
}
