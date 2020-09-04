import React, { useRef } from 'react'
import styled from '@emotion/styled';

import './FileUpload.css';

// Styled component FileButton (para que no sea el input tipo file de siempre)
const FileButton = styled.button`
    background-color: #2930FF;
    border: 1px solid #2930FF;
    border-radius: 15px;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    outline: none;
    padding: 10px 20px;
    &:hover {
        background-color: #fff;
        color: #2930FF;
    }
`;

export default function FileUpload(props) {

    const { setFile, showIns } = props;

    const hiddenInput = useRef(null); // Referencia al input tipo file que esta oculto 

    const handleClick = (event) => { // Evento click para abrir los archivos (hace referencia al input oculto)
        hiddenInput.current.click();
    }

    const handleChange = (event) => { // Evento onChange que se dispara al subir un archivo
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
    }

    return (
        <div className="file-upload">
            {/* Condicional ternario para mostrar un mensaje si no hay data en el local storage o si ya existe le indica al usuario que puede subir otro archivo .CSV */}
            {
                !showIns ? 
                    <p className="instructions">Para comenzar suba el archivo CSV con la data de los empleados.</p>
                :
                    <p className="instructions">Si lo desea puede resubir el archivo CSV para actualizarlo.</p>
            }

            {/* Button con el estilo definido al principio del componente */}
            <FileButton onClick={handleClick}>
                Upload CSV File <span role="img" aria-label="folder">📁</span>
            </FileButton>
            
            {/* Input tipo file oculto */}
            <input 
                type="file"
                accept="text/csv"
                ref={hiddenInput} 
                onChange={handleChange} 
                style={{ display: 'none' }}
            />
        </div>
    )
}
