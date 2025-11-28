import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import session from 'supertest'
import bcrypt from 'bcrypt'
import app from '../../src/app.js'
import { User, startApp, closeDatabase } from '../../src/Configs/database.js'
import * as store from '../testHelpers/testStore.help.js'
const agent = session(app)
import { User, sequelize, startApp } from '../../src/Configs/database.js'

describe('AuthFlow', () => {
    let refreshTokenCookie

    beforeAll(async () => {
          let userCredentials = {
        email: `test_user@example.com`,
        password: await bcrypt.hash('password123', 12),
        picture: 'http://example.com/pic.jpg'
    }
       await startApp(true, true)
            const newUser = await User.create({
                ...userCredentials,
            })
        store.setStringId(newUser.id)
    })
    afterAll(async()=>{
        await closeDatabase()
    })
    describe('Login method:', () => {
    it('should login and return access token and refresh token cookie', async () => {
        const data = {email: `test_user@example.com`, password: 'password123'}
        const res = await agent
            .post('/api/v1/auth/login')
            .send(data)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('AUTH_LOGIN_SUCCESS')
        expect(res.body.results.token).toBeDefined()
        expect(res.headers['set-cookie']).toBeDefined()

        store.setUserToken(res.body.results.token)
        // Extract refresh token from cookie
        const cookies = res.headers['set-cookie']
        refreshTokenCookie = cookies.find(c => c.startsWith('refreshToken='))
        expect(refreshTokenCookie).toBeDefined()
        store.setCookie(cookies)
    })})
    describe('Refresh token method:', () => {
    it('should refresh token using the cookie', async () => {
        const res = await agent
            .get('/api/v1/auth/verify') // This maps to refresh controller
            .set('Cookie', store.getCookie()) 
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('AUTH_TOKEN_REFRESHED')
        expect(res.body.token).toBeDefined() 
        store.setUserToken(res.body.token)
        expect(res.headers['set-cookie']).toBeDefined()

        // Update cookie for next step
        const cookies = res.headers['set-cookie']
        const newRefreshTokenCookie = cookies.find(c => c.startsWith('refreshToken='))
        expect(newRefreshTokenCookie).toBeDefined()
        expect(newRefreshTokenCookie).not.toBe(store.getCookie()) // Should be rotated
    })

    it('should fail to refresh with the old (rotated) cookie', async () => {
        const res = await agent
            .get('/api/v1/auth/verify')
            .set('Cookie', [store.getCookie()]) // Using the OLD cookie
        expect(res.status).toBe(401)
        expect(res.body.message).toBe('Refresh token revoked')
    })})
    describe('Logout method:', () => {
      it('should revoke the active refresh token ', async() => {
        const data = {email: `test_user@example.com`, password: 'password123'}
        const newSession = await agent
            .post('/api/v1/auth/login')
            .send(data)
        store.setUserToken(newSession.body.results.token)
        //Es necesario hacer logout inmediatamente
        const res = await agent
          .get('/api/v1/auth/logout')
          .set('Authorization', `Bearer ${store.getUserToken()}`)
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('AUTH_LOGOUT_SUCCESS')
      })
      
    })
    
})
