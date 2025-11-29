import envConfig from './envConfig.js'
import logger from './logger.js'

class CustomError extends Error {
  constructor (log = false, logger = null) {
    super()
    this.log = log
    this.logger = logger
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  throwError (message, status) {
    const error = new Error(message)
    error.status = Number(status) || 500
    error.contexts = []
    throw error
  }

  processError (err, contextMessage = '') {
    if (!Array.isArray(err.contexts)) err.contexts = []
    // evita duplicados consecutivos
    const last = err.contexts[err.contexts.length - 1]
    if (!last || last !== contextMessage) err.contexts.push(contextMessage)
    throw err
  }
}

const errorHandler = new CustomError(envConfig.LogErrors, logger)

export const catchController = (controller) => {
  return (req, res, next) => controller(req, res, next).catch(next)
}

export const middError = (message, status) => {
  const error = new Error(message)
  error.status = status || 400
  if (!Array.isArray(err.contexts)) error.contexts = []
  // evita duplicados consecutivos
  const last = error.contexts[error.contexts.length - 1]
  if (!last || last !== 'Error middleware') err.contexts.push('Error middleware')
  return error
}

export const throwError = errorHandler.throwError.bind(errorHandler)
export const processError = errorHandler.processError.bind(errorHandler)

export const jsonFormat = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.message.includes('JSON')) {
    return next(middError('Invalid JSON format', 400))
  }
  next(err)
}

export const notFoundRoute = (req, res, next) => {
  next(middError('Not Found', 404))
}

export const errorEndWare = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal server error'

  logger.error({ err }, `${message}`)

  res.status(status).json({
    success: false,
    message,
    results: null
  })
}

export default {
  errorEndWare,
  catchController,
  throwError,
  processError,
  middError,
  jsonFormat,
  notFoundRoute
}
