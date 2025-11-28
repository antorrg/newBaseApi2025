export default {
  page: {
    type: 'int',
    default: 1,
    optional: false
  },
  limit: {
    type: 'int',
    default: 10,
    optional: false
  },
  orderBy: {
    type: 'string',
    default: 'email',
    optional: false,
    sanitize: {
      trim: true,
      escape: true,
      lowercase: true
    }
  },
  order: {
    type: 'string',
    default: 'DESC',
    optional: false,
    sanitize: {
      trim: true,
      escape: true,
      uppercase: true
    }
  },
  searchField: {
    type: 'string',
    default: 'id',
    optional: false,
    sanitize: {
      trim: true,
      escape: true,
      lowercase: true
    }
  },
  search: {
    type: 'string',
    default: 'null',
    optional: false,
    sanitize: {
      trim: true,
      escape: true,
      lowercase: true
    }
  }
}
