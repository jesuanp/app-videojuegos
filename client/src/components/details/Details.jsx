import React from "react";
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import s from './Details.module.css';

function Details({game}){

    return (
        <div className={s.container}>
            {
                game && game.map(e => 
                <div key={e.id} className={s.map}>
                    <h1>{e.name}</h1>
                    <div className={s.texts}>
                        <p><span>Rating:</span>  {e.rating}</p>
                        <p><span>Lanzamiento:</span>  {e.released}</p>
                        <p><span>Generos:</span>  {e.genres.map((e, i) => <span key={i}>{e.name}</span>)}</p>
                        <p><span>Plataformas:</span>  {e.platforms.map((e, i) => <span key={i+100}>{e.name}</span>)}</p>
                        
                        <p className={s.description}>Descripción:  {e.description}</p>
                    </div>
                </div>)
            }
            <div className={s.fondos}>
                <div className={s.containerImg}>
                    {
                        game && game.map((e, i) => <><img src={e.background_image} alt="videogames image" className={s.img}/></>)
                    }
                </div>
                <div className={s.degradado}></div>
                <div className={s.cortador}></div>
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        game: store.idGame
    }
}

export default connect(mapStateToProps)(Details)