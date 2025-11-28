import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import env from '../../src/Configs/envConfig.js'
import * as db from '../../src/Configs/database.js'
import logger from '../../src/Configs/logger.js'

describe('Iniciando tests, probando variables de entorno del archivo "envConfig.js" y existencia de tablas en DB.', () => {
  beforeAll(async () => {
    await db.startApp(true, true)
  })
  afterAll(async () => {
    await db.closeDatabase()
  })

  it('Deberia retornar el estado y la variable de base de datos correcta', () => {
    const formatEnvInfo = `Servidor corriendo en: ${env.Status}\n` +
                   `Base de datos de testing: ${env.DatabaseUrl}`
    expect(formatEnvInfo).toBe('Servidor corriendo en: test\n' +
        'Base de datos de testing: postgres://postgres:antonio@localhost:5432/vgametest')
  })
  it('deberia hacer un get a las tablas y obtener un arreglo vacio', async () => {
    const models = [
      db.User,
      db.RefreshToken,
      db.Log,
      db.Videogame,
      db.Genre,
      db.Platform,
      db.PurchaseOrder,
      db.PurchaseOrderItems,
      db.Rating,
      db.Cart,
      db.Favorite
    ]
    for (const model of models) {
      const records = await model.findAll()
      expect(Array.isArray(records)).toBe(true)
      expect(records.length).toBe(0)
    }
    logger.info(`Cantidad de tablas testeadas: ${models.length}`)
  })
})
