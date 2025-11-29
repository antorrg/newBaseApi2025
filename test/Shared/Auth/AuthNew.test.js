import { describe, it, expect, vi, beforeEach } from 'vitest'
import express from 'express'
import session from 'supertest'
import crypto from 'crypto'
import { Auth } from '../../../src/Shared/Auth/Auth.js'
import eh from '../../../src/Configs/errorHandlers.js'

// Mock verifyService function that simulates AuthService.verifyService
const mockVerifyService = vi.fn()

// Setup simple server for testing middlewares
const app = express()
app.use(express.json())

app.post('/verify', Auth.verifyToken, (req, res) => {
  res.status(200).json({ success: true, message: 'Passed middleware', userInfo: req.userInfo })
})

app.post('/refresh', Auth.verifyRefresh(mockVerifyService), (req, res) => {
  res.status(200).json({ success: true, message: 'Passed middleware', userInfo: req.userInfo })
})

app.use((err, req, res, next) => {
  eh.errorEndWare(err, req, res, next)
})

const agent = session(app)

describe('Auth Class (New)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('token', () => {
    it('should generate a valid JWT', () => {
      const user = { id: '123', email: 'test@test.com', role: 'User' }
      const token = Auth.token(user)
      expect(typeof token).toBe('string')
      expect(token.split('.').length).toBe(3)
    })

    it('should generate a token with correct numeric role', () => {
      const user = { id: '123', email: 'test@test.com', role: 1 }
      const token = Auth.token(user)
      expect(typeof token).toBe('string')
      expect(token.split('.').length).toBe(3)
    })
  })

  describe('refreshToken', () => {
    it('should generate a refresh token object with token, UserId and expiresAt', async () => {
      const user = { id: '123' }

      const result = await Auth.refreshToken(user)

      expect(typeof result).toBe('object')
      expect(typeof result.token).toBe('string')
      expect(result.token.split('.').length).toBe(3)
      expect(result.UserId).toBe('123')
      expect(result.expiresAt).toBeInstanceOf(Date)
    })

    it('should generate a refresh token with custom expiresIn', async () => {
      const user = { id: '456' }
      const expiresIn = '1d'

      const result = await Auth.refreshToken(user, expiresIn)

      expect(result.UserId).toBe('456')
      expect(typeof result.token).toBe('string')
    })
  })

  describe('verifyToken', () => {
    it('should verify a valid access token', async () => {
      const user = { id: '123', email: 'test@test.com', role: 'User' }
      const token = Auth.token(user)

      const res = await agent
        .post('/verify')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.userInfo.UserId).toBe('123')
      expect(res.body.userInfo.UserRole).toBe(1) // User role
    })

    it('should fail with invalid token', async () => {
      const res = await agent
        .post('/verify')
        .set('Authorization', 'Bearer invalid')

      expect(res.status).toBe(401)
    })

    it('should fail without authorization header', async () => {
      const res = await agent.post('/verify')

      expect(res.status).toBe(401)
    })
  })

  describe('verifyRefresh', () => {
    it('should verify a valid refresh token from cookies', async () => {
      const user = { id: '123' }
      const refreshTokenData = await Auth.refreshToken(user)
      const tokenHash = crypto.createHash('sha256').update(refreshTokenData.token).digest('hex')

      // Mock verifyService to return valid token data
      mockVerifyService.mockResolvedValue({
        tokenHash,
        UserId: '123',
        revoked: false,
        expiresAt: refreshTokenData.expiresAt
      })

      const res = await agent
        .post('/refresh')
        .set('Cookie', [`refreshToken=${refreshTokenData.token}`])

      expect(res.status).toBe(200)
      expect(res.body.userInfo.UserId).toBe('123')
      expect(mockVerifyService).toHaveBeenCalledWith(refreshTokenData.token, '123')
    })

    it('should reject if refresh token not provided', async () => {
      const res = await agent.post('/refresh')

      expect(res.status).toBe(401)
      expect(res.body.message).toContain('Refresh token missing')
    })

    it('should reject if token not in DB', async () => {
      const user = { id: '123' }
      const refreshTokenData = await Auth.refreshToken(user)

      // Mock verifyService to return null (token not found)
      mockVerifyService.mockResolvedValue(null)

      const res = await agent
        .post('/refresh')
        .set('Cookie', [`refreshToken=${refreshTokenData.token}`])

      expect(res.status).toBe(401)
      expect(res.body.message).toContain('Refresh token not found')
    })

    it('should reject if token is revoked', async () => {
      const user = { id: '123' }
      const refreshTokenData = await Auth.refreshToken(user)
      const tokenHash = crypto.createHash('sha256').update(refreshTokenData.token).digest('hex')

      // Mock verifyService to return revoked token
      mockVerifyService.mockResolvedValue({
        tokenHash,
        UserId: '123',
        revoked: true,
        expiresAt: refreshTokenData.expiresAt
      })

      const res = await agent
        .post('/refresh')
        .set('Cookie', [`refreshToken=${refreshTokenData.token}`])

      expect(res.status).toBe(401)
      expect(res.body.message).toContain('Refresh token revoked')
    })

    it('should reject with invalid token type', async () => {
      const user = { id: '123', email: 'test@test.com', role: 'User' }
      // Use regular token instead of refresh token
      const regularToken = Auth.token(user)

      const res = await agent
        .post('/refresh')
        .set('Cookie', [`refreshToken=${regularToken}`])

      expect(res.status).toBe(401)
      expect(res.body.message).toContain('Invalid token type')
    })
  })

  describe('checkRole', () => {
    it('should allow access for user with correct role', async () => {
      const testApp = express()
      testApp.use(express.json())

      testApp.post('/admin',
        Auth.verifyToken,
        Auth.checkRole([Auth.Roles.Admin, Auth.Roles.SuperAdmin]),
        (req, res) => {
          res.status(200).json({ success: true })
        }
      )

      testApp.use((err, req, res, next) => {
        eh.errorEndWare(err, req, res, next)
      })

      const user = { id: '123', email: 'admin@test.com', role: 'Admin' } // Admin role
      const token = Auth.token(user)

      const res = await session(testApp)
        .post('/admin')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
    })

    it('should deny access for user without correct role', async () => {
      const testApp = express()
      testApp.use(express.json())

      testApp.post('/admin',
        Auth.verifyToken,
        Auth.checkRole([Auth.Roles.Admin, Auth.Roles.SuperAdmin]),
        (req, res) => {
          res.status(200).json({ success: true })
        }
      )

      testApp.use((err, req, res, next) => {
        eh.errorEndWare(err, req, res, next)
      })

      const user = { id: '123', email: 'user@test.com', role: 'User' } // User role
      const token = Auth.token(user)

      const res = await session(testApp)
        .post('/admin')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(403)
      expect(res.body.message).toContain('Access forbidden')
    })
  })

  describe('Roles', () => {
    it('should have correct role values', () => {
      expect(Auth.Roles.SuperAdmin).toBe(9)
      expect(Auth.Roles.Admin).toBe(3)
      expect(Auth.Roles.User).toBe(1)
    })

    it('should be frozen (immutable)', () => {
      // Object.freeze() throws in strict mode, so we just verify it's frozen
      expect(Object.isFrozen(Auth.Roles)).toBe(true)
      // Attempting to add property should fail silently or throw
      const before = { ...Auth.Roles }
      try {
        Auth.Roles.NewRole = 5
      } catch (e) {
        // Expected in strict mode
      }
      expect(Auth.Roles.NewRole).toBeUndefined()
      expect(Auth.Roles.SuperAdmin).toBe(before.SuperAdmin)
    })
  })
})
