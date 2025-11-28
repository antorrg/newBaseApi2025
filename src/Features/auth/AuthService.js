import crypto from 'crypto'
import { Auth } from '../../Shared/Auth/Auth.js'
import { throwError, processError } from '../../Configs/errorHandlers.js'
import env from '../../Configs/envConfig.js'

export class AuthService {
  constructor (tokenRepository, userRepository) {
    this.tokenRepository = tokenRepository
    this.userRepository = userRepository
  }

  #tokenCreater (refreshToken) {
    return {
      tokenHash: crypto.createHash('sha256').update(refreshToken.token).digest('hex'),
      UserId: refreshToken.UserId,
      expiresAt: refreshToken.expiresAt,
      revoked: false
    }
  }

  #tokenMatch (token, hashedToken) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    if (tokenHash === hashedToken) {
      return true
    } else {
      return false
    }
  }

  async #tokenConstructor (dataUser) {
    try {
      const refreshToken = await Auth.refreshToken(dataUser, env.ExpiresAt)
      await this.tokenRepository.create(this.#tokenCreater(refreshToken))
      return {
        token: Auth.token(dataUser, env.ExpiresIn),
        refreshToken: refreshToken.token
      }
    } catch (error) {
      processError(error, 'AuthService.tokenConstructor')
    }
  }

  async auth0Login (data) {
    try {
      const user = await this.userRepository.auth0Login(data)
      const { token, refreshToken } = await this.#tokenConstructor(user)
      return {
        user: user.results,
        token,
        refreshToken
      }
    } catch (error) {
      processError(error, 'AuthService: auth0Login')
    }
  }

  async login (data) {
    try {
      const user = await this.userRepository.login(data)
      const { token, refreshToken } = await this.#tokenConstructor(user)
      return {
        user: user.results,
        token,
        refreshToken
      }
    } catch (error) {
      processError(error, 'AuthService: login')
    }
  }

  verifyService = async (token, userId) => {
    try {
      // Find exact token by ID
      const tokenFound = await this.tokenRepository.getOne({ where: { UserId: userId } })
      if (!tokenFound) {
        // await this.tokenRepository.revokedAll(userId)
        return null
      }
      const tokenValid = this.#tokenMatch(token, tokenFound.tokenHash)
      if (tokenValid === true) {
        return tokenFound
      } else {
        // Token content doesn't match hash - potential tampering
        await this.tokenRepository.revokedAll(userId)
        return null
      }
    } catch (error) {
      await this.tokenRepository.revokedAll(userId)
      processError(error, 'AuthService.verifyService')
    }
  }

  restoreToken = async (userId) => {
    try {
      const userFound = await this.userRepository.getById(userId)
      if (!userFound) { throwError('User not found', 404) }
      await this.tokenRepository.revokedAll(userFound.id)
      const { token, refreshToken } = await this.#tokenConstructor(userFound)
      return { token, refreshToken }
    } catch (error) {
      await this.tokenRepository.revokedAll(userId)
      processError(error, 'AuthService.restoreToken')
    }
  }

  async logout (userId) {
    try {
      await this.tokenRepository.revokedAll(userId)
      return true
    } catch (error) {
      processError(error, 'AuthService.logout')
    }
  }
}
