import express from 'express'
import { User } from '../../Configs/database.js'
import { UserRepository } from './UserRepository.js'
import { BaseService } from '../../Shared/Services/BaseService.js'
import { BaseController } from '../../Shared/Controllers/BaseController.js'
import vld from './validHelpers/index.js'
import { UserDTO, dataEmpty } from './UserDTO.js'
import { Validator } from 'req-valid-express'

export const userRepository = new UserRepository(User, UserDTO.parser, dataEmpty)
const userService = new BaseService(userRepository, 'User', 'email', UserDTO.parser, false, null)
const userController = new BaseController(userService)

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const userRouter = express.Router()

userRouter.post(
  '/create',
  Validator.validateBody(vld.userCreate),
  Validator.validateRegex(regexEmail, 'email'),
  userController.create
)
userRouter.get('/',
  userController.getAll
)
userRouter.get(
  '/pages',
  Validator.validateQuery(vld.userQueries),
  userController.getWithPagination
)
userRouter.get('/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  userController.getById
)
userRouter.put(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  Validator.validateBody(vld.userUpdate),
  Validator.validateRegex(regexEmail, 'email'),
  userController.update
)
userRouter.delete(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  userController.delete
)

export default userRouter
