/* Servidor creado el dia 26/03/2025
Api REST de Express.js con prisma */
import server from './src/app.js'
import env from './src/Configs/envConfig.js'
import { startApp } from './src/Configs/database.js'
import logger from './src/Configs/logger.js'

async function serverBootstrap(){
  try {
    await startApp()
    server.listen(env.Port, () => {
      logger.info(`Server is listening on port:${env.Port}\nServer in ${env.Status}`)
      console.log(`Server is listening on port:${env.Port}\nServer in ${env.Status}`)})
    } catch (error) {
      logger.error('Error conecting prisma database: ', error)
      process.exit(1)
    }
}

serverBootstrap()