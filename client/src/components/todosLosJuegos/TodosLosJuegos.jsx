import React from "react";
import { connect } from "react-redux"
import s from '../card/Card.module.css';
import styles from './TodosLosJuegos.module.css';
import {ordenAlfabetico} from '../../redux/actions' 

function TodosLosJuegos({Todos}){

    return(
        <div className={styles.cards}>
            {
                Todos.map(e => <div className={s.card}>
                    <div>
                    <p>name: {e.name}</p>
                    <p>released: {e.released}</p>
                    <p>rating: {e.rating}</p>
                    <p className={s.genres}>generos: {e.genres.map(el => <p className={s.genre}>{el.name}</p>)}</p>
                    </div>
                    <div>
                    <img className={s.img} src={e.background_image} alt="videogame image" />
                    </div>
                </div>)
            }
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        Todos: store.fullGames
    }
}

export default connect(mapStateToProps)(TodosLosJuegos)