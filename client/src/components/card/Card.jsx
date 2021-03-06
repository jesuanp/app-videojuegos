import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import { searchGames, gameById, getGenres, getPlatforms } from '../../redux/actions'
import { NavLink, useHistory } from 'react-router-dom'
import gif from '../images/obojrz5.gif'
import s from './Card.module.css'
import Paginado from '../paginado/Paginado';


function Card({searchVideogames, searchGames, gameById, getGenres, getPlatforms, pagina, genres, platforms}){

    if(searchVideogames[0]?.message == 'false') var gameDB = true

    const [currentPage, setCurrentPage] = useState(1)
    
    const totalVideogames = 15
    
    let games = searchVideogames.slice(currentPage*totalVideogames-15, currentPage*totalVideogames)
    
    let myHistory = useHistory()
    
    if(currentPage === 1){
        myHistory.push(`/app/home/${currentPage}`)
    }
    
    function pages(num){
        setCurrentPage(num)
        myHistory.push(`/app/home/${num}`)
    }
    
    useEffect(()=>{
        if(!games.length){
            searchGames()
            getPlatforms()
        }
        if(!genres.length) getGenres();
        if(!platforms.length) getPlatforms();
        pagina = 2
    }, [])
        
    const scrollUp = () => {
        let currentScroll = document.documentElement.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(scrollUp)
            window.scrollTo (0, currentScroll - (currentScroll / 1));
        }
    }

    if(gameDB && searchVideogames[0]?.message == 'false') return (<div><h2>No hay videojuegos en la base de datos</h2></div>)
        
    return(
        <>
        <div className={s.cards}>
            {
                games.length ? games.map(e => 
                
                <div className={s.card} key={e.id} onClick={()=>gameById(e.id)}>
                    <NavLink to={`/app/${e.id}`} className={s.NavLink} onClick={scrollUp}>
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
                ): <div className={s.loader}></div>
            }
            
        </div>
        <Paginado searchVideogames={searchVideogames} totalVideogames={totalVideogames} pages={pages} currentPage={currentPage}/>
        </>
    )
}

const mapStateToProps = (store) => {
    return {
        searchVideogames: store.games,
        genres: store.genres,
        platforms: store.platforms
    }
}

export default connect (mapStateToProps, {searchGames, gameById, getGenres, getPlatforms})(Card)