import React from "react";
import { NavLink } from "react-router-dom"
import s from './Inicio.module.css';

export default function Inicio(){

    return (
        <div className={s.container}>
            <div className={s.fondoLanding}></div>
            <div>
                <h1>Bienvenido!!!</h1>
            </div>
            <div>
                <NavLink to='/app/home/1'>
                    <button className={s.button}><span>Home</span></button>
                </NavLink>
            </div>
        </div>
    )
}