export default {
  email: {
    type: 'string'
  },
  password: {
    type: 'string'
  },
  picture: {
    type: 'string',
    default: 'https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg',
    sanitize: {
      trim: true
    }
  }
}
