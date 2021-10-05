import React from "react";
import image from '../images/unnamed.jpg'
import s from '../details/Details.module.css'

export default function Cargando(){

    return (
        <>
        <img src={image} alt="Cargando" className={s.imgg}/>
        </>
    )
}