import express from 'express'
import { RefreshToken } from '../../Configs/database.js'
import { TokenRepository } from './TokenRepository.js'
import { AuthService } from './AuthService.js'
import { userRepository } from '../user/user.routes.js'
import { AuthController } from './AuthController.js'
import { parser } from './auth.helpers.js'
import { Auth } from '../../Shared/Auth/Auth.js'
import { jwtAuth0Check } from './auth0App.js'

const tokenRepository = new TokenRepository(RefreshToken, parser)

const authService = new AuthService(tokenRepository, userRepository)

const authController = new AuthController(authService)

const authRouter = express.Router()

authRouter.post('/login', authController.login)

authRouter.post('/auth0-login', jwtAuth0Check, authController.auth0Login)

authRouter.get('/verify', Auth.verifyRefresh(authService.verifyService), authController.refresh)

authRouter.get('/logout', Auth.verifyToken, authController.logout)

export default authRouter
