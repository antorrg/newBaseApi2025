import { BaseService } from '../../Shared/Services/BaseService.js'
import logger from '../../Configs/logger.js'
import { throwError } from '../../Configs/errorHandlers.js'
export class UserService extends BaseService {
  constructor (Repository, fieldName, uniqueField = '', useImage = false, deleteImages = null) {
    super(Repository, fieldName, uniqueField, useImage, deleteImages)
  }

  async updatePassword (data) {
    return this.Repository.updatePassword(data)
  }

  async resetPassword (id, data) {
    const userFound = this.Repository.getById(id)
    if(!userFound){throwError('User not found', 404)}
    //service mail()
    const reset = this.Repository.update(id, { password: data.password })
    logger.warn(`New password generated: UserId: ${id}, email: ${userFound.email},pass: ${data.newPassword}. Time: ${new Date.now()}`)
    // service mail( userFound.email, `new password: ${data.newPassword}`)
    return reset
  }
}
