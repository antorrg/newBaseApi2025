import { prisma } from '../../../Configs/database.js'
import VideogameRepository from './VideogameRep.js'
import dt from '../../../../test/helperTest/VideogameData.js'
import * as dataVg from '../../../../test/Repositories/helpers/dataSingleVg.js'
import * as store from '../../../../test/helperTest/testStore.js'

const test = new VideogameRepository(prisma.videogame)

describe('Class VideogameRepository', () => {
  async function bulkCreate (entity, dataProvided) {
    try {
      const createdElements = await prisma[entity].createMany({
        data: dataProvided,
        skipDuplicates: true // Opcional: evita duplicados si hay restricciones únicas
      })
      console.log(createdElements)
      return createdElements
    } catch (error) {
      throw error
    }
  }

  describe('Metodo create', () => {
    it('deberia crear un videogame y relacionarlo con sus respectivas plataformas y generos', async () => {
      await bulkCreate('genre', dt.genresData)
      await bulkCreate('platform', dt.platformsData)
      const data = dataVg.dataVideogame
      const response = await test.create(data, 'name')
      expect(response).toHaveProperty('id')
      expect(response).toHaveProperty('name', data.name)
    })
    it('deberia arrojar un error si se intenta crear un Videogame con el mismo nombre', async () => {
      try {
        const data = dataVg.dataVideogame
        await test.create(data, 'name')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(400)
        expect(error.message).toBe('This videogame name already exists')
      }
    })
  })
  describe('metodo Get. GetAll y GetById', () => {
    describe('Metodo getAll', () => {
      it('deberia retornar un arreglo con dos objetos: info y data', async () => {
        const response = await test.getAll()
        store.setId(response.data[0].id)
        expect(response.info).toEqual({ total: 1, page: 1, totalPages: 1, limit: 10 })
        expect(response.data).toMatchObject([dataVg.vgResponse])
        expect(response.data[0].genres).toEqual([
          { id: 1, name: 'Action', deletedAt: null },
          { id: 2, name: 'Indie', deletedAt: null }
        ])
        expect(response.data[0].platforms).toEqual([
          { id: 2, name: 'PlayStation 5', deletedAt: null },
          { id: 3, name: 'PlayStation 4', deletedAt: null },
          { id: 7, name: 'PS Vita', deletedAt: null },
          { id: 9, name: 'Apple Macintosh', deletedAt: null }
        ])
      })
    })
    describe('Metodo getById', () => {
      it('deberia retornar un objeto con el videogame y sus relaciones (genre y platform)', async () => {
        const id = store.getId()
        const response = await test.getById(id)
        expect(response).toMatchObject(dataVg.vgResponse)
        expect(response.genres).toEqual([
          { id: 1, name: 'Action', deletedAt: null },
          { id: 2, name: 'Indie', deletedAt: null }
        ])
        expect(response.platforms).toEqual([
          { id: 2, name: 'PlayStation 5', deletedAt: null },
          { id: 3, name: 'PlayStation 4', deletedAt: null },
          { id: 7, name: 'PS Vita', deletedAt: null },
          { id: 9, name: 'Apple Macintosh', deletedAt: null }
        ])
      })
    })
  })
})
