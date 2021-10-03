import { buscar, buscarPorNombre, buscarNombrePorId, dataBase, obtenerGeneros, obtenerPlataformas, gameByGenre, gameByRating, alphabeticalOrder } from './actions'

const initialStore = {
    fullGames: [],
    games: [],
    nameGame: [],
    idGame: {},
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
            games: action.payload.filter((e, i) => {
                if(i <= 15){
                    return e
                }
            }),
            fullGames: action.payload
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

        case alphabeticalOrder: return {
            ...state,
            orderABC: action.descAsc === 'Z - A' ?
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

        default: return state;
    }
}

export default reducer