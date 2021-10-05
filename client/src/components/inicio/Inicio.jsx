import React from "react";
import { NavLink } from "react-router-dom"
import s from './Inicio.module.css';

export default function Inicio(){

    return (
        <div className={s.container}>
            <div>
                <span className={s.span}>Bienvenido!!!</span>
            </div>
            <div>
                <button className={s.buttonn}>
                    <NavLink to='/videojuegos/home' className={s.NavLink}>Home</NavLink>
                </button>
            </div>
        </div>
    )
}