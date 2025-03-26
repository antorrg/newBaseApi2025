import env from '../src/Configs/envConfig.js'
import * as db from '../src/Configs/database.js'

describe('Iniciando tests, probando variables de entorno del archivo "envConfig.js" y existencia de tablas en DB.', () => {
  afterAll(() => {
    console.log('Finalizando todas las pruebas...')
  })

  it('Deberia retornar el estado y la variable de base de datos correcta', () => {
    const formatEnvInfo = `Servidor corriendo en: ${env.Status}\n` +
                   `Base de datos de testing: ${env.DatabaseUrl}`
    expect(formatEnvInfo).toBe('Servidor corriendo en: test\n' +
        'Base de datos de testing: postgres://postgres:antonio@localhost:5432/testing')
  })

  it('Debería verificar la existencia de tablas en la base de datos', async () => {
    const result = await db.sequelize.query(`
            SELECT tablename 
            FROM pg_catalog.pg_tables 
            WHERE schemaname = 'public';
        `, { type: db.sequelize.QueryTypes.SELECT })

    const tableNames = result.map(row => row.tablename)

    const expectedTables = [
      'Users', 'Products', 'ProductVariants', 'Attributes',
      'Ratings', 'Companies', 'Sales', 'Trademarks', 'Landings'
    ]

    expectedTables.forEach(table => {
      expect(tableNames).toContain(table)
    })
  })
  it('Debería hacer una consulta básica en cada tabla sin errores', async () => {
    const models = ['User', 'Product', 'ProductVariant', 'Attributes', 'Rating', 'Company', 'Sales', 'Trademark', 'Landing']

    for (const model of models) {
      const records = await db[model].findAll()
      expect(Array.isArray(records)).toBe(true)
    }
  })
})
describe('Probando la estructura de las tablas en la base de datos', () => {
  const tables = {
    Products: ['id', 'name', 'description', 'images', 'released', 'enable', 'deletedAt'],
    Users: ['id', 'email', 'sub', 'password', 'nickname', 'name', 'given_name', 'family_name', 'picture', 'role', 'country', 'createdAt', 'updatedAt'],
    Trademarks: ['id', 'name', 'metaTitle', 'metaDescription', 'metaKeywords', 'ogImage', 'twitterCard', 'logo', 'officialWebsite', 'socialMedia', 'brandStory', 'enable', 'deletedAt'],
    ProductVariants: ['id', 'order', 'characteristics', 'images', 'size', 'color', 'price', 'stock', 'enable', 'deletedAt'],
    Attributes: ['id', 'name', 'type', 'enable', 'deletedAt'],
    Ratings: ['id', 'comment', 'score', 'deletedAt', 'createdAt', 'updatedAt', 'ProductVariantId', 'UserId'],
    Companies: ['id', 'name', 'picture', 'email', 'web_site', 'country', 'enable', 'deletedAt'],
    Sales: ['id', 'name', 'description', 'value', 'quantity', 'total', 'enable', 'deletedAt'],
    Landings: ['id', 'name', 'title', 'description', 'images', 'metaTitle', 'metaDescription', 'metaKeywords', 'logo', 'enable', 'deletedAt']
  }

  Object.entries(tables).forEach(([tableName, expectedColumns]) => {
    it(`${tableName} debería tener las columnas correctas`, async () => {
      const result = await db.sequelize.query(`
                SELECT column_name FROM information_schema.columns 
                WHERE table_name = '${tableName}'
            `, { type: db.sequelize.QueryTypes.SELECT })

      const columns = result.map(row => row.column_name)

      expectedColumns.forEach(col => {
        expect(columns).toContain(col)
      })
    })
  })
})
describe('Probando relaciones entre tablas en la base de datos', () => {
  const expectedRelations = {
    trademark_product: [{ column: 'ProductId', references: 'Products(id)' }],
    trademark_product: [{ column: 'TrademarkId', references: 'Trademarks(id)' }],
    ProductVariants: [{ column: 'ProductId', references: 'Products(id)' }],
    Ratings: [{ column: 'ProductVariantId', references: 'ProductVariants(id)' }],
    Ratings: [{ column: 'UserId', references: 'Users(id)' }],
    ProductAttributes: [{ column: 'ProductId', references: 'Products(id)' }],
    ProductAttributes: [{ column: 'AttributeId', references: 'Attributes(id)' }]

    // Agrega más relaciones según tu modelo de datos
  }

  Object.entries(expectedRelations).forEach(([table, relations]) => {
    it(`La tabla ${table} debería tener las relaciones correctas`, async () => {
      const result = await db.sequelize.query(`
                SELECT 
                    kcu.column_name AS columna_origen, 
                    ccu.table_name AS tabla_referenciada, 
                    ccu.column_name AS columna_referenciada
                FROM 
                    information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                        ON tc.constraint_name = kcu.constraint_name
                    JOIN information_schema.constraint_column_usage AS ccu
                        ON ccu.constraint_name = tc.constraint_name
                WHERE 
                    tc.constraint_type = 'FOREIGN KEY' 
                    AND tc.table_name = '${table}';
            `, { type: db.sequelize.QueryTypes.SELECT })

      const fkMap = result.map(row => `${row.columna_origen}->${row.tabla_referenciada}(${row.columna_referenciada})`)

      relations.forEach(({ column, references }) => {
        expect(fkMap).toContain(`${column}->${references}`)
      })
    })
  })
})
describe('Probando campos en tablas intermedias', () => {
  it('La tabla ProductAttributes debería tener la columna type con ENUM correcto', async () => {
    const result = await db.sequelize.query(`
            SELECT column_name, data_type, udt_name
            FROM information_schema.columns
            WHERE table_name = 'ProductAttributes' AND column_name = 'type';
        `, { type: db.sequelize.QueryTypes.SELECT })

    expect(result.length).toBe(1) // Debe existir una sola columna 'type'
    expect(result[0].udt_name).toBe('enum_ProductAttributes_type') // Nombre interno del ENUM en PostgreSQL
  })
})
