import React from 'react'

import './Tooltip.css';

export default function Tooltip(props) {
    const { userData } = props;

    // Componente tooltip, recibe la data de cada usuario al hacer hover encima de algun nodo y la muestra en un tooltip

    return(
        <div className="tooltip">
            <p className="tooltip-content">{ userData.name }</p>
            <p className="tooltip-content"><strong>{ userData.hierarchy }</strong></p>
            <p className="tooltiptext">
                <span><strong>Fecha de Ingreso:</strong> { userData.enter_date }</span>
                <span><strong>Sueldo bruto: </strong>{ userData.salary }</span>
                <span><strong>División:</strong> { userData.division }</span>
                <span><strong>Área:</strong> { userData.area }</span>
                <span><strong>Subarea:</strong> { userData.subarea }</span>
            </p>
        </div>
    )
}
