import infoVideoGame from './vgdata/infoVideoGame.js'
import { vgmService } from '../src/Modules/gameWorldEccommerce/videogame/videoGame.routes.js'

const vgBulk = async () => {
  for (const game of infoVideoGame) {
    try {
      await vgmService.create(game, 'name')
      console.log(`Successfully created: ${game.name}`)
    } catch (error) {
      console.error(
        `Error when posting the game "${game.name}": ${error.message}`
      )
    }
  }
}

export default vgBulk
