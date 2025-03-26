import { Trademark, Attributes } from '../../src/Configs/database.js'
import GeneralRepository from '../../src/Repositories/GeneralRepository.js'
import ProductRepository from '../../src/Repositories/ProductRepository.js'
import * as functss from './helpers/dataProducts.js'
import * as data from './helpers/storeCreareProd.js'
import * as store from '../helperTest/testStore.js'

const trademark = new GeneralRepository(Trademark)

const attributes = new GeneralRepository(Attributes)

const test = new ProductRepository()

describe('Pruebas Metodo createProduct', () => {
  it('Deberia crear un producto con los parametros y las relaciones adecuadas', async () => {
    await functss.createInfoPromise(trademark, data.trademarks)
    await functss.createInfoPromise(attributes, data.attributes)
    // creacion del producto:
    const response = await test.create(data.product)
    const mainResult = functss.parserProduct(response.data)
    const variantResult = functss.parserVariant(response.variants)
    expect(mainResult).toMatchObject(data.mainResponse)
    expect(variantResult).toMatchObject(data.variantResponse)
    expect(response.message).toBe('Product created successfully')
  })
  it('deberia arrojar un error al intentar crear dos productos con el mismo nombre.', async () => {
    const data = { name: 'Producto uno' }
    try {
      await test.create(data)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.status).toBe(400)
      expect(error.message).toBe('This product name already exists')
    }
  })
})
describe('Metodos getProduct, getById', () => {
  it('Metodo GetAll: deberia retornar un arreglo con los datos', async () => {
    const fillDatabase = async (info) => {
      try {
        await Promise.all(info.map((dat) => test.create(dat, 'name')))
        // console.log(`Creacion de elemento correcta`, acc)
        return 'todo ok'
      } catch (error) {
        console.error('Error al crear elemento: ', error)
      }
    }
    await fillDatabase(data.products)

    const page = 1
    const size = 2
    const name = ''
    const trademark = ''
    const fields = ''
    const response = await test.getProduct(page, size, name, trademark, fields)
    // console.log('data en bruto: ', response.results)
    const result = functss.parsedProductGet(response.results)
    // console.log(response.info)
    // console.log('parseao: ',result)
    // console.log('array', response.results.Attributes.length())
    store.setUserId(result[0].id)
    expect(result).toMatchObject(data.getResponse)
    expect(response.info).toMatchObject({ count: 4, pages: 2, currentPage: 1 })
  })
  it('deberia cambiar de pagina con la query "pages" (currentPage).', async () => {
    const page = 2
    const size = 2
    const name = ''
    const trademark = ''
    const fields = ''
    const response = await test.getProduct(page, size, name, trademark, fields)
    const result = functss.parsedProductGet(response.results)
    expect(result).toMatchObject(data.getResponsePage2)
    expect(response.info).toMatchObject({ count: 4, pages: 2, currentPage: 2 })
  })
  it('deberia cambiar el numero de elementos con la query "size" (pages).', async () => {
    const page = 2
    const size = 3
    const name = ''
    const trademark = ''
    const fields = ''
    const response = await test.getProduct(page, size, name, trademark, fields)
    const result = functss.parsedProductGet(response.results)
    expect(result).toMatchObject(data.getResponseSize3)
    expect(response.info).toMatchObject({ count: 4, pages: 2, currentPage: 2 })
  })
  it('deberia cambiar el numero de elementos con la query "name".', async () => {
    const page = 1
    const size = 2
    const name = 'Producto cuatro'
    const trademark = ''
    const fields = ''
    const response = await test.getProduct(page, size, name, trademark, fields)
    const result = functss.parsedProductGet(response.results)
    expect(result).toMatchObject(data.getResponseSize3)
    expect(response.info).toMatchObject({ count: 1, pages: 1, currentPage: 1 })
  })
  it('deberia filtrar por marca con los elementos correctos.', async () => {
    const page = 1
    const size = 2
    const name = ''
    const trademark = 'RIP CURL'
    const fields = ''
    const response = await test.getProduct(page, size, name, trademark, fields)
    const result = functss.parsedProductGet(response.results)
    expect(result).toMatchObject(data.getResponseSize4)
    expect(response.info).toMatchObject({ count: 2, pages: 1, currentPage: 1 })
  })
  it('deberia filtrar por attribute (discipline) con los elementos correctos.', async () => {
    const page = 1
    const size = 2
    const name = ''
    const trademark = ''
    const fields = '4' // discipline 4: Moda
    const response = await test.getProduct(page, size, name, trademark, fields)
    const result = functss.parsedProductGet(response.results)
    expect(result).toMatchObject(data.getResponseSize5)
    expect(response.info).toMatchObject({ count: 2, pages: 1, currentPage: 1 })
  })

  it('Metodo GetById: deberia retornar un objeto con los datos', async () => {
    const id = store.getUserId()
    const response = await test.getById(id)
    const result = functss.parsedProductGetById(response)
    console.log(result)
    expect(result).toMatchObject(data.getByIdResponse)
  })
  it('Metodo GetById: deberia retornar un objeto filtrado por color', async () => {
    const id = store.getUserId()
    const size = ''
    const color = 'Blanco'
    const response = await test.getById(id, size, color)
    const result = functss.parsedProductGetById(response)
    console.log(result)
    expect(result).toMatchObject(data.getByIdResponseByColor)
  })
  it('Metodo GetById: deberia retornar un objeto filtrado por talle (size).', async () => {
    const id = store.getUserId()
    const size = '40'
    const response = await test.getById(id, size)
    const result = functss.parsedProductGetById(response)
    console.log(result)
    expect(result).toMatchObject(data.getByIdResponseBySize)
  })
})
