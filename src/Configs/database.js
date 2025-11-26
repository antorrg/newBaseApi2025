import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import env from './envConfig.js'
import logger from './logger.js'


const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DatabaseUrl, // conexión a la DB según el entorno
    },
  },
})

const startApp = async (reset = false) => {
  try {
    await prisma.$connect()

    if (reset === true) {
      // db push usa la URL definida en prisma.config.js (no en schema)
      execSync('npx prisma db push --force-reset', { stdio: 'inherit' })
      logger.info('🧪 Reseteando y conectando Prisma')
    } else {
      logger.info('🧪 Conexión a Postgres establecida con Prisma.')
    }
  } catch (error) {
    logger.error('❌ Error al conectar con Prisma:', error.message)
  }
}

const closeDatabase = async () => {
  try {
    // Delay para esperar operaciones pendientes (tests)
    await new Promise(res => setTimeout(res, 20))
    await prisma.$disconnect()
    logger.info('🛑 Cerrando conexión con la base de datos.')
  } catch (error) {
    logger.error('❌ Error al cerrar la base de datos:', error)
  }
}

export {
  prisma,
  startApp,
  closeDatabase
}
