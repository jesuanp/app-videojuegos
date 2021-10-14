import React from "react";
import s from './Paginado.module.css';

export default function Paginado({pages, searchVideogames, totalVideogames, currentPage}){

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

    const handleClick = (el) => {
        if(el === total){
            pages(el+1)
            scrollUp()
            return
        }
        if(el+1 === 1){
            pages(el+1)
            scrollUp()
            return
        }
        if(el+1 <= total){
            pages(el+1)
            scrollUp()
            return
        }
    }

    function unoUOtro(i){
        if(i == total) return "-->";
        if(i+1 == 1) return "<--";

        return "..."
    }

    return (
        <div>
                {
                   arrPages && arrPages.map((e, i) => i==currentPage || i+1==currentPage || i+2==currentPage?<button key={i} onClick={()=>{
                    pages(e+1);  scrollUp()
                    }} 
                    className={s.btn}>pag {e+1}</button>: <button className={s.btn} key={i} onClick={()=>handleClick(i)}>{unoUOtro(i)}</button>)
                }
        </div>
    )
}