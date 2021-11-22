const { Videogame, Genres, Platforms } = require('../../db.js');
const { Router } = require('express');

const router = Router();

router.delete('/:id', async (req, res) => {

    const {id} = req.params;

    try{

        if(!Number(id)){

            await Videogame.destroy({
                where: {
                    id: id
                }
            })
        
            return res.json({message: true})
        }
    }
    catch(err){
        console.log(err.message);
        res.json({message: false})
    }
})

module.exports = router
