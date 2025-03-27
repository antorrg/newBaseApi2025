/* Servidor creado el dia 26/03/2025
Api REST de Express.js con prisma */
import server from './src/app.js'
import env from './src/Configs/envConfig.js'
import { startApp } from './src/Configs/database.js'

server.listen(env.Port, async () => {
  try {
    await startApp()
    console.log(`Server is listening on port:${env.Port}\nServer in ${env.Status}`)
  } catch (error) {
    console.error('Error conecting prisma database: ', error)
  }
})
