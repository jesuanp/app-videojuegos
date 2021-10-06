import React, {useRef} from "react";
import {connect} from 'react-redux'
import {ordenAlfabetico, buscarPorGenero, buscarPorPlataforma} from '../../redux/actions';
import s from './Order.module.css'

function Order({generos, plataformas, ordenAlfabetico, buscarPorGenero, buscarPorPlataforma}){

    let miRef = useRef(null);
    let refGenre = useRef(null);
    let refPlatforms = useRef(null);

    function ordenarAlfabetico(){
        ordenAlfabetico(miRef.current.value)
    }

    function filterOrGenre(){
        buscarPorGenero(refGenre.current.value)
    }

    function filterOrPlatforms(){
        buscarPorPlataforma(refPlatforms.current.value)
    }

    return (
        <div className={s.container}>
            <div className={s.containers}>
                <label>Orden alfabetico</label>
                <select className={s.select} ref={miRef} onChange={ordenarAlfabetico}>
                    <option disabled selected>Seleccionar</option>
                    <option value="A - Z">A - Z</option>
                    <option value="Z - A">Z - A</option>
                </select>
            </div>

            <div className={s.containers}>
                <label>Filtrar por genero</label>
                <select className={s.select} ref={refGenre} onChange={filterOrGenre}>
                    <option disabled selected>Seleccionar</option>
                    {
                        generos.map(e => <option>{e.name}</option>)
                    }
                </select>
            </div>

            <div className={s.containers}>
                <label>Filtrar por plataforma</label>
                <select className={s.select} ref={refPlatforms} onChange={filterOrPlatforms}>
                    <option disabled selected>Seleccionar</option>
                    {
                        plataformas.map(e => <option>{e.name}</option>)
                    }
                </select>
            </div>

            <div className={s.containers}>
                <label>Filtrar por rating</label>
                <select className={s.select}>
                    <option disabled selected>Seleccionar</option>
                    <option value="Asc">Asc</option>
                    <option value="Desc">Desc</option>
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

export default connect (mapStateToProps, {ordenAlfabetico, buscarPorGenero, buscarPorPlataforma})(Order)