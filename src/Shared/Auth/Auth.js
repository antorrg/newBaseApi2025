import pkg from 'jsonwebtoken'
import crypto from 'crypto'
import eh from '../../Configs/errorHandlers.js'
import envConfig from '../../Configs/envConfig.js'
import logger from '../../Configs/logger.js'

export class Auth {
  static token (user, expiresIn) {
    const intData = disguiseRole(Auth.#convertRole(user.role), 5)
    const jwtExpiresIn = expiresIn ?? (isNaN(Number(envConfig.ExpiresIn)) ? envConfig.ExpiresIn : Math.ceil(Number(envConfig.ExpiresIn) * 60 * 60))
    const secret = envConfig.Secret
    return pkg.sign(
      { userId: user.id, email: user.email, internalData: intData },
      secret,
      { expiresIn: jwtExpiresIn }
    )
  }

  static refreshToken = async (user, expiresIn) => {
    const secret = envConfig.Secret
    const jwtExpiresIn = expiresIn ?? '7d' // Default 7 days
    const token = pkg.sign(
      { UserId: user.id, type: 'refresh' },
      secret,
      { expiresIn: jwtExpiresIn }
    )

    // Calculate expiry date
    const decoded = pkg.decode(token)
    const expiresAt = new Date(decoded.exp * 1000)

    return {
      token,
      UserId: user.id,
      expiresAt
    }
  }

  static async verifyToken (req, res, next) {
    try {
      let token = req.headers['x-access-token'] || req.headers.authorization
      if (!token) {
        next(eh.middError('Unauthorized access. Token not provided', 401)); return
      }
      if (token.startsWith('Bearer')) {
        token = token.slice(6).trim()
      }
      if (token === '' || token === 'null' || token === 'undefined') {
        next(eh.middError('Missing token!', 401)); return
      }

      const decoded = pkg.verify(token, envConfig.Secret)

      // req.user = decoded
      const UserId = decoded.userId
      const UserRole = recoveryRole(decoded.internalData, 5)
      req.userInfo = { UserId, UserRole }

      next()
    } catch (err) {
      console.error(err, 'por que esto?')
      if (err.name === 'TokenExpiredError') {
        next(eh.middError('Expired token', 401)); return
      }
      next(eh.middError('Invalid token', 401))
    }
  }

  static verifyRefresh = (verifyService) => {
    return async (req, res, next) => {
      let token = req.cookies?.refreshToken
      if (!token && req.headers.cookie) {
        const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
          const [name, value] = cookie.trim().split('=')
          acc[name] = value
          return acc
        }, {})
        token = cookies.refreshToken
      }

      if (!token) {
        next(eh.middError('Refresh token missing', 401)); return
      }

      try {
        const decoded = pkg.verify(token, envConfig.Secret)
        if (decoded.type !== 'refresh') {
          next(eh.middError('Invalid token type', 401)); return
        }
        const storedToken = await verifyService(token, decoded.UserId)
        if (!storedToken) {
          next(eh.middError('Refresh token not found', 401)); return
        }
        if (storedToken.revoked === true) {
          next(eh.middError('Refresh token revoked', 401)); return
        }

        req.userInfo = { UserId: decoded.UserId }
        next()
      } catch (error) {
        console.log('Verify Refresh Error:', error)
        next(eh.middError('Invalid or expired refresh token', 401))
      }
    }
  }

  static checkRole = (allowedRoles) => {
    return (req, res, next) => {
      const { UserRole } = req.userInfo || {}
      if (typeof UserRole === 'number' && allowedRoles.includes(UserRole)) {
        next()
      } else {
        next(eh.middError('Access forbidden!', 403))
      }
    }
  }

  static Roles = Object.freeze({
    SuperAdmin: 9,
    Admin: 3,
    User: 1
  })

  static #convertRole (p) {
    if (typeof p === 'number') {
      return Object.keys(Auth.Roles).find(
        k => Auth.Roles[k] === p
      )?.toString() ?? 'User'
    }

    const key = p.trim()
    return Number(Auth.Roles[key]) ?? Number(Auth.Roles.User)
  }
}

// Funciones auxiliares (pueden ir fuera de la clase)
function disguiseRole (role, position) {
  const generateSecret = () => crypto.randomBytes(10).toString('hex')
  const str = generateSecret()
  if (position < 0 || position >= str.length) throw new Error('Posición fuera de los límites de la cadena')
  const replacementStr = role.toString()
  return str.slice(0, position) + replacementStr + str.slice(position + 1)
}

function recoveryRole (str, position) {
  if (position < 0 || position >= str.length) throw new Error('Posición fuera de los límites de la cadena')
  const recover = str.charAt(position)
  return parseInt(recover)
}
