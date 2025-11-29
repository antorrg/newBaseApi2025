import { BaseRepository } from '../../Shared/Repositories/BaseRepository.js'
import { throwError, processError } from '../../Configs/errorHandlers.js'
import bcrypt from 'bcrypt'

export class UserRepository extends BaseRepository {
  constructor (Model, parser, dataEmpty = null) {
    super(Model, parser, dataEmpty)
  }

  async create (data) {
    try {
      const existingRecord = await this.Model.findOne({ where: { email: data.email } })
      if (existingRecord) {
        if (existingRecord.sub === null) {
          throwError(`This ${this.Model.name.toLowerCase()} ${uniqueField || 'entry'} already exists`, 400)
        }
      }
      const newRecord = await this.Model.create(data)

      return this.parser(newRecord)
    } catch (error) {
      processError(error, 'UserRepository.create')
    }
  }

  async auth0Login (data) {
    let user
    try {
      const existingRecord = await this.Model.findOne({ where: data[email] })
      if (existingRecord) {
        if (existingRecord.sub === null) {
          user = await existingRecord.update({ sub: data.sub })
        } else {
          user = existingRecord
        }
      } else {
        user = await this.Model.create(data)
      }

      return this.parser(user)
    } catch (error) {
      processError(error, 'UserRepository.auth0Login')
    }
  }

  async #verifyUser (data) {
    try {
      const { email, password } = data
      const userFound = await this.Model.findOne({ where: { email } })
      if (!userFound) { throwError('User not found', 404) }
      if (!userFound.enabled) { throwError('User blocked', 400) }
      const passwordMatch = await bcrypt.compare(password, userFound.password)
      if (!passwordMatch) { throwError('Invalid password', 400) }
      return this.parser(userFound)
    } catch (error) {
      processError(error, 'UserRepository.verifyUser')
    }
  }

  async login (data) {
    try {
      const response = await this.#verifyUser(data)
      return this.parser(response)
    } catch (error) {
      processError(error, 'UserRepository.login')
    }
  }

  async updatePassword (data) {
    try {
      const user = await this.#verifyUser(data)
      await user.update({ password: data.newPassword })
      return 'User password updated successfully'
    } catch (error) {
      processError(error, 'UserRepository.updatePassword')
    }
  }

  async update (id, data) {
    let newData
    try {
      const dataFound = await this.Model.findByPk(id)
      if (!dataFound) {
        throwError(`${this.Model.name} not found`, 404)
      }
      if (dataFound.role === 'SuperAdmin') {
        newData = {
          ...data,
          email: dataFound.email,
          password: dataFound.password,
          sub: '',
          role: dataFound.role,
          enabled: dataFound.enable,
          deletedAt: null
        }
      } else {
        newData = data
      }
      const upData = await dataFound.update(newData)
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
      if (dataFound.role === 'SuperAdmin') {
        throwError('A superuser cannot be deleted', 403)
      }
      await dataFound.destroy()
      return `${this.Model.name} deleted successfully`
    } catch (error) {
      processError(error, 'BaseRepository.delete')
    }
  };
}
