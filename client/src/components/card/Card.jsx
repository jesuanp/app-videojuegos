import React, {useEffect} from "react";
import {connect} from 'react-redux'
import { searchGames, gameById, getGenres, getPlatforms } from '../../redux/actions'
import { NavLink } from 'react-router-dom'
import s from './Card.module.css'


function Card({searchVideogames, game, searchGames, gameById, getGenres, getPlatforms}){

    useEffect(()=>{
        searchGames()
        getGenres()
        getPlatforms()
    }, [])

    function videogames(){
        if(game.length > 0) return game;
        else return searchVideogames
    }

    return(
        <div className={s.cards}>
            {
                videogames().map(e => 
                
                <div className={s.card} key={e.id} onClick={()=>gameById(e.id)}>
                    <NavLink to="detalles" className={s.NavLink}>
                        <div>
                            <p className={s.name}>{e.name}</p>
                        </div>

                        <div className={s.cardLow}>
                            <div className={s.text}>
                                <p>rating: {e.rating}</p>
                                <p className={s.genres}><span>genres:</span> {e.genres.map((el, i) => { if(i < 3)return <span className={s.genre} key={i}>{el.name}</span>})}</p>
                            </div>
                        </div>

                        <div>
                            <img className={s.img} src={e.background_image} alt="videogame image" />
                        </div>
                    </NavLink>
                </div>
                )
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

export default connect (mapStateToProps, {searchGames, gameById, getGenres, getPlatforms})(Card)