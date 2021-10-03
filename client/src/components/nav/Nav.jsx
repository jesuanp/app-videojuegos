import React, {useRef, useState} from "react";
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {searchByName} from '../../redux/actions'
import s from './Nav.module.css';

function Nav({searchByName}){

    let [state, setState] = useState('')

    let myRef = useRef(null)

    function input(){
        setState(myRef.current.value)
        if(myRef.current.value === ''){
            searchByName('')
        }
    }

    return (
        <nav className={s.nav}>
            <div className={s.links}>
                <NavLink to='/videojuegos/home' className={s.link}>home</NavLink>
                <NavLink to='/videojuegos/todos' className={s.link}>Todos los juegos</NavLink>
            </div>
            <div className={s.busqueda}>
                <input type="text" placeholder='Buscar...' ref={myRef} onChange={input} className={s.input} />
                <button onClick={()=>searchByName(state)} className={s.button} >Buscar</button>
            </div>
        </nav>
    )
}

export default connect (null, {searchByName})(Nav)