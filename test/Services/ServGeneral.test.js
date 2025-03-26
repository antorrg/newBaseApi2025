import BaseRepository from '../../src/Repositories/BaseRepository.js'
import GeneralService from '../../src/Services/GeneralService.js'
import { Landing } from '../../src/Configs/database.js'
import * as info from '../helperTest/baseRep.js'
import * as fns from '../helperTest/generalFunctions.js'

class TestClass extends BaseRepository {
  constructor (Model) {
    super(Model)
  }
}
const testing = new TestClass(Landing)

// repository, fieldName(string), cache(boolean), parserFunction(function), useImage(boolean), deleteImages(function)
const serv = new GeneralService(testing, 'Landing', false, null, true, fns.deletFunctionFalse)
const servCache = new GeneralService(testing, 'Landing', true, info.cleanData, false, fns.deletFunctionTrue)
const servParse = new GeneralService(testing, 'Landing', false, info.cleanData, true, fns.deletFunctionTrue)

describe('Test unitarios de la clase GeneralService: CRUD.', () => {
  describe('El metodo "create" para crear un servicio', () => {
    it('deberia crear un elemento con los parametros correctos', async () => {
      const element = info.createData // data, uniqueField=null, parserFunction=null, isAdmin = false
      const response = await servParse.create(element, 'name')
      expect(response).toMatchObject(info.responseData)
    })
    it('deberia arrojar un error al intentar crear dos veces el mismo elemento (manejo de errores)', async () => {
      const element = { name: 'Landing1' }
      try {
        await servParse.create(element)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('This landing entry already exists')
        expect(error.status).toBe(400)
      }
    })
  })
  describe('Metodos "GET". Retornar servicios o un servicio con o sin cache.', () => {
    it('Metodo "getAll": deberia retornar un arreglo con los servicios sin cache habilitado', async () => {
      const response = await servParse.getAll()
      expect(response.data).toEqual([info.responseData])
      expect(response.cache).toBe(false)
    })
    it('Metodo "getAll": deberia retornar un arreglo con los servicios con cache habilitado', async () => {
      const response = await servCache.getAll()
      expect(response.data).toEqual([info.responseData])
      expect(response.cache).toBe(false)
      const response2 = await servCache.getAll()
      expect(response2.data).toEqual([info.responseData])
      expect(response2.cache).toBe(true)
    })
  })
  describe('Metodo "update". Eliminacion de imagenes viejas del storage.', () => {
    it('deberia actualizar los elementos y no eliminar imagenes', async () => {
      const id = 1
      const newData = info.responseData
      const response = await servParse.update(id, newData)
      expect(response.message).toBe('Landing updated successfully')
      expect(response.data).toMatchObject(info.responseData)
    })
    it('deberia actualizar los elementos y gestionar eliminacion de imagenes', async () => {
      const id = 1
      const newData = { picture: 'https://imagen.com.ar' }
      const response = await servParse.update(id, newData)
      expect(response.message).toBe('Landing updated successfully')
      expect(response.data).toMatchObject(info.responseDataImg)
    })
    it('deberia arrojar un error si falla la eliminacion de imagenes', async () => {
      const id = 1
      const newData = info.responseData
      try {
        await serv.update(id, newData)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(500)
        expect(error.message).toBe('Error processing ImageUrl: https://imagen.com.ar')
      }
    })
  })
  describe('Metodo "delete".', () => {
    it('deberia borrar un elemento', async () => {
      const id = 1
      const response = await servParse.delete(id)
      expect(response).toBe('Landing deleted successfully')
    })
    it('deberia arrojar un error si falla la eliminacion de imagenes', async () => {
      const element = info.createData
      await serv.create(element, 'name')
      const id = 2
      try {
        await serv.delete(id)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(500)
        expect(error.message).toBe('Error processing ImageUrl: https://picture.com.ar')
      }
    })
  })
})
