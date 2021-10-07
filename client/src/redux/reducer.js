import { buscar, buscarPorNombre, buscarNombrePorId, dataBase, obtenerGeneros, obtenerPlataformas, gameByGenre, gameByRating, alphabeticalOrder, gameByPlatform } from './actions'

const initialStore = {
    todosLosJuegos: [],
    games: [],
    nameGame: [],
    idGame: [],
    database: [],
    genres: [],
    platforms: [],
    gamesFilterByGenre: [],
    gamesFilterByRating: [],
    orderABC: [],
}

const reducer = (state=initialStore, action) => {
    switch (action.type){

        case buscar: return {
            ...state,
            games: action.payload,
            todosLosJuegos: action.payload
        }

        case buscarPorNombre: return {
            ...state,
            games: action.payload
        }

        case buscarNombrePorId: return {
            ...state,
            idGame: [action.payload]
        }

        case dataBase: return {
            ...state,
            games: action.arg == 'Si' ? action.payload : state.todosLosJuegos
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
            games: state.todosLosJuegos.filter((e) => {

                for(let i = 0; i < e.genres.length; i++){
                    if(e.genres[i].name === action.name){
                        return e
                    }
                }
            })
        }

        case gameByRating: return {
            ...state,
            games: action.descAsc === 'Mayor a menor' ? 
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

        case alphabeticalOrder: return {
            ...state,
            games: action.descAsc == 'Z - A' ?
            action.payload.sort((a, b)=>{
                if(a.name > b.name) return -1;
                else if (a.name < b.name) 1;
                else return
            })
            : action.payload.sort((a, b)=>{
                if(a.name < b.name) return -1;
                else if (a.name > b.name) 1;
                else return
            })
        }

        case gameByPlatform: return {
            ...state,
            games: state.todosLosJuegos.filter((e) => {

                for(let i = 0; i < e.platforms.length; i++){
                    if(e.platforms[i].platform.name === action.name){
                        return e
                    }
                }
            })
        }

        default: return state;
    }
}

export default reducer