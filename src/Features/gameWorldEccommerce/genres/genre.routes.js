import express from 'express'
import { prisma } from '../../../Configs/database.js'
import GeneralRepository from '../../../Shared/Repositories/GeneralRepository.js'
import GeneralServicee from '../../../Shared/Services/GeneralService.js'
import BaseController from '../../../Shared/Controllers/BaseController.js'
import { Validator } from 'req-valid-express'
import GenresHelp from './genresHelp.js'

const genRep = new GeneralRepository(prisma.genre)
const genServ = new GeneralServicee(genRep, 'name', false)
const genres = new BaseController(genServ)

const genresRouter = express.Router()

genresRouter.get('/pepe', genres.getAll('', true))
genresRouter.get(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  genres.getById
)

genresRouter.put(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  Validator.validateBody(GenresHelp.update),
  genres.update
)

genresRouter.delete(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.INT),
  genres.delete
)

genresRouter.post(
  '/',
  Validator.validateBody(GenresHelp.create),
  genres.create
)

genresRouter.get(
  '/',
  genres.getAllSimple
)
export default genresRouter
