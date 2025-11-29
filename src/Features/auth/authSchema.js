export const login = {
  email: {
    type: 'string',
    sanitize: {
      trim: true,
      lowercase: true
    }
  },
  password: {
    type: 'string',
    sanitize: {
      trim: true
    }
  }
}

export const auth0Body = {
  email: {
    type: 'string',
    sanitize: {
      trim: true,
      lowercase: true
    }
  },
  nickname: {
    type: 'string',
    sanitize: {
      trim: true,
      lowercase: true
    }
  },
  given_name: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  picture: {
    type: 'string',
    default: 'https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg',
    sanitize: {
      trim: true
    }
  },
  sub: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  email_verified: {
    type: 'boolean'
  }
}
