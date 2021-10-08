import React from "react";
import {connect} from 'react-redux';
import s from './Details.module.css';

function Details({game}){

    return (
        <div className={s.container}>
            {
                game && game.map(e => 
                <div key={e.id} className={s.map}>
                    <div className={s.texts} >
                        <h1>{e.name}</h1>
                        <p>Rating:  {e.rating}</p>
                        <p>Lanzamiento:  {e.released}</p>
                        <p>Generos:  {e.genres.map((e, i) => <span key={i}>{e.name}</span>)}</p>
                        <p>Plataformas:  {e.platforms.platform ? e.platforms.map((e, i) => <span key={i+100}>{e.platform.name}</span>) : e.platforms.map((e, i) => <span key={i+100}>{e.name}</span>)}</p>
                        <p>{e.description}</p>
                    </div>
                </div>)
            }
            <div className={s.fondos}>
                <div className={s.degradado}></div>
                <div className={s.containerImg}>
                    {
                        game && game.map((e, i) => <><img src={e.background_image} alt="videogames image" className={s.img}/></>)
                    }
                </div>
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