import BaseRepository from '../../../Shared/Repositories/BaseRepository.js'
import eh from '../../../Configs/errorHandlers.js'
const throwError = eh.throwError

class VideogameRepository extends BaseRepository {
  constructor (Model, modelName2, modelName3, dataEmpty = null) {
    super(Model, dataEmpty)
    this.modelName2 = modelName2
    this.modelName3 = modelName3
  }

  async create (data, uniqueField) {
    // console.log(data[uniqueField])
    try {
      const whereClause = {}
      if (uniqueField) {
        whereClause[uniqueField] = data[uniqueField]
      }
      const existingRecord = await this.Model.findUnique({
        where: whereClause
      })

      if (existingRecord) {
        throwError(
          `This ${this.Model.name.toLowerCase()} ${
            uniqueField || 'entry'
          } already exists`,
          400
        )
      }
      const { genres, platforms, ...restData } = data

      const newRecord = await this.Model.create({
        data: {
          ...restData,
          genres: genres?.length
            ? { connect: genres.map((id) => ({ id })) }
            : undefined,
          platforms: platforms?.length
            ? { connect: platforms.map((id) => ({ id })) }
            : undefined
        }
      })

      return newRecord
    } catch (error) {
      throw error
    }
  }

  /* app frontend
      page = 0,
      size = 5,
      platforms,
      genres,
      minPrice,
      maxPrice,
      order,
      name
   */
  async getAll (
    searchField = '',
    page = 1,
    search = null,
    filters = {},
    sortBy = 'id',
    order = 'desc',
    limit = 10
  ) {
    const offset = Math.ceil((page - 1) * limit)
    const isSearchValid = typeof search === 'string' && search.trim() !== ''
    const searchFilter = isSearchValid
      ? { [searchField]: { contains: search.trim(), mode: 'insensitive' } }
      : {}
    // Combinamos filtros personalizados con búsqueda
    const where = { ...searchFilter, ...filters }
    const existingRecords = await this.Model.findMany({
      where,
      orderBy: { [sortBy]: order },
      skip: offset,
      take: limit,
      include: {
        // ✅ Agregamos las relaciones
        genres: true,
        platforms: true
      }
    })
    if (existingRecords.length === 0) {
      if (this.dataEmpty) {
        existingRecords.push(this.dataEmpty)
      } else {
        throwError(
          `This ${this.Model.name.toLowerCase()} ${
            searchField || 'entry'
          } do not exists`,
          404
        )
      }
    }

    // Contamos el total de registros
    const total = await this.Model.count({ where })

    return {
      info: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        limit
      },
      data: existingRecords
    }
  }

  async getById (id) {
    try {
      const existingRecord = await this.Model.findUnique({
        where: { id },
        include: {
          genres: true,
          platforms: true
        }
      })
      if (!existingRecord) {
        throwError(
          `This ${this.Model.name.toLowerCase()} name do not exists`,
          404
        )
      }
      return existingRecord
    } catch (error) {
      throw error
    }
  }

  async update (id, data) {
    const dataFound = await this.Model.findUnique({ where: { id } })
    if (!dataFound) {
      throwError(`${this.Model.name} not found`, 404)
    }
    const upData = await this.Model.update({
      where: { id: parseInt(id) },
      data
    })
    return upData
  }

  async updateRelations (id, relations) {
    // relations = {genre: [], platform:[]}
    const updateData = {}
    // Validar que las claves de 'relations' sean correctas
    for (const [key, ids] of Object.entries(relations)) {
      if (!['genre', 'platform'].includes(key)) {
        throwError(`Invalid relation type: ${key}`, 400)
      }
      updateData[key] = ids.length
        ? { set: ids.map((id) => ({ id })) }
        : { set: [] }
    }

    const updatedRecord = await this.Model.update({
      where: { id },
      data: updateData
    })

    return updatedRecord
  }

  async delete (id) {
    const dataFound = await this.Model.findUnique({ where: { id } })
    if (!dataFound) {
      throwError(`${this.Model} not found`, 404)
    }
    await prisma.videogame.update({
      where: { id },
      data: {
        genre: { set: [] },
        platform: { set: [] }
      }
    })
    await this.Model.delete({
      where: { id: parseInt(id) }
    })
    return `${this.Model.name} deleted successfully`
  }
}

export default VideogameRepository
