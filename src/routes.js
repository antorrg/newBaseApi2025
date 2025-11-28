import { Router } from 'express'
import userRouter from './Features/user/user.routes.js'

import authRouter from './Features/auth/auth.routes.js'

const mainRouter = Router()

mainRouter.use('/api/v1/user', userRouter)
mainRouter.use('/api/v1/auth', authRouter)

export default mainRouter
