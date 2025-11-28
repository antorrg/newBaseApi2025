export default class VgHelp {
  static infoCleanerAll (info) {
    return {
      id: info.id,
      name: info.name,
      image: info.image,
      price: info.price,
      physicalGame: info.physicalGame,
      genres: info.genres.map(genre => genre.name).join(', '),
      platforms: info.platforms.map(platform => platform.name).join(', ')
    }
  }

  static infoCleanerById (info) {
    return {
      id: info.id,
      name: info.name,
      description: info.description,
      image: info.image,
      released: info.released,
      price: info.price,
      physicalGame: info.physicalGame,
      stock: info.stock,
      enable: info.enable,
      genres: info.genres.map(genre => genre.name).join(', '),
      platforms: info.platforms.map(platform => platform.name).join(', ')
    }
  }

  static vgQuery = {
    page: {
      type: 'int',
      default: 1
    },
    size: {
      type: 'int',
      default: 10
    },
    platforms: {
      type: 'string',
      default: ''
    },
    genres: {
      type: 'string',
      default: ''
    },
    minPrice: {
      type: 'float',
      default: 0
    },
    maxPrice: {
      type: 'float',
      default: 0
    },
    order: {
      type: 'string',
      default: 'desc'
    },
    name: {
      type: 'string',
      default: ''
    }
  }
}
/*  page = 1,
    search = null,
    filters = {},
    sortBy = 'id',
    order = 'desc',
    limit = 10 */

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
