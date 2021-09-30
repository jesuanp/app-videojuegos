const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genres, Platforms, videogamesGenres, videogamesPlatforms } = require('../../db.js');
const { v4: uuidv4 } = require('uuid');

const router = Router()

//agregar un nuevo video juego
router.post('/add', async (req, res) => {

    const { name, descripcion, released, rating, background_image, genres, platforms } = req.body;

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
    
            videogamesGenres.create({
                videogameId: id,
                genreId: genre.id
            })


            if(platforms){

                const platform = await Platforms.findOne({
                    where: {
                        name: platforms
                    }
                })

                if(platform){    

                    videogamesPlatforms.create({
                        videogameId: id,
                        platformId: platform.id
                    })
                } else return res.send('La plataforma no existe')
            }
    
            return res.json([createdGame])
        }
        res.send('El genero no existe')
    }
})

module.exports = router