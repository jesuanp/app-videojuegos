import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import s from './Form.module.css';
import { connect } from "react-redux";
import {submitPost} from "../../redux/actions";

function Form({submitPost, genres, platforms}){

    const [state, setState] = useState({
        name: '',
        released: '',
        rating: 0,
        background_image: '',
        genres: [],
        platforms: [],
        descripcion: ''
    })

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }

    function handleRating(e){
        setState({
            ...state,
            rating: parseInt(e.target.value)
        })
    }

    function handleGenres(e){
        setState({
            ...state,
            genres: state.genres.includes(e.target.value) ? state.genres.filter(el => el !== e.target.value) : state.genres.concat(e.target.value)
        })
        console.log(state)
    }

    function handlePlatforms(e){
        setState({
            ...state,
            platforms: state.platforms.includes(e.target.value) ? state.platforms.filter(el => el !== e.target.value) : state.platforms.concat(e.target.value)
        })
        console.log(state)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await submitPost(state)
        console.log(state)
    }

    return (
        <div className={s.containerFather}>
            <button className={s.btnVolver}><NavLink to='/app/home'>Volver</NavLink></button>
            <form onSubmit={(e)=>handleSubmit(e)}>
                
                <div className={s.container}>

                    <h3 className={s.titulo}>Agrega un juego</h3>

                    <div className={s.name}>
                        <label>Nombre del juego</label>
                        <input type="text" name="name" className={s.input} onChange={(e)=>handleChange(e)} />
                    </div>

                    <div className={s.released}>
                        <label>Lanzamiento del juego</label>
                        <input type="date" name="released" className={s.input} onChange={(e)=>handleChange(e)} />
                    </div>


                    <div className={s.rating}>
                        <label>Rating</label>
                        <input type="number" name="rating" className={s.input} onChange={(e)=>handleRating(e)} />
                    </div>


                    <div className={s.image}>
                        <label>URl de la imagen</label>
                        <input type="url" name="background_image" className={s.input} onChange={(e)=>handleChange(e)} />
                    </div>

                    <div className={s.genres}>
                        <label>Generos del juego</label>
                        {
                            genres && genres.map(e => <div><input type="checkbox" name="genres" onChange={(evt)=>handleGenres(evt)} value={e.name} /><label>{e.name}</label></div>)
                        }
                    </div>

                    <div className={s.platforms}>
                        {
                            platforms && platforms.map(e => <div><input type="checkbox" name="platforms" onChange={(evt)=>handlePlatforms(evt)} value={e.name} /><label>{e.name}</label></div>)
                        }
                    </div>

                    <div className={s.descripcion}>
                        <label>Descripción</label>
                        <textarea type="text" name="descripcion" cols="40" rows="6" className={s.input} onChange={(e)=>handleChange(e)} />
                    </div>

                    <div className={s.info}><p>Info para agregar un juego</p></div>

                </div>
                <button type='submit' className={s.button} />

            </form>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        resPost: store.resPost,
        genres: store.genres,
        platforms: store.platforms
    }
}

export default connect(mapStateToProps, {submitPost})(Form)