import dotenv from 'dotenv'

const configEnv = {
  development: '.env.development',
  production: '.env.production',
  test: '.env.test'
}
const envFile = configEnv[process.env.NODE_ENV] || '.env.development'
dotenv.config({ path: envFile })

const { PORT, DATABASE_URL, JWT_EXPIRES_IN, JWT_SECRET, USER_IMG, AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL, } = process.env

export default {
  Port: PORT,
  DatabaseUrl: DATABASE_URL,
  Status: process.env.NODE_ENV,
  ExpiresIn: JWT_EXPIRES_IN,
  ExpiresAt: JWT_REFRESH_EXPIRES_AT,
  Secret: JWT_SECRET || 'test_secret',
  UserImg: USER_IMG,
  Auth0Audience: AUTH0_AUDIENCE, 
  Auth0IssuerBaseUrl: AUTH0_ISSUER_BASE_URL,
}
