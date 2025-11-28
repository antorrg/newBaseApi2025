export class BaseController {
  constructor (service) {
    this.service = service
  }

  static responder (
    res,
    status,
    success,
    message,
    results
  ) {
    return res.status(status).json({ success, message, results })
  }

  getAll = async (req, res) => {
    const response = await this.service.getAll()
    return BaseController.responder(res, 200, true, response.message, response.results)
  }

  getWithPagination = async (req, res) => {
    const response = await this.service.getWithPagination(req.context.query)
    return BaseController.responder(res, 200, true, response.message, {
      info: response.results.info,
      data: response.results.data
    })
  }

  getOne = async (req, res) => {
    const { search, searchField } = req.context.query
    const response = await this.service.getOne(search, searchField)
    return BaseController.responder(res, 200, true, response.message, response.results)
  }

  adminGetWithPagination = async (req, res) => {
    const isAdmin = true
    const response = await this.service.getWithPagination(req.context.query, isAdmin)
    return BaseController.responder(res, 200, true, response.message, {
      info: response.results.info,
      data: response.results.data
    })
  }

  adminGetOne = async (req, res) => {
    const isAdmin = true
    const { search, searchField } = req.context.query
    const response = await this.service.getOne(search, searchField, isAdmin)
    return BaseController.responder(res, 200, true, response.message, response.results)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const response = await this.service.getById(id)
    return BaseController.responder(res, 200, true, response.message, response.results)
  }

  create = async (req, res) => {
    const data = req.body
    const response = await this.service.create(data)
    return BaseController.responder(res, 201, true, response.message, response.results)
  }

  update = async (req, res) => {
    const { id } = req.params
    const data = req.body
    const response = await this.service.update(id, data)
    return BaseController.responder(res, 200, true, response.message, response.results)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const response = await this.service.delete(id)
    return BaseController.responder(res, 200, true, response.message, response.results)
  }
}
