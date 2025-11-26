import { throwError, processError } from '../errorHandlers.js'
import { prisma } from '../database.js'

export class LoggerServiceDb {

  constructor () {
    this.Model = prisma.log       // Prisma usa minúsculas
  }

  parserFn = (u) => {
    return {
      id: u.id,
      levelName: u.levelName,
      levelCode: u.levelCode,
      message: u.message,
      type: u.type ?? null,
      status: u.status ?? null,
      stack: u.stack ?? null,
      contexts: u.contexts ?? [],
      pid: u.pid,
      time: Number(u.time),
      hostname: u.hostname,
      keep: u.keep,
      createdAt: u.createdAt?.toISOString(),
      updatedAt: u.updatedAt?.toISOString()
    }
  }

  /**
   * Get paginated results
   */
  async getAll(options) {
    try {
      const {
        searchField = '',
        search = null,
        sortBy = 'id',
        order = 'desc',
        page = 1,
        limit = 10
      } = options

      const skip = (page - 1) * limit

      // Prisma search dynamic field
      const whereClause =
        search && searchField
          ? { [searchField]: { contains: search, mode: 'insensitive' } }
          : {}

      // Equivalent to findAndCountAll
      const [results, total] = await Promise.all([
        this.Model.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: {
            [sortBy]: order.toLowerCase(), // Prisma exige "asc" | "desc"
          }
        }),
        this.Model.count({ where: whereClause })
      ])

      return {
        info: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        },
        results: results.map(r => this.parserFn(r))
      }

    } catch (error) {
      return processError(error, `${this.Model} getAll`)
    }
  }

  /**
   * Get single log by ID
   */
  async getById(id) {
    try {
      const record = await this.Model.findUnique({
        where: { id }
      })

      if (!record) {
        throwError(`Log con ID ${id} no encontrado`, 404)
      }

      return this.parserFn(record)

    } catch (error) {
      return processError(error, `${this.Model} getById`)
    }
  }

  /**
   * Update log
   */
  async update(id, data) {
    try {
      const record = await this.Model.findUnique({
        where: { id }
      })

      if (!record) {
        throwError(`Log con ID ${id} no encontrado`, 404)
      }

      const updated = await this.Model.update({
        where: { id },
        data
      })

      return {
        message: 'Log actualizado correctamente',
        results: this.parserFn(updated)
      }

    } catch (error) {
      return processError(error, `${this.Model} update`)
    }
  }

  /**
   * Delete single log
   */
  async delete(id) {
    try {
      const record = await this.Model.findUnique({
        where: { id }
      })

      if (!record) {
        throwError(`Log con ID ${id} no encontrado`, 404)
      }

      await this.Model.delete({
        where: { id }
      })

      return 'Log eliminado correctamente'

    } catch (error) {
      return processError(error, `${this.Model} delete`)
    }
  }

  /**
   * Delete all logs except those marked as keep = true
   */
  async deleteAll() {
    try {
      await this.Model.deleteMany({
        where: { keep: false }
      })

      return 'Logs eliminados correctamente'

    } catch (error) {
      return processError(error, `${this.Model} deleteAll`)
    }
  }
}
