export default {
  page: {
    type: 'int',
    default: 1
  },
  size: {
    type: 'int',
    default: 10
  },
  platforms: {
    type: 'string'
  },
  genres: {
    type: 'string'
  },
  minPrice: {
    type: 'float',
    default: 0,
    optional: true
  },
  maxPrice: {
    type: 'float',
    default: 0,
    optional: true
  },
  order: {
    type: 'string',
    default: 'desc'
  },
  name: {
    type: 'string',
    default: '',
    optional: true
  }
}
