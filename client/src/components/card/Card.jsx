import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import { searchGames, gameById, getGenres, getPlatforms } from '../../redux/actions'
import { NavLink } from 'react-router-dom'
import gif from '../images/obojrz5.gif'
import s from './Card.module.css'
import Paginado from '../paginado/Paginado';


function Card({searchVideogames, game, searchGames, gameById, getGenres, getPlatforms}){

    const [currentPage, setCurrentPage] = useState(1)
    const [totalVideogames, setTotalVideogames] = useState(15)

    const totalPages = Math.ceil(searchVideogames / totalVideogames)

    let games = searchVideogames.slice(currentPage*totalVideogames-15, currentPage*totalVideogames)

    function pages(num){
        setCurrentPage(num)
    }

    useEffect(()=>{
        searchGames()
        getGenres()
        getPlatforms()
    }, [])

    const scrollUp = () => {
        let currentScroll = document.documentElement.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(scrollUp)
            window.scrollTo (0, currentScroll - (currentScroll / 1));
        }
    }

    return(
        <>
        <div className={s.cards}>
            {
                games.length ? games.map(e => 
                
                <div className={s.card} key={e.id} onClick={()=>gameById(e.id)}>
                    <NavLink to="detalles" className={s.NavLink} onClick={scrollUp}>
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
                ): <img src={gif} alt="Gif de cargando" className={s.gif} />
            }
            
        </div>
        <Paginado searchVideogames={searchVideogames} totalVideogames={totalVideogames} pages={pages}/>
        </>
    )
}

const mapStateToProps = (store) => {
    return {
        searchVideogames: store.games,
        game: store.nameGame
    }
}

export default connect (mapStateToProps, {searchGames, gameById, getGenres, getPlatforms})(Card)