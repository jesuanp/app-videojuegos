const { Router } = require('express');
const axios = require('axios');
const { key } = require('../config-env/config');
const { Videogame, Genres, Plataforms } = require('../db.js');
const { v4: uuidv4 } = require('uuid');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/games/{id}
// GET https://api.rawg.io/api/genres

//Video juegos:
router.get('/videogames', async (req, res) => {

    const getVideogame = await Videogame.findAll({
        include: Genres
    })
    
    let games = await axios.get(`https://api.rawg.io/api/games?key=${key}`)
    games = games.data.results

    games = games.map(e => {
        return {
            id: e.id,
            name: e.name,
            released: e.released,
            rating: e.rating,
            background_image: e.background_image,
            platforms: e.platforms,
            genres: e.genres
        }
    })

    games = games.concat(getVideogame)

    res.json(games)
})

router.get('/videogames/:videogame', async (req, res) => {

    const { videogame } = req.params;

    try {

        let getVideogame = await axios.get(`https://api.rawg.io/api/games?key=${key}&search=${videogame}`)
        getVideogame = getVideogame.data.results
    
        res.json(getVideogame)
    }
    catch(e){
        res.send(e)
    }


})

router.get('/videogames/:id', async (req, res) => {

    const { id } = req.params;

    try{

        let gameDetails = await axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)
        gameDetails = gameDetails.data;
    
        res.json(gameDetails)
    }
    catch(e){
        res.send(e)
    }
})

//generos:
router.get('/genres', async (req, res) => {

    try {
        let genres = await axios.get(`https://api.rawg.io/api/genres?key=${key}`)
        genres = genres.data.results;
    
        const mapGeneros = genres.map(e => {
            return {
                id: e.id,
                name: e.name
            }
        })
    
        let createdGenres;
    
        mapGeneros.forEach(e => {
            createdGenres = Genres.create({
                id: e.id,
                name: e.name
            })
        });

        res.json(mapGeneros)
    }
    catch(e){
        res.send(e)
    }

})

//Plataforms:
router.get('/plataforms', async (req, res) => {

    try {

        let plataformas = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${key}`)
        plataformas = plataformas.data.results

        plataformas = plataformas.map(e => {
            return {
                id: e.id,
                name: e.name
            }
        })
    
        res.json(plataformas);
    }
    catch(e){
        res.status(404).send(e);
    }
})

//Lo mismo que el de arriba pero muestra mas variedad
router.get('/plataforms/details', async (req, res) => {

    try {

        let plataformas = await axios.get(`https://api.rawg.io/api/platforms?key=${key}`)
        plataformas = plataformas.data.results

        let plataformsPage2 = await axios.get(`https://api.rawg.io/api/platforms?key=${key}&page=2`)
        plataformsPage2 = plataformsPage2.data.results

        plataformas = plataformas.concat(plataformsPage2)

        plataformas = plataformas.map(e => {
            return {
                id: e.id,
                name: e.name
            }
        })
    
        res.json(plataformas);
    }
    catch(e){
        res.status(404).send(e);
    }
})

module.exports = router;


const getApiById = async (id) => {
    const resAxios = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`);
    let response = resAxios.data
        return {
            id: response.id,
            name: response.name,
            // released: result.released,
            // image: result.background_image,
            // rating: result.rating,
            // platforms: result.platforms.map(e => e.platform.name),
            // genres: result.genres.map(e => e.name),
        }
}