const { Router } = require('express');
const axios = require('axios');
const { key } = require('../config-env/config');
const { Videogame, Genres, Plataforms, videogamesGenres, videogamesPlataforms } = require('../db.js');
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
router.get('/videogames/', async (req, res, next) => {

    const { videogame } = req.query;

    if(videogame){

        try {

            const games = await Videogame.findAll({
                where: {
                    name: videogame
                },
                include: Genres
            })
    
            let getVideogame = await axios.get(`https://api.rawg.io/api/games?key=${key}&search=${videogame}`)
            getVideogame = getVideogame.data.results
        
            if(!getVideogame.length){
                getVideogame = {message: "juego no encontrado"}
            }

            getVideogame = getVideogame.concat(games)

            res.json(getVideogame)
        }
        catch(e){
            res.send(e)
        }
    } else 

    next()
})

router.get('/videogames', async (req, res) => {

    try {

        const getVideogame = await Videogame.findAll({
            include: Genres
        })
        
        let games = await axios.get(`https://api.rawg.io/api/games?key=${key}`)
        games = games.data.results;
    
        let gamesPageTwo = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=2`)
        gamesPageTwo = gamesPageTwo.data.results;
    
        let gamesPageTres = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=3`)
        gamesPageTres = gamesPageTres.data.results;
    
        let gamesPageCuatro = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=4`)
        gamesPageCuatro = gamesPageCuatro.data.results;
    
        let gamesPageCinco = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=5`)
        gamesPageCinco = gamesPageCinco.data.results;
    
        games = games.concat(gamesPageTwo).concat(gamesPageTres).concat(gamesPageCuatro).concat(gamesPageCinco)
    
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
    }
    catch(e){
        res.send('Error al buscar los juegos')
    }
})

router.get('/videogames/database', async (req, res) => {

    const gamesDB = await Videogame.findAll()

    res.json(gamesDB)
})

router.get('/videogames/:id', async (req, res) => {

    const { id } = req.params;

    try {
        if(!Number(id)){
            let juego = await Videogame.findByPk(id, {include: Genres})
    
            res.json(juego)
        }
       
        let gameDetails = await axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)
            let data = gameDetails.data;
            
            gameDetails = {
                id: data.id,
                name: data.name,
                released: data.released,
                background_image: data.background_image,
                rating: data.rating,
                description: data.description,
                genres: data.genres,
                platforms: data.platforms
            }
            
        return res.send(gameDetails);

    }
    catch(e){
        res.send('Id no encontrado')
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
        
        mapGeneros.forEach((e) => {
            Genres.findOrCreate({
                where: {
                    name: e.name
                }
            })
        })

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

        let plataformas2 = await axios.get(`https://api.rawg.io/api/platforms?key=${key}`)
        plataformas2 = plataformas2.data.results

        let plataformsPage3 = await axios.get(`https://api.rawg.io/api/platforms?key=${key}&page=2`)
        plataformsPage3 = plataformsPage3.data.results

        plataformas = plataformas.concat(plataformas2).concat(plataformsPage3)

        plataformas = plataformas.map(e => {
            return {
                id: e.id,
                name: e.name
            }
        })

        plataformas.forEach(e => {
            Plataforms.findOrCreate({
                where:{
                    name: e.name
                }
            })
        })
    
        res.json(plataformas);
    }
    catch(e){
        res.status(404).send(e);
    }
})



//agregar un nuevo video juego
router.post('/videogames/add', async (req, res) => {

    const { name, descripcion, released, rating, background_image, genres, plataforms } = req.body;

    if(name && descripcion && rating && genres){

        const genre = await Genres.findOne({
            where: {
                name: genres
            }
        })

        if(genre){

            let id = uuidv4()

    
            const createdGame = await Videogame.create({
                id,
                name,
                descripcion,
                released,
                rating,
                background_image
    
            })
    
            const CreateRelation = videogamesGenres.create({
                videogameId: id,
                genreId: genre.id
            })
    
            return res.json([createdGame])
        }
        res.send('El genero no existe')
    }
})

module.exports = router;

