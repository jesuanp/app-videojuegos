import React, {useRef, useState} from "react";
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
// import {searchByName} from '../../redux/actions'
import s from './Nav.module.css';
// import logo from '../images/pacman9.gif'

export default function Nav(){

    

    return (
        <div>
            <nav className={s.nav}>
                <div className={s.links}>
                    <NavLink to='/app/home/1' className={s.link}>Home</NavLink>
                    <NavLink to='/app/post' className={s.link}>Agregar un juego</NavLink>
                </div>
            </nav>
            
        </div>
    )
}

// export default connect (null, {searchByName})(Nav)