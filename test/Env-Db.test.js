import env from '../src/Configs/envConfig.js'
import { prisma } from '../src/Configs/database.js'

describe('Iniciando tests, probando variables de entorno del archivo "envConfig.js" y existencia de tablas en DB.', () => {
  afterAll(() => {
    console.log('Finalizando todas las pruebas...')
  })

  it('Deberia retornar el estado y la variable de base de datos correcta', () => {
    const formatEnvInfo = `Servidor corriendo en: ${env.Status}\n` +
                   `Base de datos de testing: ${env.DatabaseUrl}`
    expect(formatEnvInfo).toBe('Servidor corriendo en: test\n' +
        'Base de datos de testing: postgresql://postgres:antonio@localhost:5432/testing')
  })
  it('deberia hacer un get a las tablas y obtener un arreglo vacio', async () => {
    const models = [
      prisma.videogame,
      prisma.genre,
      prisma.platform,
      prisma.user,
      prisma.favorite,
      prisma.cart,
      prisma.purchaseOrder,
      prisma.purchaseOrderItem,
      prisma.rating,
      prisma.owner,
      prisma.landing,
      prisma.product,
      prisma.item,
      prisma.media
    ]
    for (const model of models) {
      const records = await model.findMany()
      expect(Array.isArray(records)).toBe(true)
      expect(records.length).toBe(0)
    }
  })
})
