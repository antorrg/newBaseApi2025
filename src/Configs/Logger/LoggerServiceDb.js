import { throwError, processError } from '../errorHandlers.js'
import { Op } from 'sequelize'
import { Log } from '../../Configs/database.js'

export class LoggerServiceDb {
  constructor () {
    this.Model = Log
  }

  parserFn = (u) => {
    const log = u.get()
    return {
      id: log.id,
      levelName: log.levelName,
      levelCode: log.levelCode,
      message: log.message,
      type: log.type ?? null,
      status: log.status ?? null,
      stack: log.stack ?? null,
      contexts: log.contexts ?? [],
      pid: log.pid,
      time: Number(log.time),
      hostname: log.hostname,
      keep: log.keep,
      createdAt: log.createdAt?.toISOString(),
      updatedAt: log.updatedAt?.toISOString()
    }
  }

  /**
   * Get paginated results
   */
  async getAll (options) {
    try {
      const {
        searchField = '',
        search = null,
        sortBy = 'id',
        order = 'DESC',
        page = 1,
        limit = 10
      } = options

      const offset = (page - 1) * limit

      const whereClause =
        search && searchField
          ? { [searchField]: { [Op.iLike]: `%${search}%` } }
          : {}

      const { rows: existingRecords, count: total } =
        await this.Model.findAndCountAll({
          limit,
          offset,
          where: whereClause,
          distinct: true,
          order: [[sortBy, order]]
        })

      return {
        info: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        },
        results: existingRecords.map(r => this.parserFn(r))
      }
    } catch (error) {
      return processError(error, `${this.Model.name} getAll`)
    }
  }

  /**
   * Get single log by IDk
   */
  async getById (id) {
    try {
      const record = await this.Model.findByPk(id)

      if (!record) {
        throwError(`Log con ID ${id} no encontrado`, 404)
      }

      return this.parserFn(record)
    } catch (error) {
      return processError(error, `${this.Model.name} getById`)
    }
  }

  /**
   * Update keep flag or other allowed fields
   */
  async update (id, data) {
    try {
      const record = await this.Model.findByPk(id)

      if (!record) {
        throwError(`Log con ID ${id} no encontrado`, 404)
      }

      await record.update(data)

      return {
        message: 'Log actualizado correctamente',
        results: this.parserFn(record)
      }
    } catch (error) {
      return processError(error, `${this.Model.name} update`)
    }
  }

  /**
   * Delete single log
   */
  async delete (id) {
    try {
      const record = await this.Model.findByPk(id)

      if (!record) {
        throwError(`Log con ID ${id} no encontrado`, 404)
      }

      await record.destroy()

      return 'Log eliminado correctamente'
    } catch (error) {
      return processError(error, `${this.Model.name} delete`)
    }
  }

  /**
   * Delete all logs except those marked as keep = true
   */
  async deleteAll () {
    try {
      await this.Model.destroy({
        where: {
          keep: false
        }
      })

      return 'Logs eliminados correctamente'
    } catch (error) {
      return processError(error, `${this.Model.name} deleteAll`)
    }
  }
}
