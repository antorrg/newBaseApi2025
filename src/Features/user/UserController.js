import {BaseController} from '../../Shared/Controllers/BaseController.js'

export class UserController{
    constructor(service){
        super(service)
    }
    updatePassword = async(req, res) => {
        const {id} = req.params
        const data = req.body
        const response = await this.service.updatePassword({id, ...data})
        return BaseController.responder(res, 200, true, response.message, response.results)
    } 
    resetPassword = async(req, res) => {
    const {id} = req.params
    const data = req.body
    const response = await this.service.resetPassword(id, data)
    return BaseController.responder(res, 200, true, response.message, response.results)
    } 
}