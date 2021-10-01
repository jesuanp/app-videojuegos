const { Router } = require('express');
const axios = require('axios');
const { key } = require('../../config-env/config');
const { Videogame, Platforms } = require('../../db.js');
const { v4: uuidv4 } = require('uuid');

const router = Router();

//Plataforms:
router.get('/', async (req, res) => {

    try {

        //Esto comentado es para crear las plataformas dentro de la base de datos:
        // let platforms = axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${key}`)
        // // platforms = platforms.data.results

        // let platformsPage2 = axios.get(`https://api.rawg.io/api/platforms?key=${key}`)
        // // platformsPage2 = platformsPage2.data.results

        // let platformsPage3 = axios.get(`https://api.rawg.io/api/platforms?key=${key}&page=2`)
        // // platformsPage3 = platformsPage3.data.results

        // const datos = await Promise.all([platforms, platformsPage2, platformsPage3])

        // platforms = datos[0].data.results;
        // platformsPage2 = datos[1].data.results;
        // platformsPage3 = datos[2].data.results;

        // platforms = platforms.concat(platformsPage2).concat(platformsPage3)

        // platforms = platforms.map(e => {
        //     return {
        //         id: e.id,
        //         name: e.name
        //     }
        // })

        // platforms.forEach(e => {
        //     Platforms.findOrCreate({
        //         where:{
        //             name: e.name
        //         }
        //     })
        // })

        const plataformas = await Platforms.findAll()
    
        res.json(plataformas);
    }
    catch(e){
        res.status(404).json({message: "No hay plataformas dentro de la base de datos"});
    }
})

module.exports = router