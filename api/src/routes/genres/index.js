const { Router } = require('express');
const axios = require('axios');
const { key } = require('../../config-env/config');
const { Videogame, Genres, } = require('../../db.js');
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


//generos:
router.get('/', async (req, res) => {

    try {

        //Esto comentado es para crear los generos dentro de la base de datos:
        // let genres = await axios.get(`https://api.rawg.io/api/genres?key=${key}`)
        // genres = genres.data.results;

        // const mapGeneros = genres.map(e => {
        //     return {
        //         id: e.id,
        //         name: e.name
        //     }
        // })

        // mapGeneros.forEach((e) => {
        //     Genres.findOrCreate({
        //         where: {
        //             name: e.name
        //         }
        //     })
        // })

        const generes = await Genres.findAll()

        res.json(generes)
    }
    catch(e){
        res.status(404).json({message: "No hay generos en la base de datos"})
    }

})

module.exports = router