const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genres, Platforms, videogamesGenres, videogamesPlatforms } = require('../../db.js');
const { v4: uuidv4 } = require('uuid');
const { key } = require('../../config-env/config');

const router = Router()

//agregar un nuevo video juego
router.post('/add', async (req, res) => {

    const { name, descripcion, released, rating, background_image, genres, platforms } = req.body;

    try {

        if(name && descripcion && rating && genres){

            let arrGenres = genres.split(',') // "Action, RPG" --> ["Action", "RPG"]
            let arrPlatforms;
            if(platforms){

                arrPlatforms = platforms.split(',')
            }
    
            if(arrGenres.length){
    
                let id = uuidv4()
    
        
                const createdGame = await Videogame.create({
                    id,
                    name,
                    descripcion,
                    released,
                    rating,
                    background_image
                })

                createdGame.addGenres(arrGenres)
    
                if(platforms){
                    if(arrPlatforms.length){

                        createdGame.addPlatforms(arrPlatforms)
                    }
                }
        
                return res.json({created: createdGame})
            }
            return res.send('El genero no existe')
        }
        res.status(404).json({message: "Faltan paremetros"})
    }
    catch(e){
        res.status(404).json({error: e})
    }
})

router.post('/addgenres', async (req, res) => {

    const {genre, id} = req.body

    try {

        let game = await Videogame.findOne({where: {id: id}})
    
        if(genre && game){
    
            let genreAdd = await Genres.findOne({where: {name: genre}})
    
            if(genreAdd){
    
                videogamesGenres.create({
                    videogameId: game.id,
                    genreId: genreAdd.id
                })
                return res.json({message: "Genero agregado"})
            }
            return res.status(404).json({message: "Genero no encontrado"})
        }
        res.status(404).json({message: "No existe el id"})
    }
    catch(e){
        res.status(404).send('El id ingresado no existe')
    }
})

router.post('/addplatforms', async (req, res) => {

    const {platforms, id} = req.body

    try {

        let game = await Videogame.findOne({where: {id: id}})
    
        if(platforms && game){
    
            let platformsAdd = await Platforms.findOne({where: {name: platforms}})
    
            if(platformsAdd){
    
                videogamesPlatforms.create({
                    videogameId: game.id,
                    platformId: platformsAdd.id
                })
                return res.json({message: "plataforma agregada"})
            }
            return res.json({message: "plataforma no encontrada"})
        }
        res.status(404).json({message: "No existe el id"})
    }
    catch(e){
        res.status(404).send('El id ingresado no existe')
    }
})

module.exports = router