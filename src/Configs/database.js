import { Sequelize } from 'sequelize'
import models from '../../models/index.js'
import logger from './logger.js'
import env from './envConfig.js'

const sequelize = new Sequelize(env.DatabaseUrl, {
  dialect: 'postgres',
  logging: false,
  native: false
})

Object.values(models).forEach((model) => model(sequelize))

const {
  User,
  RefreshToken,
  Log,
  Videogame,
  Genre,
  Platform,
  PurchaseOrder,
  PurchaseOrderItems,
  Rating,
  Cart,
  Favorite
} = sequelize.models

// Relations here:

// -------------------------------------------------------------
const startApp = async (synced = false, forced = false) => {
  try {
    await sequelize.authenticate()
    if (synced === true) {
      await sequelize.sync({ force: forced })
      logger.info(`✔️  Database synced successfully!!\n Force: ${forced}`)
    }
    logger.info('🟢 Connection to Postgres established with Sequelize')
  } catch (error) {
    logger.fatal('❌ Error connecting to Sequelize:', error.message)
  }
}

const closeDatabase = async () => {
  try {
    await new Promise(res => setTimeout(res, 20))
    await sequelize.close()
    logger.info('🛑 Closing connection to database.')
  } catch (error) {
    logger.error('❌ Error closing database:', error)
  }
}

export {
  User,
  RefreshToken,
  Log,
  Videogame,
  Genre,
  Platform,
  PurchaseOrder,
  PurchaseOrderItems,
  Rating,
  Cart,
  Favorite,
  sequelize,
  startApp,
  closeDatabase
}
