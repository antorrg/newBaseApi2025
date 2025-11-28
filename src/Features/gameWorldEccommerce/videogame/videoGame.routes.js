import express from 'express'
import { prisma } from '../../../Configs/database.js'
import VideogameRepository from './VideogameRep.js'
import VideogameService from './VideogameServ.js'
import VgController from './vg.controller.js'
import VgHelp from './VgHelp.js'
import { Validator } from 'req-valid-express'

const vgmRep = new VideogameRepository(prisma.videogame, 'genre', 'platform')

export const vgmService = new VideogameService(vgmRep, 'name', false)

const vg = new VgController(vgmService)

const gameRouter = express.Router()

gameRouter.get(
  '/',
  Validator.validateQuery(VgHelp.vgQuery),
  vg.getAll('name', false, VgHelp.infoCleanerAll))

export default gameRouter

/* rutas videogame:
gamesRouter.get('/games', game.getGamesAdminHandler) // Libres
gamesRouter.get('/games/:id', videoG.getDetailHandler) // Modulos games/videogames (Libres)
gamesRouter.get('/videogames', videoG.getVideogamesHandler)// Modulos games/videogames (Libres)
gamesRouter.post('/games', verifyToken, game.createGameHandler)// Aqui cometi el error de dejarlo asi.
gamesRouter.put('/games/:id', verifyToken, game.gameUpdaterHand) // Modulo games/videogames
gamesRouter.delete('/games/:id', verifyToken, game.delGameHand) */

/* rutas platform
platformRouter.get('/platforms', game.getPlatformHandler) // Protegida
platformRouter.post('/platform', verifyToken, game.createPlatformHandler)
platformRouter.put('/platform/:id', verifyToken, game.platformUpdaterHand) // Modulo platform
platformRouter.delete('/platforms/:id', verifyToken, game.delPlatformHand)
*/

/* rutas genre
genresRouter.get('/genres', game.getGenresHandler) // Protegida
genresRouter.post('/genre', verifyToken, game.createGenreHandler)
genresRouter.put('/genre/:id', verifyToken, game.genreUpdaterHand) // Modulo genre
genresRouter.delete('/genres/:id', verifyToken, game.delGenreHand)
*/
