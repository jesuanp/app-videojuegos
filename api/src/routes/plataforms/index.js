const { Router } = require('express');
const axios = require('axios');
const { key } = require('../../config-env/config');
const { Videogame, Platforms } = require('../../db.js');
const { v4: uuidv4 } = require('uuid');

const router = Router();

//Plataforms:
router.get('/', async (req, res) => {

    try {

        let platforms = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${key}`)
        platforms = platforms.data.results

        let platformsPage2 = await axios.get(`https://api.rawg.io/api/platforms?key=${key}`)
        platformsPage2 = platformsPage2.data.results

        let platformsPage3 = await axios.get(`https://api.rawg.io/api/platforms?key=${key}&page=2`)
        platformsPage3 = platformsPage3.data.results

        platforms = platforms.concat(platformsPage2).concat(platformsPage3)

        platforms = platforms.map(e => {
            return {
                id: e.id,
                name: e.name
            }
        })

        platforms.forEach(e => {
            Platforms.findOrCreate({
                where:{
                    name: e.name
                }
            })
        })

        const plataformas = await Platforms.findAll()
    
        res.json(plataformas);
    }
    catch(e){
        res.status(404).send(e);
    }
})

module.exports = router