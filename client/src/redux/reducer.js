import { buscar, buscarPorNombre, buscarNombrePorId, dataBase, obtenerGeneros, obtenerPlataformas, gameByGenre, gameByRating } from './actions'

const initialStore = {
    games: [],
    nameGame: [],
    idGame: {},
    database: [],
    genres: [],
    platforms: [],
    gamesFilterByGenre: [],
    gamesFilterByRating: []
}

const reducer = (state=initialStore, action) => {
    switch (action.type){

        case buscar: return {
            ...state,
            games: action.payload.filter((e, i) => {
                if(i <= 15){
                    return e
                }
            })
        }

        case buscarPorNombre: return {
            ...state,
            nameGame: action.payload
        }

        case buscarNombrePorId: return {
            ...state,
            idGame: action.payload
        }

        case dataBase: return {
            ...state,
            database: action.payload
        }

        case obtenerGeneros: return {
            ...state,
            genres: action.payload
        }

        case obtenerPlataformas: return {
            ...state,
            platforms: action.payload
        }

        case gameByGenre: return {
            ...state,
            gamesFilterByGenre: action.payload.filter((e) => {

                for(let i = 0; i < e.genres.length; i++){
                    if(e.genres[i].name === action.name){
                        return e
                    }
                }

                // let i = 0;
                // while(i < e.genres.length){
                //     if(e.genres[i].name === action.name){
                //         i++
                //         return e
                //     }
                //     i++
                // }

                //no funca vvv
                // return e.genres.filter(el => {
                //     if(el.name === action.name){
                //         return e
                //     }
                // })
            })
        }

        case gameByRating: return {
            ...state,
            gamesFilterByRating: action.descAsc === 'desc' ? 
            action.payload.sort((a, b)=>{
                if(a.rating > b.rating) return -1;
                else if (a.rating < b.rating) 1;
                else return
            })
            : action.payload.sort((a, b)=>{
                if(a.rating < b.rating) return -1;
                else if (a.rating > b.rating) 1;
                else return
            })
        }

        default: return state;
    }
}

export default reducer