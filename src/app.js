import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const server = express()
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Error del servidor'
  console.error('Error del servidor: ', err.stack)
  res.status(status).json({
    success: false,
    message,
    results: 'Algo salió mal'
  })
})
export default server
