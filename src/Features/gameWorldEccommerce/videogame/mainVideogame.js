import { prisma } from '../../../Configs/database.js'
import VideogameRepository from './VideogameRep.js'
import VidegameService from './VideogameServ.js'
import BaseController from '../../../Shared/Controllers/BaseController.js'

const vgmRep = new VideogameRepository(prisma.videogame, 'genre', 'platform')

export const vgmService = new VidegameService(vgmRep, 'name')

const vg = new BaseController(vgmService)

export default {
  getAll: vg.getAll
}
