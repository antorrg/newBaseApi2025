import express from 'express'
import gameRouter from './videogame/videoGame.routes.js'
import platformRouter from './platforms/platform.routes.js'
import genresRouter from './genres/genre.routes.js'
import cartRouter from './cart/cart.routes.js'
import buySellRouter from './buySell/buySell.routes.js'

const mainVideogame = express.Router()

mainVideogame.use('/videogame', gameRouter)

mainVideogame.use('/videogame/platform', platformRouter)

mainVideogame.use('/videogame/genre', genresRouter)

mainVideogame.use('/cart', cartRouter)

mainVideogame.use('/buySell', buySellRouter)

export default mainVideogame
