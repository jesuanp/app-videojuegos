import React, {useRef, useState} from "react";
import { NavLink } from 'react-router-dom'
// import {searchByName} from '../../redux/actions'
import s from './Nav.module.css';
// import logo from '../images/pacman9.gif'

export default function Nav(){

    const scrollUp = () => {
        let currentScroll = document.documentElement.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(scrollUp)
            window.scrollTo (0, currentScroll - (currentScroll / 1));
        }
    }    

    return (
        <div>
            <nav className={s.nav}>
                <div className={s.links}>
                    <NavLink to="/app/home/1" onClick={scrollUp} className={s.link}>Home</NavLink>
                </div>

                <div className={s.links}>
                    <NavLink to='/app/post' onClick={scrollUp} className={s.link}>Agregar un juego</NavLink>
                </div>
            </nav>
            
        </div>
    )
}

// export default connect (null, {searchByName})(Nav)