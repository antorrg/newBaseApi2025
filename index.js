/* Servidor creado el dia 26/03/2025
Api REST de Express.js con prisma */
import server from './src/app.js'
const Port = process.env.PORT || 3000

server.listen(Port, () => {
  console.log(`Server is listening on port: ${Port}`)
})
