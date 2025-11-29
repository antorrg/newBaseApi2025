import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import session from 'supertest'
import app from '../../src/app.js'
import logger from '../../src/Configs/logger.js'
import { User, startApp, closeDatabase } from '../../src/Configs/database.js'
import * as store from '../testHelpers/testStore.help.js'
import { users } from '../testHelpers/User-helpers/users.js'
const agent = session(app)

describe('User, Integration test', () => {
  beforeAll(async () => {
    await startApp(true, true)
  })
  describe('Route "/api/v1/user/create" POST', () => {
    it('should create one user', async () => {
      const data = {
        email: 'usuario@gmail.com',
        password: 'L1234567',
        picture: 'https://picture.com'
      }
      const test = await agent
        .post('/api/v1/user/create')
        .send(data)
        .expect(201)
      expect(test.body.success).toBe(true)
      expect(test.body.message).toBe('User usuario@gmail.com created successfully')
      expect(test.body.results).toEqual({
        id: expect.any(String),
        email: 'usuario@gmail.com',
        nickname: 'usuario',
        given_name: null,
        role: 'User',
        picture: 'https://picture.com',
        country: null,
        email_verify: false,
        enabled: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deletedAt: null
      })
      store.setStringId(test.body.results.id)
    })
  })
  describe('Route "/api/v1/user/"GET', () => {
    it('should retrieve an array of users "getAll"', async () => {
      const response = await agent
        .get('/api/v1/user')
        .expect(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe('Users found successfully')
      expect(response.body.results).toEqual([
        {
          id: expect.any(String),
          email: 'usuario@gmail.com',
          nickname: 'usuario',
          given_name: null,
          role: 'User',
          picture: 'https://picture.com',
          country: null,
          email_verify: false,
          enabled: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          deletedAt: null
        }
      ])
    })
    it('should retrieve an array of users "getWithPagination" by filter', async () => {
      const usersCreated = await User.bulkCreate(users)
      logger.info(`Users created: ${usersCreated.length}`)
      const response = await agent
        .get('/api/v1/user/pages?page=1&limit=4&searchField=email&search=Sincere@april.biz&sortBy=email&order=asc')
        .expect(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe('Users found successfully')
      expect(response.body.results.info).toEqual({ total: 1, page: 1, totalPages: 1 })
      expect(response.body.results.data.length).toBe(1)
      expect(response.body.results.data).toEqual([
        {
          id: expect.any(String),
          email: 'Sincere@april.biz',
          nickname: 'Sincere',
          given_name: 'Bret',
          role: 'User',
          picture: 'abs@gmail.com',
          country: '',
          email_verify: true,
          enabled: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          deletedAt: null
        }
      ])
    })
    it('should retrieve an array of users "getWithPagination" without filter', async () => {
      const response = await agent
        .get('/api/v1/user/pages?page=1&limit=10')
        .expect(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe('Users found successfully')
      expect(response.body.results.info).toEqual({ total: 11, page: 1, totalPages: 2 })
      expect(response.body.results.data.length).toBe(10)
    })
    it('should retrieve an user "getById"', async () => {
      const response = await agent
        .get(`/api/v1/user/${store.getStringId()}`)
        .expect(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe('User found successfully')
      expect(response.body.results).toEqual({
        id: expect.any(String),
        email: 'usuario@gmail.com',
        nickname: 'usuario',
        given_name: null,
        role: 'User',
        picture: 'https://picture.com',
        country: null,
        email_verify: false,
        enabled: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deletedAt: null
      })
    })
  })
  describe('Route "/api/v1/user/:id" PUT', () => {
    it('should update an user', async () => {
      const newData = {
        email: 'usuario@gmail.com',
        nickname: 'usuario',
        picture: 'https://picture.com',
        given_name: 'usuario actualizado',
        country: 'nodata',
        enabled: true
      }
      const response = await agent
        .put(`/api/v1/user/${store.getStringId()}`)
        .send(newData)
        .expect(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe('User updated successfully')
      expect(response.body.results).toEqual({
        id: expect.any(String),
        email: 'usuario@gmail.com',
        nickname: 'usuario',
        role: 'User',
        picture: 'https://picture.com',
        given_name: 'usuario actualizado',
        country: 'nodata',
        enabled: true,
        email_verify: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deletedAt: null
      })
    })
    it('should throw an error if parameters are incorrect', async () => {
      const newData = {
        email: 'usuario@gmail.com',
        nickname: 'usuario',
        password: 'L1234567',
        picture: 'https://picture.com',
        given_name: 'usuario actualizado',
        country: '',
        enable: true
      }
      const response = await agent
        .put(`/api/v1/user/${store.getStringId()}`)
        .send(newData)
        .expect(400)
      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe('Missing field: enabled at enabled')
      expect(response.body.results).toBe(null)
    })
  })
  describe('Route "/api/v1/user/create" DELETE', () => {
    it('should delete an user', async () => {
      const response = await agent
        .delete(`/api/v1/user/${store.getStringId()}`)
        .expect(200)
      expect(response.body.success).toBe(true)
      expect(response.body.message).toBe('User deleted successfully')
      expect(response.body.results).toBe('User deleted: usuario@gmail.com')
    })
  })
  afterAll(async () => {
    await closeDatabase()
  })
})
