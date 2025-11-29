import express from 'express'
import { User } from '../../Configs/database.js'
import { UserRepository } from './UserRepository.js'
import { BaseService } from '../../Shared/Services/BaseService.js'
import { BaseController } from '../../Shared/Controllers/BaseController.js'
import vld from './validHelpers/index.js'
import { UserDTO, dataEmpty } from './UserDTO.js'
import { UserMiddlewares } from './UserMiddlewares.js'
import { Validator } from 'req-valid-express'
import { allowedBodyValuesByRules, allowedQueryValuesByRules } from '../../Shared/Middlewares/allowedQueryValues.js'

export const userRepository = new UserRepository(User, UserDTO.parser, dataEmpty)
const userService = new BaseService(userRepository, 'User', 'email', UserDTO.parser, false, null)
const userController = new BaseController(userService)

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const regexPassword = /^(?=.*[A-Z]).{8,}$/
const userRouter = express.Router()

userRouter.post(
  '/create',
  Validator.validateBody(vld.userCreate),
  Validator.validateRegex(regexEmail, 'email'),
  Validator.validateRegex(regexPassword, 'password', 'It must be at least 8 characters long and one uppercase letter'),
  UserMiddlewares.createUser,
  userController.create
)
userRouter.get('/',
  userController.getAll
)
userRouter.get(
  '/pages',
  Validator.validateQuery(vld.userQueries),
  allowedQueryValuesByRules({
    searchFields: ['email', 'role'],
    sortBy: ['email'],
    order: ['ASC', 'DESC']
  }),
  userController.adminGetWithPagination
)
userRouter.get('/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  userController.getById
)
userRouter.put(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  Validator.validateBody(vld.update),
  Validator.validateRegex(regexEmail, 'email'),
  userController.update
)
userRouter.patch(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  Validator.validateBody(vld.upgrade),
  allowedBodyValuesByRules({
    role: ['Admin', 'User']
  }),
  userController.update
)
userRouter.delete(
  '/:id',
  Validator.paramId('id', Validator.ValidReg.UUIDv4),
  userController.delete
)

export default userRouter
