import React, { useState, useEffect, Fragment } from 'react'
import styled from '@emotion/styled';

import { Tree, TreeNode } from 'react-organizational-chart';

import SelectMonth from '../SelectMonth/SelectMonth';
import Tooltip from '../Tooltip/Tooltip';

import './OrgChat.css';

// Styled component para cada Nodo del organigrama
const Node = styled.div`
    border: 3px solid #2930FF;
    border-radius: 8px;
    cursor: default;
    display: inline-block;
    padding: 5px 20px;
`;

export default function OrgChart(props) {

    const { data, months, showMonths } = props;

    const [currentMonth, setCurrentMonth] = useState('3-2020'); // Hook state para el estado del mes actual o seleccionado por el suuario
    const [dataPerMonth, setDataPerMonth] = useState([]); // Hook state para el estado de la data por mes (se separa por mes para mostrarla segun el ems que se seleccione)
    const [totalBudget, setTotalBudget] = useState(0); // Hook state para el estado del total pagodo en nomina

    // Hook effect para extraer al data segun el mes seleccionado y calcular el monto pagado en nomina
    useEffect(() => {
        const arrPerDate = [];
        let budget = 0;
        data.forEach(item => {
            if(item.date === currentMonth){
                arrPerDate.push(item);
                budget += Number(item.salary);
            }
        });

        setTotalBudget(budget);
        setDataPerMonth(arrPerDate);

    }, [currentMonth, data])

    if( showMonths ) { // Si existe data se muestra el organigrama
        return (
            <div className="org-chart">
                {/* Componente Tree, de el se desprenden los nodos */}
                <Tree
                    lineWidth={ '3px' }
                    lineColor={ '#fff' }
                    lineBorderRadius={ '10px' }
                    label={ <Node>NALA</Node> } 
                >
                    {/* Los nodos son renderizados por el componente TreeChild, definido en la siguiente funcion */}
                    <TreeChild dataPerMonth={dataPerMonth} />
                </Tree>
    
                <div className="options-container">
                    <SelectMonth 
                        showMonths={showMonths} 
                        months={months}
                        currentMonth={currentMonth}
                        setCurrentMonth={setCurrentMonth} 
                    />
    
                    <div>
                        <p className="budget">Total Nómina del Mes:</p>
                        <p className="budget">{ totalBudget }</p>
                    </div>
                </div>
            </div>
        )
    }

    return null;
}

// Componente TreeChild
function TreeChild(props) {
    const { dataPerMonth } = props;

    // Arreglos para almacenar segun la jerarquia
    const coord = [];
    const suprv = [];
    const proma = [];

    if(dataPerMonth && dataPerMonth.length > 0){
        dataPerMonth.forEach(item => { // Se recorre la data por mes (segun el mes seleccionado) y se agrega en el array correspondiente
            switch (item.hierarchy) {
                case 'Cordinador':
                    coord.push(item);
                    break;
                case 'Supervisor':
                    suprv.push(item);
                    break;
                case 'Manager':
                    proma.push(item);
                    break;
                case 'Profesional':
                    proma.push(item);
                    break;
                case 'Profesioal': // Hay un error en el .csv en algunos dice 'profesioal', para no editar el .csv, hice este pequeño "hot fix"😅
                    proma.push(item);
                    break;
                default:
                    break;
            }
        });

        // Se recorren todos los arreglos antes mencionados. Se verifica que el arreglo no este vacio y se procede a recorrer y usar
        // el componente TreeNode que es de la libreria react-organizational-chart y en la propiedad label se hace uso del styled component Node.
        // Dentro del componente Node esta el componente Tooltip, que permite visualizar la informacion basica de cada empleado en un tooltip
        return(
            <Fragment>
                {
                    coord.length > 0 &&
                        coord.map((icoord, idx) => (
                            <TreeNode key={idx} label={<Node><Tooltip userData={icoord}></Tooltip></Node>}>
                                {
                                    suprv.length > 0 ? 
                                        suprv.map((isuprv, idx) => (
                                            <TreeNode key={idx} label={<Node><Tooltip userData={isuprv}></Tooltip></Node>}>
                                                {
                                                    proma.length > 0 &&
                                                        proma.map((iproma, idx) => (
                                                            <TreeNode key={idx} label={<Node><Tooltip userData={iproma}></Tooltip></Node>}/>
                                                        ))
                                                }
                                            </TreeNode>
                                        ))
                                    :
                                    proma.length > 0 &&
                                    proma.map((iproma, idx) => (
                                        <TreeNode key={idx} label={<Node><Tooltip userData={iproma}></Tooltip></Node>}/>
                                    ))   
                                }
                            </TreeNode>
                        ))
                }
            </Fragment>
        )
    }

    return null;
}
