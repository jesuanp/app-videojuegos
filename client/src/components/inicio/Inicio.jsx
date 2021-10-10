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
                <NavLink to='/app/home/1' className={s.NavLink}>
                    <button className={s.button}>Home</button>
                </NavLink>
            </div>
        </div>
    )
}