export default {
  catchController: (controller) => {
    return (req, res, next) => {
      return controller(req, res, next).catch(next)
    }
  },

  throwError: (message, status) => {
    const error = new Error(message)
    error.status = status
    throw error
  },

  middError: (message, status) => {
    const error = new Error(message)
    error.status = status
    return error
  },

  validJson: (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).json({ success: false, data: null, message: 'Invalid JSON format' })
    } else {
      next()
    }
  }

}
