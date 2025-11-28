import GeneralService from '../../Shared/Services/GeneralService.js'

export class UserService extends GeneralService {
  constructor (Repository, fieldName, uniqueField = '', useImage = false, deleteImages = null) {
    super(Repository, fieldName, uniqueField, useImage, deleteImages)
  }

  async updatePassword (data) {
    return this.Repository.updatePassword(data)
  }
}
