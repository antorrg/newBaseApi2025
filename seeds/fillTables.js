import dataBulk from './dataBulk.js'
import { Videogame } from '../src/Configs/database.js'
import genresData from './vgdata/genres.js'
import platformsData from './vgdata/platforms.js'
import vgBulk from './vgBulk.js'

const fillTables = async () => {
  try {
    await dataBulk(prisma.genre, 'genre', genresData)
    await dataBulk(prisma.platform, 'platform', platformsData)
    const existingGames = await Videogame.findAll()
    if (!existingGames) {
      await vgBulk()
      console.log('Videogame table filled successfully!')
    } else {
      console.log('The Videogame table already contains data.') //
    }
  } catch (error) {
    console.error('Error during seeding:', error.message)
  }
}
export default fillTables
