import eh from '../../Configs/errorHandlers.js'

export class BaseService {
  constructor (Repository, fieldName, uniqueField = '', parserFunction = null, useImage = false, deleteImages = null) {
    this.Repository = Repository
    this.fieldName = fieldName
    this.uniqueField = uniqueField
    this.useImage = useImage
    this.deleteImages = deleteImages
    this.parserFunction = parserFunction
  }

  async handleImageDeletion (imageUrl) {
    if (this.useImage && imageUrl) {
      await this.deleteImages(imageUrl)
    }
  }

  async create (data) {
    try {
      const newRecord = await this.Repository.create(data, this.uniqueField)
      return {
        message: `${this.fieldName} ${data[this.uniqueField]} created successfully`,
        results: this.parserFunction ? this.parserFunction(newRecord) : newRecord
      }
    } catch (error) {
      eh.processError(error, `Create Service: ${this.fieldName} error`)
    }
  }

  async getAll (isAdmin = false) {
    try {
      const response = await this.Repository.getAll(isAdmin)

      const dataParsed = this.parserFunction ? response.map(dat => this.parserFunction(dat)) : response
      return {
        message: `${this.fieldName}s found successfully`,
        results: dataParsed
      }
    } catch (error) {
      eh.processError(error, `Get Service: ${this.fieldName} error`)
    }
  }

  // searchField = '', search = null, filters = {}, sortBy = 'id', order = 'desc', page = 1, limit = 10

  async getWithPagination (queryObject, isAdmin = false) {
    try {
      const response = await this.Repository.getWithPagination(queryObject, isAdmin)
      const dataParsed = this.parserFunction ? response.data.map(dat => this.parserFunction(dat)) : response.data
      return {
        message: `${this.fieldName}s found successfully`,
        results: {
          info: response.info,
          data: dataParsed
        }
      }
    } catch (error) {
      eh.processError(error, `Get Service: ${this.fieldName} error`)
    }
  }

  async getById (id) {
    try {
      const response = await this.Repository.getById(id)
      const dataParsed = this.parserFunction ? this.parserFunction(response) : response
      return {
        message: `${this.fieldName} found successfully`,
        results: dataParsed
      }
    } catch (error) {
      eh.processError(error, `Get Service: ${this.fieldName} error`)
    }
  }

  async update (id, newData) {
    try {
      let imageUrl = ''
      let deleteImg = false
      const dataFound = await this.Repository.getById(id)

      if (this.useImage && dataFound.picture && dataFound.picture !== newData.picture) {
        imageUrl = dataFound.picture
        deleteImg = true
      }

      const upData = await this.Repository.update(id, newData)

      if (deleteImg) {
        await this.handleImageDeletion(imageUrl)
      }

      return {
        message: `${this.fieldName} updated successfully`,
        results: this.parserFunction ? this.parserFunction(upData) : upData
      }
    } catch (error) {
      eh.processError(error, `Update Service: ${this.fieldName} error`)
    }
  }

  async delete (id) {
    let imageUrl = ''
    try {
      const dataFound = await this.Repository.getById(id)
      const dataReg = dataFound[this.uniqueField]
      this.useImage ? imageUrl = dataFound.picture : ''

      await this.Repository.delete(id)

      await this.handleImageDeletion(imageUrl)

      return { message: `${this.fieldName} deleted successfully`, results: `${this.fieldName} deleted: ${dataReg}` }
    } catch (error) {
      eh.processError(error, `Delete Service: ${this.fieldName} error`)
    }
  }
}
