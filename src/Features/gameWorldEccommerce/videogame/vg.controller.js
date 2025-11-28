import eh from '../../../Configs/errorHandlers.js'
import BaseController from '../../../Shared/Controllers/BaseController.js'

export default class VgController extends BaseController {
  constructor (service) {
    super(service)
  }

  getAll = (searchField = '', isAdmin = false, parseFn = null) => {
    return eh.catchController(async (req, res) => {
      const queryObject = req.context.query || {}
      console.log(queryObject)
      const response = await this.service.getAll(searchField, queryObject, isAdmin)
      const infoParsed = parseFn ? response.data.data.map(dat => parseFn(dat)) : response.data.data
      const finalData = { info: response.data.info, data: infoParsed }
      if (response.cache === true) { return BaseController.responder(res, 203, true, null, finalData) }
      return BaseController.responder(res, 200, true, null, finalData)
    })
  }
}
