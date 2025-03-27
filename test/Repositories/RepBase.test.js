import BaseRepository from '../../src/Repositories/BaseRepository.js'
import { prisma } from '../../src/Configs/database.js'
import * as info from './helpers/baseRep.js'

class TestClass extends BaseRepository {
  constructor (Model, dataEmpty) {
    super(Model, dataEmpty)
  }
}
const tests = new TestClass(prisma.landing)
const failed = new TestClass(prisma.genre, info.dataEmpty)

describe('BaseRepository tests (abstract class)', () => {
  describe('Test de extension e instancias', () => {
    it('Deberia arrojar un error al intentar instanciar la clase BaseRepository.', () => {
      expect(() => new BaseRepository(prisma.landing)).toThrow(Error)
      expect(() => new BaseRepository(prisma.landing)).toThrow('No se puede instanciar una clase abstracta.')
    })
    it('debería heredar e instanciar correctamente la clase sin lanzar error', () => {
      const instance = new TestClass(prisma.landing)
      // Verifica que la instancia sea de TestClass y de BaseRepository
      expect(instance).toBeInstanceOf(TestClass)
      expect(instance).toBeInstanceOf(BaseRepository)
      // Verifica que la propiedad Model se asignó correctamente
      expect(instance.Model).toBe(prisma.landing)
    })
  })
  describe('Tests unitarios. Metodos de BaseRepository', () => {
    describe('Metodo create.', () => {
      it('Deberia crear un elemento con los parametros correctos.', async () => {
        const element = info.createData
        const uniqueField = 'title'
        const response = await tests.create(element, uniqueField)
        const responseCleaned = info.cleanData(response)
        expect(responseCleaned).toEqual(info.responseData)
      })
      it('Deberia arrojar un error al intentar crear el mismo elemento dos veces (mismo nombre).', async () => {
        const element = info.createData
        const uniqueField = 'title'
        try {
          await tests.create(element, uniqueField)
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('This landing title already exists')
          expect(error.status).toBe(400)
        }
      })
    })
    describe('Metodos GET, retornando un arreglo de elementos o un elemento.', () => {
      it('Metodo "getAll": deberia retornar un arreglo de elementos.', async () => {
        //, { search, filters = {}, sortBy = 'id', order = 'desc', page = 1, limit = 10 }
        const response = await tests.getAll('title')
        const finalRes = response.data.map(info.cleanData)
        expect(finalRes).toEqual([info.responseData])
        expect(response.info).toEqual({ page: 1, total: 1, totalPages: 1 })
      })
      it('Metodo "getAll": deberia retornar un arreglo simbólico si no hubiera elementos en la base de datos.', async () => {
        const response = await failed.getAll('name')
        const finalRes = response.data.map(info.cleanData)
        expect(finalRes).toEqual([info.dataEmpty])
      })
      it('Metodo "getAll": deberia arrojar un error si no existe el objeto simbolico.', async () => {
        try {
          await failed.getAll('name')
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('This genre name do not exists')
          expect(error.status).toBe(404)
        }
      })
      it('Metodo "getById": deberia retornar un objeto con un elemento.', async () => {
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
      it('Metodo "getOne": deberia retornar un objeto con un elemento.', async () => {
        const uniqueField = 'title'
        const data = 'Titulo de la landing'
        const response = await tests.getOne(data, uniqueField)
        const finalRes = info.cleanData(response)
        expect(finalRes).toEqual(info.responseData)
      })
      it('Metodo "getOne": deberia arrojar un error si el campo de busqueda es incorrecto o el objeto no es enable true con admin en false.', async () => {
        const uniqueField = 'title'
        const data = 'landing2'
        try {
          await tests.getOne(data, uniqueField)
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect(error.status).toBe(404)
          expect(error.message).toBe('This landing name do not exists')
        }
      })
    })
    describe('Metodo "update', () => {
      it('Deberia actualizar el elemento si los parametros son correctos.', async () => {
        const id = 1
        const newData = { id, title: 'landing3', enable: true }
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
