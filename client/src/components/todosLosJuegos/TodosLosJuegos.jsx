import React from "react";
import { connect } from "react-redux"
import s from '../card/Card.module.css';
import styles from './TodosLosJuegos.module.css';
import {ordenAlfabetico} from '../../redux/actions' 

function TodosLosJuegos({Todos}){

    return(
        <div className={styles.cards}>
            {
                Todos.map(e => <div className={s.card} key={e.id}>
                    <div>
                        <p className={s.name}>{e.name}</p>
                    </div>
                    <div className={s.cardLow}>
                        <div className={s.text}>
                            <p>rating: {e.rating}</p>
                            <p className={s.genres}><span>genres:</span> {e.genres.map((el, i) => { if(i < 3)return <span className={s.genre} key={e.id}>{el.name}</span>})}</p>
                        </div>
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