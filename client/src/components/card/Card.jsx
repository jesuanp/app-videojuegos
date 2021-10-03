import React, {useEffect} from "react";
import {connect} from 'react-redux'
import { searchGames } from '../../redux/actions'
import s from './Card.module.css'

function Card({searchVideogames, game, searchGames}){

    useEffect(()=>{
        searchGames()
    }, [])

    function videogames(){
        if(game.length > 0) return game;
        else return searchVideogames
    }

    return(
        <div className={s.cards}>
            {
                videogames().map(e => <div className={s.card}>
                    <div>
                    <p>{e.name}</p>
                    <p>released: {e.released}</p>
                    <p>rating: {e.rating}</p>
                    <p className={s.genres}>generos: {e.genres.map(el => <p className={s.genre}>{el.name}</p>)}</p>
                    </div>
                    <div>
                    <img className={s.img} src={e.background_image} alt="videogame image" />
                    </div>
                </div>)
            }
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        searchVideogames: store.games,
        game: store.nameGame
    }
}

export default connect (mapStateToProps, {searchGames})(Card)