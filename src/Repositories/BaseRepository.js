import eh from '../Configs/errorHandlers.js'

const throwError = eh.throwError
// Esto es lo mas parecido a una clase abstracta, no se puede instanciar, solo se puede extender.

class BaseRepository {
  constructor (Model) {
    if (new.target === BaseRepository) {
      throw new Error('No se puede instanciar una clase abstracta.')
    }
    this.Model = Model
  }

  async create (data, uniqueField) {
    // console.log(data[uniqueField])
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

      return newRecord
    } catch (error) {
      throw error
    }
  }

  async getAll (isAdmin, dataEmpty = null) {
    try {
      const existingRecord = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findAll()
      if (existingRecord.length === 0) {
        if (dataEmpty) {
          existingRecord.push(dataEmpty)// return [dataEmpty]
        } else { throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404) }
      }
      return existingRecord
    } catch (error) {
      throw error
    }
  }

  async getOne (data, uniqueField, isAdmin) {
    try {
      const whereClause = {}
      if (uniqueField) {
        whereClause[uniqueField] = data
      }
      const existingRecord = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findOne({ where: whereClause })
      if (!existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
      }
      return existingRecord
    } catch (error) {
      throw error
    }
  };

  async getById (id, isAdmin) {
    try {
      const existingRecord = await this.Model.scope(isAdmin ? 'allRecords' : 'enabledOnly').findByPk(id)
      if (!existingRecord) {
        throwError(`This ${this.Model.name.toLowerCase()} name do not exists`, 404)
      }
      return existingRecord
    } catch (error) {
      throw error
    }
  };

  async update (id, newData) {
    try {
      const dataFound = await this.Model.findByPk(id)
      if (!dataFound) {
        throwError(`${this.Model.name} not found`, 404)
      }
      const upData = await dataFound.update(newData)
      return upData
    } catch (error) {
      throw error
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
      throw error
    }
  };
}

export default BaseRepository
