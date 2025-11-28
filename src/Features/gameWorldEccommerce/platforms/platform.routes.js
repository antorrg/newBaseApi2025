import express from 'express'
import { prisma } from '../../../Configs/database.js'
import GeneralRepository from '../../../Shared/Repositories/GeneralRepository.js'
import GeneralServicee from '../../../Shared/Services/GeneralService.js'
import BaseController from '../../../Shared/Controllers/BaseController.js'
import { Validator } from 'req-valid-express'
import PlatformHelp from './platformHelp.js'

const platRep = new GeneralRepository(prisma.platform)
const platServ = new GeneralServicee(platRep, 'name', false)
const platforms = new BaseController(platServ)

const platformRouter = express.Router()

platformRouter.post(
  '/',
  Validator.validateBody(PlatformHelp.create),
  platforms.create
)

platformRouter.get(
  '/',
  platforms.getAllSimple
)

platformRouter.get(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  platforms.getById
)

platformRouter.put(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  Validator.validateBody(PlatformHelp.update),
  platforms.update
)

platformRouter.delete(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  platforms.delete
)

export default platformRouter
