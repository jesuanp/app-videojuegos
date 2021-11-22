import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom'
import s from './Details.module.css';
import { deleteVideogame, deleteVideogameReducer, resetDeleteApproved, gameById } from '../../redux/actions'

function Details({game, deleteApproved, deleteVideogame, deleteVideogameReducer, resetDeleteApproved, gameById}){

    const myHistory = useHistory()

    const {id} = useParams()

    useEffect(()=>{
        if(!game.length){
            gameById(id)
        }
    }, [id])

    const [stateVentana, setStateVentana] = useState(false);
    const [idVideogame, setIdVideogame] = useState(null);

    function deleteGameById(){
        deleteVideogame(idVideogame);
    }

    useEffect(()=>{

        if(deleteApproved && deleteApproved.message){
            deleteVideogameReducer(game[0].id);

            setTimeout(()=>{

                myHistory.push('/app/home/1');
                resetDeleteApproved()
            }, 1000)
        }
    }, [deleteApproved])

    return (<>
        <div className={stateVentana ? s.fondoVenataVisible : s.fondoVenata}>
            <div className={s.ventanaEmergente}>
                <div className={s.close} onClick={()=>{setStateVentana(false); resetDeleteApproved();}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-x-lg" viewBox="0 0 16 16"><path d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg></div>
                <span className={s.spanVentana}>¿Éstas seguro que quieres eliminar este videojuego?</span>
                <div className={s.rayita}></div>
                <button className={stateVentana && s.btnVentana} onClick={()=>{setStateVentana(false); resetDeleteApproved();}}>No</button>
                <button className={stateVentana && s.btnVentana} onClick={()=>deleteGameById()}>Si</button>
                <br/>
                {deleteApproved && (deleteApproved.message == true ? <span className={s.spanVentana}>Se elimino el juego</span> : <span className={s.spanVentana}>No se pudo eliminar el juego</span>)}
            </div>
        </div>
        <div className={s.container}>
            {
                game && game.map(e => 
                <div key={e.id} className={s.map}>
                    <NavLink to="/app/home/1"><button className={s.volver}>Volver</button></NavLink>
                    <h1>{e.name}</h1>
                    <div className={s.texts}>
                        <p><span>Rating:</span>  {e.rating}</p>
                        <p><span>Lanzamiento:</span>  {e.released}</p>
                        <p><span>Generos:</span>  {e.genres.map((e, i) => <span key={i}>{e.name}</span>)}</p>
                        <p><span>Plataformas:</span>  {e.platforms.map((e, i) => <span key={i+100}>{e.name}</span>)}</p>
                        
                        <p className={s.description}>Descripción:  {e.description}</p>
                        {e.db && <div><button className={s.btnDelete} onClick={()=>{setStateVentana(true); setIdVideogame(e.id)}}>Eliminar videojuego</button></div>}
                    </div>
                </div>)
            }
            <div className={s.fondos}>
                <div className={s.containerImg}>
                    {
                        game && game.map((e, i) => <img key={i} src={e.background_image} alt="videogames image" className={s.img}/>)
                    }
                </div>
                <div className={s.degradado}></div>
                <div className={s.cortador}></div>
            </div>
        </div>
    </>)
}

const mapStateToProps = (store) => {
    return {
        game: store.idGame,
        deleteApproved: store.deleteApproved
    }
}

export default connect(mapStateToProps, {deleteVideogame, deleteVideogameReducer, resetDeleteApproved, gameById})(Details)