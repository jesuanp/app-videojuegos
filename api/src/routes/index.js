const { Router } = require('express');
const axios = require('axios');
const { key } = require('../config-env/config');
const { Videogame, Genres, Plataforms, videogamesGenres, videogamesPlataforms } = require('../db.js');
const { v4: uuidv4 } = require('uuid');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerVideogames = require('./videogames/index')
const routerGenres = require('./genres/index')
const routerPlatforms = require('./plataforms/index')
const routerGamesPost = require('./videogames/videogame-post')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/games/{id}
// GET https://api.rawg.io/api/genres


router.use('/api/videogames', routerVideogames)
router.use('/api/genres', routerGenres)
router.use('/api/platforms', routerPlatforms)
router.use('/api/videogame', routerGamesPost)





module.exports = router;

