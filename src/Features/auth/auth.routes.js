import express from 'express'
import { Validator } from 'req-valid-express'
import { RefreshToken } from '../../Configs/database.js'
import { TokenRepository } from './TokenRepository.js'
import { AuthService } from './AuthService.js'
import { userRepository } from '../user/user.routes.js'
import { AuthController } from './AuthController.js'
import { parser } from './auth.helpers.js'
import { Auth } from '../../Shared/Auth/Auth.js'
import { jwtAuth0Check } from './auth0App.js'
import * as sch from './authSchema.js'

const tokenRepository = new TokenRepository(RefreshToken, parser)

const authService = new AuthService(tokenRepository, userRepository)

const authController = new AuthController(authService)
const password = /^(?=.*[A-Z]).{8,}$/
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const authRouter = express.Router()

authRouter.post(
  '/login',
  Validator.validateBody(sch.login),
  Validator.validateRegex(email, 'email'),
  Validator.validateRegex(password, 'password', 'It must be at least 8 characters long and one uppercase letter'),
  authController.login
)

authRouter.post(
  '/auth0-login',
  jwtAuth0Check,
  Validator.validateBody(sch.auth0Body),
  authController.auth0Login
)

authRouter.get(
  '/verify',
  Auth.verifyRefresh(authService.verifyService),
  authController.refresh
)

authRouter.get(
  '/logout',
  Auth.verifyToken,
  authController.logout
)

export default authRouter
