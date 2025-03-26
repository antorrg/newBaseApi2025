import BaseRepository from '../../src/Repositories/BaseRepository.js'
import { Landing, Company } from '../../src/Configs/database.js'
import * as info from './helpers/baseRep.js'

class TestClass extends BaseRepository {
  constructor (Model) {
    super(Model)
  }
}
const tests = new TestClass(Landing)
const failed = new TestClass(Company)

describe('BaseRepository tests (abstract class)', () => {
  describe('Test de extension e instancias', () => {
    it('Deberia arrojar un error al intentar instanciar la clase BaseRepository.', () => {
      expect(() => new BaseRepository(Landing)).toThrow(Error)
      expect(() => new BaseRepository(Landing)).toThrow('No se puede instanciar una clase abstracta.')
    })
    it('debería heredar e instanciar correctamente la clase sin lanzar error', () => {
      const instance = new TestClass(Landing)
      // Verifica que la instancia sea de TestClass y de BaseRepository
      expect(instance).toBeInstanceOf(TestClass)
      expect(instance).toBeInstanceOf(BaseRepository)
      // Verifica que la propiedad Model se asignó correctamente
      expect(instance.Model).toBe(Landing)
    })
  })
  describe('Tests unitarios. Metodos de BaseRepository', () => {
    describe('Metodo create.', () => {
      it('Deberia crear un elemento con los parametros correctos.', async () => {
        const element = info.createData
        const uniqueField = 'name'
        const response = await tests.create(element, uniqueField)
        const responseCleaned = info.cleanData(response)
        expect(responseCleaned).toEqual(info.responseData)
      })
      it('Deberia arrojar un error al intentar crear el mismo elemento dos veces (mismo nombre).', async () => {
        const element = { name: 'landing1' }
        const uniqueField = 'name'
        try {
          await tests.create(element, uniqueField)
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('This landing name already exists')
          expect(error.status).toBe(400)
        }
      })
    })
    describe('Metodos GET, retornando un arreglo de elementos o un elemento.', () => {
      it('Metodo "getAll": deberia retornar un arreglo de elementos.', async () => {
        const response = await tests.getAll()
        const finalRes = response.map(info.cleanData)
        expect(finalRes).toEqual([info.responseData])
      })
      it('Metodo "getAll": deberia retornar un arreglo simbólico si no hubiera elementos en la base de datos.', async () => {
        const response = await failed.getAll(false, info.dataEmpty)
        // console.log(response)
        const finalRes = response.map(info.cleanData)
        expect(finalRes).toEqual([info.dataEmpty])
      })
      it('Metodo "getAll": deberia arrojar un error si no existe el objeto simbolico.', async () => {
        try {
          await failed.getAll(false, null)
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('This company name do not exists')
          expect(error.status).toBe(404)
        }
      })
      it('Metodo "getAll": Deberia retornar solo los elementos con enable "true" si "isAdmin" es false.', async () => {
        const element = info.createSecondData
        const uniqueField = 'name'
        await tests.create(element, uniqueField)
        const response = await tests.getAll()
        const finalRes = response.map(info.cleanData)
        expect(finalRes).toEqual([info.responseData])
      })
      it('Metodo "getAll": Deberia retornar todos los elementos con enable "true" y "false" si "isAdmin" es true.', async () => {
        const response = await tests.getAll(true)
        // console.log('response get: ', response)
        const finalRes = response.map(info.cleanData)
        expect(finalRes).toEqual(info.responseData2)
      })
      it('Metodo "getById": deberia retornar un objeto con un elemento.', async () => {
        const id = 1
        const response = await tests.getById(id)
        const finalRes = info.cleanData(response)
        expect(finalRes).toEqual(info.responseData)
      })
      it('Metodo "getById": deberia retornar un objeto con enable "true" si admin es false.', async () => {
        const id = 1
        const response = await tests.getById(id)
        const finalRes = info.cleanData(response)
        expect(finalRes).toEqual(info.responseData)
      })
      it('Metodo "getById": deberia arrojar un error si el id es incorrecto o el objeto no es enable true con admin en false.', async () => {
        const id = 2
        try {
          await tests.getById(id)
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect(error.status).toBe(404)
          expect(error.message).toBe('This landing name do not exists')
        }
      })
      it('Metodo "getById": deberia retornar un objeto con enable "false" si admin es true.', async () => {
        const id = 2
        const response = await tests.getById(id, true)
        const finalRes = info.cleanData(response)
        expect(finalRes).toEqual(info.responseData3)
      })
      it('Metodo "getOne": deberia retornar un objeto con un elemento.', async () => {
        const uniqueField = 'name'
        const data = 'landing1'
        const response = await tests.getOne(data, uniqueField)
        const finalRes = info.cleanData(response)
        expect(finalRes).toEqual(info.responseData)
      })
      it('Metodo "getOne": deberia retornar un objeto con enable "true" si admin es false.', async () => {
        const uniqueField = 'name'
        const data = 'landing1'
        const response = await tests.getOne(data, uniqueField)
        const finalRes = info.cleanData(response)
        expect(finalRes).toEqual(info.responseData)
      })
      it('Metodo "getOne": deberia arrojar un error si el campo de busqueda es incorrecto o el objeto no es enable true con admin en false.', async () => {
        const uniqueField = 'name'
        const data = 'landing2'
        try {
          await tests.getOne(data, uniqueField)
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect(error.status).toBe(404)
          expect(error.message).toBe('This landing name do not exists')
        }
      })
      it('Metodo "getOne": deberia retornar un objeto con enable "false" si admin es true.', async () => {
        const uniqueField = 'name'
        const data = 'landing2'
        const response = await tests.getOne(data, uniqueField, true)
        const finalRes = info.cleanData(response)
        expect(finalRes).toEqual(info.responseData3)
      })
    })
    describe('Metodo "update', () => {
      it('Deberia actualizar el elemento si los parametros son correctos.', async () => {
        const id = 2
        const newData = { id, name: 'landing3', enable: true }
        const response = await tests.update(id, newData)
        const responseJs = info.cleanData(response)
        expect(responseJs).toMatchObject(info.responseUpdData)
      })
    })
    describe('Metodo "delete".', () => {
      it('Deberia borrar un elemento', async () => {
        const id = 1
        const response = await tests.delete(id)
        expect(response).toBe('Landing deleted successfully')
      })
    })
  })
})
