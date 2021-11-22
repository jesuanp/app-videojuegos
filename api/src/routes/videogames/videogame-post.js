const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genres, Platforms, videogamesGenres, videogamesPlatforms } = require('../../db.js');
const { v4: uuidv4 } = require('uuid');
const { key } = require('../../config-env/config');

const router = Router()

//agregar un nuevo video juego

router.post('/add', async (req, res) => {

    const { name, description, released, rating, background_image, genres, platforms } = req.body;

    // try {

        if(name && description && genres){

            var arrGenres = [];

            if(!Array.isArray(genres)){

                arrGenres = genres.split(', ') // "Action, RPG" --> ["Action", "RPG"]
            }

            const arrgeneros = await Genres.findAll({
                where: {
                    name: arrGenres.length > 0 ? arrGenres : genres
                }
            })

            var arrPlatforms = [];
            if(platforms){

                if(!Array.isArray(platforms)){

                    arrPlatforms = platforms.split(', ')
                }

                var arrplataformas = await Platforms.findAll({
                    where: {
                        name: arrPlatforms.length > 0 ? arrPlatforms : platforms
                    }
                })

                if(arrplataformas.length === arrPlatforms.length || arrplataformas.length === platforms.length){
                    
                } else res.json({message: "La plataforma ingresada no existe"})
            }

            if(arrgeneros.length === genres.length || arrgeneros.length === arrGenres.length){

                
                if(arrGenres.length > 0 || genres.length > 0){
        
                    let id = uuidv4()

                    let newName = name[0].toUpperCase()+name.slice(1)
            
                    const createdGame = await Videogame.create({
                        id,
                        name: newName,
                        description,
                        released,
                        rating,
                        background_image,
                        db: true
                    })
                    
                    createdGame.addPlatforms(arrPlatforms.length > 0 ? arrPlatforms : platforms)
                    createdGame.addGenres(arrGenres.length > 0 ? arrGenres : genres)
        
            
                    return res.json({message: {
                        ...createdGame.dataValues, 
                        platforms: arrPlatforms.length > 0 ? arrPlatforms : platforms,
                        genres: arrGenres.length > 0 ? arrGenres : genres
                    }})
                }
            }
    
            return res.status(404).json({message: "El genero no existe"})
        }
        res.status(404).json({message: "Faltan paremetros"})
    // }
    // catch(e){
    //     res.status(404).json({error: e})
    // }
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