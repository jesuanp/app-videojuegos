import React, {useRef, useState} from "react";
import {connect} from 'react-redux'
import s from './Nav.module.css';
import {searchByName} from '../../redux/actions'

function InputSearch({searchByName}){

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
			<div className={s.busqueda}>
                <input type="text" placeholder='Buscar...' ref={myRef} onChange={input} className={s.input} />
                <button onClick={()=>searchByName(state)} className={s.button} >Buscar</button>
            </div>
		</div>)
}

export default connect (null, {searchByName})(InputSearch)
