import { throwError, processError } from '../../Configs/errorHandlers.js'
import { Op } from 'sequelize'

// Esto es lo mas parecido a una clase abstracta, no se puede instanciar, solo se puede extender.

export class BaseRepository {
  constructor (Model, parser, dataEmpty = null) {
    if (new.target === BaseRepository) {
      throw new Error('Cannot instantiate an abstract class')
    }
    this.Model = Model
    this.parser = parser
    this.dataEmpty = dataEmpty
  }

  async create (data, uniqueField) {
    try {
      const whereClause = {}
      if (uniqueField) {
        whereClause[uniqueField] = data[uniqueField]
      }
      const existingRecord = await this.Model.findOne({ where: whereClause })

      if (existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} ${uniqueField || 'entry'} already exists`, 400)
      }
      const newRecord = await this.Model.create(data)

      return this.parser(newRecord)
    } catch (error) {
      processError(error, 'BaseRepository.create')
    }
  }

  async getAll () {
    try {
      const response = await this.Model.findAll()
      return response.map(r => this.parser(r))
    } catch (error) {
      processError(error, 'BaseRepository.getAll')
    }
  }

  async getWithPagination (queryObject, isAdmin = false) {
    try {
      const { searchField = '', search = null, sortBy = 'id', order = 'ASC', page = 1, limit = 10 } = queryObject
      const offset = (page - 1) * limit
      const searchFilter = search && searchField ? { [searchField]: { [Op.iLike]: `%${search}%` } } : {}
      const adminFilter = isAdmin === false ? { enabled: true } : {}
      // Combinamos filtros personalizados con búsqueda
      const whereClause = { ...adminFilter, ...searchFilter }
      const { rows: existingRecords, count: total } = await this.Model.findAndCountAll({
        limit,
        offset,
        where: whereClause,
        distinct: true,
        order: [[sortBy, order]]
      })
      if (existingRecords.length === 0) {
        if (this.dataEmpty) {
          existingRecords.push(this.dataEmpty)
        } else { throwError(`This ${this.Model.name.toLowerCase()} ${searchField || 'entry'} do not exists`, 404) }
      }

      return {
        info: {
          total,
          page,
          totalPages: Math.ceil(total / limit)
        },
        results: existingRecords.map(r => this.parser(r))
      }
    } catch (error) {
      processError(error, 'BaseRepository.getWithPagination')
    }
  }

  async getOne (data, searchField, isAdmin = true) {
    try {
      const whereClause = {}
      const adminFilter = isAdmin === false ? { enabled: true } : {}
      if (searchField) {
        whereClause[searchField] = data
      }
      const existingRecord = await this.Model.findOne({ where: { ...adminFilter, ...whereClause } })
      if (!existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
      }
      return this.parser(existingRecord)
    } catch (error) {
      processError(error, 'BaseRepository.getOne')
    }
  };

  async getById (id) {
    try {
      const existingRecord = await this.Model.findByPk(id)
      if (!existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
      }
      return this.parser(existingRecord)
    } catch (error) {
      processError(error, 'BaseRepository.getById')
    }
  };

  async update (id, data) {
    try {
      const dataFound = await this.Model.findByPk(id)
      if (!dataFound) {
        throwError(`${this.Model.name} not found`, 404)
      }
      const upData = await dataFound.update(data)
      return this.parser(upData)
    } catch (error) {
      processError(error, 'BaseRepository.update')
    }
  };

  async delete (id) {
    try {
      const dataFound = await this.Model.findByPk(id)
      if (!dataFound) {
        throwError(`${this.Model} not found`, 404)
      }
      await dataFound.destroy()
      return `${this.Model.name} deleted successfully`
    } catch (error) {
      processError(error, 'BaseRepository.delete')
    }
  };
}
