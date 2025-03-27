import dotenv from 'dotenv'
import fs from 'fs'

const configEnv = {
  development: '.env.development',
  production: '.env.production',
  test: '.env.test'
}
const envFile = configEnv[process.env.NODE_ENV] || '.env.development'
dotenv.config({ path: envFile })

const Status = Object.keys(configEnv).find(key => configEnv[key] === envFile) || 'production'
const { PORT, DATABASE_URL } = process.env
// Generar el archivo .env dinámico para Prisma
fs.writeFileSync(
  '.env',
    `PORT=${PORT}\nDATABASE_URL=${DATABASE_URL}`
)

export default {
  Port: PORT,
  DatabaseUrl: DATABASE_URL,
  Status
}
