import React, {useRef, useState} from "react";
import {connect} from 'react-redux'
import {searchByName} from '../../redux/actions'

function Nav({searchByName}){

    let [state, setState] = useState('')

    let myRef = useRef(null)

    function input(){
        setState(myRef.current.value)
        if(myRef.current.value === ''){
            searchByName('')
        }
    }

    return (
        <div>
            <input type="text" placeholder='Buscar...' ref={myRef} onChange={input} />
            <button onClick={()=>searchByName(state)}>Buscar</button>
        </div>
    )
}

export default connect (null, {searchByName})(Nav)