import React, {useState, useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";
import s from './Form.module.css';
import { connect } from "react-redux";
import {submitPost, getGenres, getPlatforms} from "../../redux/actions";

function Form({submitPost, genres, platforms, resPost, getGenres, getPlatforms}){

    let myHistory = useHistory()

    const [state, setState] = useState({
        name: '',
        released: '',
        rating: 0,
        background_image: null,
        genres: [],
        platforms: [],
        description: ''
    })

    function handleImg(e){
        setState({...state,
        background_image: e.target.value
        })
    }

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
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
    }

    function handlePlatforms(e){
        setState({
            ...state,
            platforms: state.platforms.includes(e.target.value) ? state.platforms.filter(el => el !== e.target.value) : state.platforms.concat(e.target.value)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(state.name == ''){
            return alert("Falta el nombre")
        }
        if(state.released == ''){
            return alert("Falta la fecha de lanzamiento de juego")
        }
        if(state.rating == 0 || state.rating == '' || state.rating < 1 || state.rating > 5 || !Number(state.rating) || state.rating == NaN){
            return alert("El rating debe ser entre 1 y 5")
        }
        if(state.background_image !== null){
            if(state.background_image.slice(state.background_image.length-3) !== 'jpg'){
                return alert("La imagen tiene que ser jpg")
            }
        }
        if(state.description == '' || state.description.length < 15){
            if(state.description == '') return alert("Falta la descripción")
            if(state.description.length < 15) return alert("La descripcióin debe tener al menos 15 caracteres")
        }
        if(state.genres == ''){
            return alert("Faltan los generos")
        }
        if(state.platforms == ''){
            return alert("Faltan las plataformas")
        }

        await submitPost(state)
        myHistory.push("/app/home/1")
        return alert("Juego Agregado")
    }

    useEffect(()=>{
        if(!genres.length) getGenres();
        if(!platforms.length) getPlatforms();

    })

    return (
        <div className={s.containerFather}>
            <button className={s.btnVolver}><NavLink to='/app/home/1'>Volver</NavLink></button>
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
                        <input type="text" name="rating" className={s.input} onChange={(e)=>handleRating(e)} />
                    </div>


                    <div className={s.image}>
                        <label>URl de la imagen</label>
                        <input type="url" name="background_image" className={s.input} onChange={(e)=>handleImg(e)} />
                    </div>

                    <div className={s.genres}>
                        <label>Generos del juego</label><br/>
                        {
                            genres && genres.map(e => <div><input type="checkbox" name="genres" onChange={(evt)=>handleGenres(evt)} value={e.name} /><label>{e.name}</label></div>)
                        }
                    </div>

                    <div className={s.platforms}>
                        <label>Plataformas</label><br/>
                        {
                            platforms && platforms.map(e => <div><input type="checkbox" name="platforms" onChange={(evt)=>handlePlatforms(evt)} value={e.name} /><label>{e.name}</label></div>)
                        }
                    </div>

                    <div className={s.description}>
                        <label>Descripción</label>
                        <textarea type="text" name="description" cols="48" rows="6" className={s.input} onChange={(e)=>handleChange(e)} />
                    </div>

                    <div className={s.info}>
                        <p>Info para agregar un juego</p><br/>
                        <p>El Rating: tiene que ser del 1 al 5</p><br/>
                        <p>Imagen: Para que la imagen se pueda ver, hay que copiar una url de google imagenes</p>
                    </div>

                <button type='submit' className={s.button} >Enviar</button>
                </div>

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

export default connect(mapStateToProps, {submitPost, getGenres, getPlatforms})(Form)