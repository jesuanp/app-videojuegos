import axios from 'axios';

export const buscar = "BUSCAR_LOS_JUEGOS";
export const buscarPorNombre = "BUSCAR_POR_NOMBRE";
export const buscarNombrePorId = "BUSCAR_NOMBRE_POR_ID";
export const dataBase = "JUEGOS_DE_LA_BASE_DE_DATOS";
export const obtenerGeneros = "OBTENER_LOS_GENEROS_DE_LA_BASE_DE_DATOS";
export const obtenerPlataformas = "OBTENER_LAS_PLATAFORMAS_DE_LA_BASE_DE_DATOS";
export const gameByGenre = "OBTENER_JUEGOS_SOLO_POR_EN_GENERO";
export const gameByRating = "OBTENER_LOS_JUEGOS_POR_RATING";
export const alphabeticalOrder = "OBTENER_LOS_JUEGOS_EN_ORDEN_ALFABETICOS";
export const gameByPlatform = "OBTENER_LOS_JUEGOS_DE_DICHA_PLATAFORMA";
export const postSubmit = "HACE_EL_POST_A_LA_BASE_DE_DATOS";
export const deleteGame = "ELIMINA_UN_VIDEOJUEGO_DE_LA_BASE_DE_DATOS";
export const deleteGameReducer = "ELIMINA_UN_VIDEOJUEGO_DEL_REDUCER";

export function searchGames(){
    return async function(dispatch){
        let games = await axios.get('http://localhost:3001/api/videogames')
        return dispatch({
            type: buscar,
            payload: games.data
        })
    }
}

export function searchByName(name){
    return async function(dispatch){
        if(name !== ''){
            let gamesNames = await axios.get(`http://localhost:3001/api/videogames?name=${name}`)
            return dispatch({
                type: buscarPorNombre,
                payload: gamesNames.data
            })
        }
        return dispatch({
            type: buscarPorNombre,
            payload: null
        })
    }
}

export function gameById(id){
    return async function(dispatch){
        let gamesId = await axios.get(`http://localhost:3001/api/videogames/${id}`)
        return dispatch({
            type: buscarNombrePorId,
            payload: gamesId.data
        })
    }
}

export function gamesDatabase(arg){
    return async function(dispatch){
        let database = await axios.get('http://localhost:3001/api/videogames/database')
        return dispatch({
            type: dataBase,
            payload: database.data,
            arg: arg
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        let genres = await axios.get('http://localhost:3001/api/genres')
        return dispatch({
            type: obtenerGeneros,
            payload: genres.data
        })
    }
}

export function getPlatforms(){
    return async function(dispatch){
        let platforms = await axios.get('http://localhost:3001/api/platforms')
        return dispatch({
            type: obtenerPlataformas,
            payload: platforms.data
        })
    }
}

export function buscarPorGenero(name){
    return async function(dispatch){
        // let games = await axios.get('http://localhost:3001/api/videogames')
        return dispatch({
            type: gameByGenre,
            // payload: games.data,
            name: name
        })
    }
}

export function buscarPorRating(descAsc){
    return async function(dispatch){
        let games = await axios.get('http://localhost:3001/api/videogames')
        return dispatch({
            type: gameByRating,
            payload: games.data,
            descAsc: descAsc
        })
    }
}

export function ordenAlfabetico(descAsc){
    return async function(dispatch){
        let games = await axios.get('http://localhost:3001/api/videogames')
        console.log(games.data)
        return dispatch({
            type: alphabeticalOrder,
            payload: games.data,
            descAsc: descAsc
        })
    }
}

export function buscarPorPlataforma(name){
    return async function(dispatch){
        let games = await axios.get('http://localhost:3001/api/videogames')
        return dispatch({
            type: gameByPlatform,
            payload: games.data,
            name: name
        })
    }
}

export function submitPost(datos){
    return async function(dispatch){
        let postgame = await axios.post('http://localhost:3001/api/videogame/add', datos)
        return dispatch ({
            type: postSubmit,
            postgame: postgame.data
        })
    }
}

export function deleteVideogame(id){
    return async function (dispatch){
        let respuesta = await axios.delete(`http://localhost:3001/api/videogame/${id}`)
        return dispatch({
            type: deleteGame,
            payload: respuesta.data
        })
    }
}

export function deleteVideogameReducer(id){
    return function (dispatch){
        return dispatch({
            type: deleteGameReducer,
            payload: id
        })
    }
}

export function resetDeleteApproved(){
    return function (dispatch){
        return dispatch({
            type: deleteGame,
            payload: null
        })
    }
}
