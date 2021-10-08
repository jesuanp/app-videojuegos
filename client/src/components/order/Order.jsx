import React, {useRef} from "react";
import {connect} from 'react-redux'
import {ordenAlfabetico, buscarPorGenero, buscarPorPlataforma, buscarPorRating, gamesDatabase} from '../../redux/actions';
import s from './Order.module.css'

function Order({generos, plataformas, ordenAlfabetico, buscarPorGenero, buscarPorPlataforma, buscarPorRating, gamesDatabase}){

    let miRef = useRef(null);
    let refGenre = useRef(null);
    let refPlatforms = useRef(null);
    let refRating = useRef(null);
    let dataBase = useRef(null);

    function ordenarAlfabetico(){
        ordenAlfabetico(miRef.current.value)
    }

    function filterOrGenre(){
        buscarPorGenero(refGenre.current.value)
    }

    function filterOrPlatforms(){
        buscarPorPlataforma(refPlatforms.current.value)
    }

    function filterOrRating(){
        buscarPorRating(refRating.current.value)
    }

    function soloBaseDeDatos(){
        gamesDatabase(dataBase.current.value)
    }

    return (
        <div className={s.container}>
            <div className={s.containers}>
                <label>Orden alfabetico</label>
                <select className={s.select} ref={miRef} onChange={ordenarAlfabetico}>
                    <option disabled selected>Seleccionar</option>
                    <option>A - Z</option>
                    <option>Z - A</option>
                </select>
            </div>

            <div className={s.containers}>
                <label>Filtrar por genero</label>
                <select className={s.select} ref={refGenre} onChange={filterOrGenre}>
                    <option disabled selected>Seleccionar</option>
                    <option>Todos</option>
                    {
                        generos.map(e => <option>{e.name}</option>)
                    }
                </select>
            </div>

            <div className={s.containers}>
                <label>Filtrar por plataforma</label>
                <select className={s.select} ref={refPlatforms} onChange={filterOrPlatforms}>
                    <option disabled selected>Seleccionar</option>
                    <option>Todos</option>
                    {
                        plataformas.map(e => <option>{e.name}</option>)
                    }
                </select>
            </div>

            <div className={s.containers}>
                <label>Filtrar por rating</label>
                <select className={s.select} ref={refRating} onChange={filterOrRating}>
                    <option disabled selected>Seleccionar</option>
                    <option>Menor a mayor</option>
                    <option>Mayor a menor</option>
                </select>
            </div>

            <div className={s.containers}>
                <label>Solo base de dotos</label>
                <select className={s.select} ref={dataBase} onChange={soloBaseDeDatos}>
                    <option disabled selected>Seleccionar</option>
                    <option>Si</option>
                    <option>No</option>
                </select>
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        generos: store.genres,
        plataformas: store.platforms
    }
}

export default connect (mapStateToProps, {ordenAlfabetico, buscarPorGenero, buscarPorPlataforma, buscarPorRating, gamesDatabase})(Order)