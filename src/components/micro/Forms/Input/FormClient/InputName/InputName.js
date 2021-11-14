import React, {useState} from 'react';
import {FormControl} from 'react-bootstrap'

function InputName(props) {
    
    
    
    const [nameDescription, setNameDescription] = useState('');
    const getName = () => {
        return (
            <>
                <FormControl 
                type="text" 
                placeholder="Digite seu nome" 
                className='box-insert py-3'
                onChange={(event) =>{setNameDescription(event.target.value)}}
                value={nameDescription}/>
                {props.function("name", nameDescription)}
            </>
        )
    }

    return(
        <>
            {getName()}
        </>
    )
}

export default InputName;