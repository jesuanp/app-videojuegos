const { Router } = require('express');
const axios = require('axios');
const { key } = require('../../config-env/config');
const { Videogame, Genres, Platforms, videogamesGenres, videogamesPlataforms } = require('../../db.js');
const { v4: uuidv4 } = require('uuid');


const router = Router();

//Video juegos:
router.get('/', async (req, res, next) => {

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

router.get('/', async (req, res) => {

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

router.get('/database', async (req, res) => {

    const gamesDB = await Videogame.findAll()

    res.json(gamesDB)
})

router.get('/:id', async (req, res) => {

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

module.exports = router