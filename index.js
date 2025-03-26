/* Servidor creado el dia 26/03/2025
Api REST de Express.js con prisma */
import server from './src/app.js'
import env from './src/Configs/envConfig.js'


server.listen(env.Port, () => {
  console.log(`Server is listening on port:${env.Port}\nServer in ${env.Status}`)
})
