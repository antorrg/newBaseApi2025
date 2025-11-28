import { BaseRepository } from '../../Shared/Repositories/BaseRepository.js'
import { processError } from '../../Configs/errorHandlers.js'

export class TokenRepository extends BaseRepository {
  constructor (Model, parser, dataEmpty = null) {
    super(Model, parser, dataEmpty)
  }

  async create (data) {
    try {
      const existingRecords = await this.Model.findAll({ where: { UserId: data.UserId } })
      if (existingRecords.length !== 0) {
        for (const record of existingRecords) {
          await record.update({ revoked: true })
        }
      }
      const newRecord = await this.Model.create(data)
      return this.parser(newRecord)
    } catch (error) {
      processError(error, 'TokenRepository.create')
    }
  }

  async revokedAll (userId) {
    try {
      const existingRecords = await this.Model.findAll({ where: { UserId: userId } })
      if (existingRecords.length === 0) { return true }
      for (const record of existingRecords) {
        await record.update({ revoked: true })
      }
      return true
    } catch (error) {
      processError(error, 'TokenRepository.revokedAll')
    }
  }
}
