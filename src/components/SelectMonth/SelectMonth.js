import React from 'react';

import './SelectMonth.css';

export default function SelectMonth(props) {
    const { months, showMonths, currentMonth, setCurrentMonth } = props;

    const handleSelectChange = event => { // Evento onChange que se ejecuta al seleccionar un nuevo mes en el select, actualziando asi el estado de currentMonth
        setCurrentMonth(event.target.value);
    }

    if( showMonths ) {
        return(
            <div className="select-month">
                <p className="title">Seleccione el mes a consultar</p>
                <select className="select" onChange={handleSelectChange} value={currentMonth}>
                    {
                        months.map((elm, idx) => {
                            return(
                                <option key={idx} value={elm + '-2020'}>{`${elm}-2020`}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }

    return null;
}
