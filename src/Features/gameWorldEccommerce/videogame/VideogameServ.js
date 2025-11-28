import GeneralService from '../../../Shared/Services/GeneralService.js'
import eh from '../../../Configs/errorHandlers.js'
const throwError = eh.throwError

class VideogameService extends GeneralService {
  constructor (
    Repository,
    fieldName,
    useCache = false,
    useImage = false,
    deleteImages = null,
    allowedKeys,
    includes
  ) {
    super(
      Repository,
      fieldName,
      useCache,
      useImage,
      deleteImages,
      allowedKeys,
      includes
    )
  }

  async getAll (searchField, queryObject, isAdmin = false) {
    // console.log('service',emptyObject)
    const page = parseInt(queryObject.page) || 1
    const search = queryObject.name || ''
    const order = queryObject.order || 'desc'
    const limit = parseInt(queryObject.size) || 10

    // Armamos filtros
    const filters = {}

    // Filtro por plataformas (relación many-to-many)
    if (queryObject.platforms) {
      const platformIds = Array.isArray(queryObject.platforms)
        ? queryObject.platforms
        : [queryObject.platforms]

      filters.platforms = {
        some: {
          id: { in: platformIds.map(Number) }
        }
      }
    }

    // Filtro por géneros (relación many-to-many)
    if (queryObject.genres) {
      const genreIds = Array.isArray(queryObject.genres)
        ? queryObject.genres
        : [queryObject.genres]

      filters.genres = {
        some: {
          id: { in: genreIds.map(Number) }
        }
      }
    }

    // Filtro por precio mínimo y máximo
    if (queryObject.minPrice || queryObject.maxPrice) {
      filters.price = {}
      if (queryObject.minPrice) {
        filters.price.gte = parseFloat(queryObject.minPrice)
      }
      if (queryObject.maxPrice) {
        filters.price.lte = parseFloat(queryObject.maxPrice)
      }
    }

    // Por ahora sortBy fijo, podrías extenderlo según queryObject.sortBy
    const sortBy = 'id'
    /* app frontend
      page = 0,
      size = 5,
      platforms,
      genres,
      minPrice,
      maxPrice,
      order,
      name
   */

    const cacheKey = `${this.fieldName.toLowerCase()}`
    if (this.useCache) {
      const cachedData = cache.get(cacheKey)
      if (cachedData) {
        return {
          data: cachedData,
          cache: true
        }
      }
    }
    const response = await this.Repository.getAll(
      searchField,
      page,
      search,
      filters,
      sortBy,
      order,
      limit
    )

    const dataParsed = isAdmin
      ? response.data// .map((dat) => this.parserFunction(dat))
      : response.data.filter((dat) => dat.enable === true)// .map((dat) => this.parserFunction(dat))
    const finalData = {
      info: response.info,
      data: dataParsed
    }
    // console.log('soy la data: ', response.data)
    if (this.useCache) {
      cache.set(cacheKey, finalData)
    }
    // console.log(dataParsed)
    return {
      data: finalData,
      cache: false
    }
  }

  async update (id, newData) {
    const dataFound = await this.Repository.getById(id)
    if (!dataFound) {
      throwError('Videogame not found', 404)
    }
    const relations = { genre: newData.genre, platform: newData.platforms }
    await this.Repository.updateRelations(id, relations)
    const data = {
      name: newData.name,
      description: newData.description,
      image: newData.image,
      released: newData.released,
      price: newData.price,
      physicalGame: newData.physicalGame,
      stock: newData.stock
    }
    const newGame = await this.Repository.update(id, data)
    return {
      message: 'Videogame updated succesfully',
      data: newGame
    }
  }
}
export default VideogameService
