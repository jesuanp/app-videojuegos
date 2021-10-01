const { Router } = require('express');
const axios = require('axios');
const { key } = require('../../config-env/config');
const { Videogame, Genres, Platforms } = require('../../db.js');
const { v4: uuidv4 } = require('uuid');


const router = Router();

//Video juegos:
router.get('/', async (req, res, next) => {

    const { name } = req.query;

    if(name){

        try {

            const games = await Videogame.findAll({
                where: {
                    name: name
                },
                include: [{
                    model: Genres, 
                    attributes: ['name'],
                    through: {
                        attributes:[]
                    }
                }, {
                    model: Platforms, 
                    attributes: ['name'],
                    through: {
                        attributes:[]
                    }
                }]
            })
    
            let getVideogame = await axios.get(`https://api.rawg.io/api/games?key=${key}&search=${name}`)
            getVideogame = getVideogame.data.results
        
            if(!getVideogame.length){
                getVideogame = {message: "juego no encontrado"}
            }

            getVideogame = getVideogame.concat(games)

            res.json(getVideogame)
        }
        catch(e){
            res.status(404).json({message: "No se encontro el video juego"})
        }
    } else 

    next()
})

router.get('/', async (req, res) => {

    try {

        const getVideogame = await Videogame.findAll({
            include: [{
                model: Genres, 
                attributes: ['name'],
                through: {
                    attributes:[]
                }
            }, {
                model: Platforms, 
                attributes: ['name'],
                through: {
                    attributes:[]
                }
            }]
        })
        
        let games = axios.get(`https://api.rawg.io/api/games?key=${key}`)
    
        let gamesPageTwo = axios.get(`https://api.rawg.io/api/games?key=${key}&page=2`)
    
        let gamesPageTres = axios.get(`https://api.rawg.io/api/games?key=${key}&page=3`)
    
        let gamesPageCuatro = axios.get(`https://api.rawg.io/api/games?key=${key}&page=4`)
    
        let gamesPageCinco = axios.get(`https://api.rawg.io/api/games?key=${key}&page=5`)

        let datos = await Promise.all([games, gamesPageTwo, gamesPageTres, gamesPageCuatro, gamesPageCinco])
    
        games = datos[0].data.results;
        gamesPageTwo = datos[1].data.results;
        gamesPageTres = datos[2].data.results;
        gamesPageCuatro = datos[3].data.results;
        gamesPageCinco = datos[4].data.results;

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
        res.status(404).json({message: 'Error al buscar los juegos'})
    }
})

router.get('/database', async (req, res) => {

    const gamesDB = await Videogame.findAll({
        include: [{
            model: Genres, 
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }, {
            model: Platforms, 
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }]
    })

    if(gamesDB.length){

        return res.json(gamesDB)
    }
    res.json({message: 'No hay juegos en la base de datos'})
})

router.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        if(!Number(id)){
            let juego = await Videogame.findByPk(id, {
                include: [{
                    model: Genres, 
                    attributes: ['name'],
                    through: {
                        attributes:[]
                    }
                }, {
                    model: Platforms, 
                    attributes: ['name'],
                    through: {
                        attributes:[]
                    }
                }]
            })
    
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
        res.status(404).json({message: 'El id ingresado no existe'})
    }
})

module.exports = router