import eh from '../Configs/errorHandlers.js'

const throwError = eh.throwError
// Esto es lo mas parecido a una clase abstracta, no se puede instanciar, solo se puede extender.

class BaseRepository {
  constructor (Model, dataEmpty = null) {
    if (new.target === BaseRepository) {
      throw new Error('No se puede instanciar una clase abstracta.')
    }
    this.Model = Model
    this.dataEmpty = dataEmpty
  }

  async create (data, uniqueField) {
    // console.log(data[uniqueField])
    try {
      const whereClause = {}
      if (uniqueField) {
        whereClause[uniqueField] = data[uniqueField]
      }
      const existingRecord = await this.Model.findUnique({ where: whereClause })

      if (existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} ${uniqueField || 'entry'} already exists`, 400)
      }
      const newRecord = await this.Model.create({ data })

      return newRecord
    } catch (error) {
      throw error
    }
  }

  async getAll (searchField = '', search = null, filters = {}, sortBy = 'id', order = 'desc', page = 1, limit = 10) {
    const offset = (page - 1) * limit
    // Construimos el filtro de búsqueda
    const searchFilter = search ? { [searchField]: { contains: search, mode: 'insensitive' } } : {}
    // Combinamos filtros personalizados con búsqueda
    const where = { ...searchFilter, ...filters }
    const existingRecords = await this.Model.findMany({
      where,
      orderBy: { [sortBy]: order },
      skip: offset,
      take: limit
    })
    if (existingRecords.length === 0) {
      if (this.dataEmpty) {
        existingRecords.push(this.dataEmpty)
      } else { throwError(`This ${this.Model.name.toLowerCase()} ${searchField || 'entry'} do not exists`, 404) }
    }

    // Contamos el total de registros
    const total = await this.Model.count({ where })

    return {
      info: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      },
      data: existingRecords
    }
  }

  async getOne (data, uniqueField) {
    try {
      const whereClause = {}
      if (uniqueField) {
        whereClause[uniqueField] = data
      }
      const existingRecord = await this.Model.findUnique({ where: whereClause })
      if (!existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
      }
      return existingRecord
    } catch (error) {
      throw error
    }
  };

  async getById (id) {
    try {
      const existingRecord = await this.Model.findUnique({ where: { id } })
      if (!existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
      }
      return existingRecord
    } catch (error) {
      throw error
    }
  };

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
  };

  async delete (id) {
    const dataFound = await this.Model.findUnique({ where: { id } })
    if (!dataFound) {
      throwError(`${this.Model} not found`, 404)
    }
    await this.Model.delete({
      where: { id: parseInt(id) }
    })
    return `${this.Model.name} deleted successfully`
  };
}

export default BaseRepository
