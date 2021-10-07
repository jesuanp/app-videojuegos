import React from "react";
import s from './Paginado.module.css';

export default function Paginado({pages, searchVideogames, totalVideogames}){

    let arrPages = [];

    let total = Math.floor(searchVideogames.length / totalVideogames)

    for(let i = 0; i <= total; i++){
        arrPages.push(i)
    }

    const scrollUp = () => {
        let currentScroll = document.documentElement.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(scrollUp)
            window.scrollTo (0, currentScroll - (currentScroll / 1));
        }
    }

    // const handleClick = () => {
    //     scrollUp()

    // }

    return (
        <div>
                {
                   arrPages && arrPages.map(e => <button onClick={()=>{pages(e+1);  scrollUp()}} className={s.btn}>pagina {e+1}</button>)
                }
        </div>
    )
}