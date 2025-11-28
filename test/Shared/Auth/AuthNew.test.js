import { describe, it, expect, vi, beforeEach } from 'vitest'
import session from 'supertest'
import { Auth } from '../../../src/Shared/Auth/Auth.js'
import eh from '../../../src/Configs/errorHandlers.js'

// Mock RefreshToken model
const { mockCreate, mockFindOne } = vi.hoisted(() => {
  return {
    mockCreate: vi.fn(),
    mockFindOne: vi.fn()
  }
})

vi.mock('../../Configs/database.js', () => {
  return {
    RefreshToken: {
      create: mockCreate,
      findOne: mockFindOne
    }
  }
})

// Setup simple server for testing middlewares
const app = express()
app.use(express.json())

app.post('/verify', Auth.verify, (req, res) => {
  res.status(200).json({ success: true, message: 'Passed middleware', userInfo: req.userInfo })
})

app.post('/refresh', Auth.verifyRefresh, (req, res) => {
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
  })

  describe('refreshToken', () => {
    it('should generate a refresh token and save it to DB', async () => {
      const user = { id: '123' }
      mockCreate.mockResolvedValue({ token: 'abc', UserId: '123' })

      const token = await Auth.refreshToken(user)

      expect(typeof token).toBe('string')
      expect(mockCreate).toHaveBeenCalled()
      const createArgs = mockCreate.mock.calls[0][0]
      expect(createArgs.UserId).toBe('123')
      expect(createArgs.token).toBe(token)
    })
  })

  describe('verify', () => {
    it('should verify a valid access token', async () => {
      const user = { id: '123', email: 'test@test.com', role: 'User' }
      const token = Auth.token(user)

      const res = await agent
        .post('/verify')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.userInfo.userId).toBe('123')
    })

    it('should fail with invalid token', async () => {
      const res = await agent
        .post('/verify')
        .set('Authorization', 'Bearer invalid')

      expect(res.status).toBe(401)
    })
  })

  describe('verifyRefresh', () => {
    it('should verify a valid refresh token', async () => {
      const user = { id: '123' }
      // Generate a real token so verify works
      const token = await Auth.refreshToken(user)

      // Mock DB finding the token
      mockFindOne.mockResolvedValue({ token, UserId: '123', revoked: false })

      const res = await agent
        .post('/refresh')
        .send({ refreshToken: token })

      expect(res.status).toBe(200)
      expect(res.body.userInfo.userId).toBe('123')
      expect(mockFindOne).toHaveBeenCalled()
    })

    it('should reject if token not in DB', async () => {
      const user = { id: '123' }
      const token = await Auth.refreshToken(user)

      mockFindOne.mockResolvedValue(null)

      const res = await agent
        .post('/refresh')
        .send({ refreshToken: token })

      expect(res.status).toBe(401)
      expect(res.body.message).toContain('Refresh token not found')
    })

    it('should reject if token is revoked', async () => {
      const user = { id: '123' }
      const token = await Auth.refreshToken(user)

      mockFindOne.mockResolvedValue({ token, UserId: '123', revoked: true })

      const res = await agent
        .post('/refresh')
        .send({ refreshToken: token })

      expect(res.status).toBe(401)
      expect(res.body.message).toContain('Refresh token revoked')
    })
  })
})
