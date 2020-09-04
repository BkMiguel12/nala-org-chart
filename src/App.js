import React, { useState, useEffect } from 'react';
import './App.css';

import Papa from 'papaparse'; // CSV Parser in-browser

import Header from './components/Header/Header'; // Componente Header
import OrgChart from './components/OrgChart/OrgChart'; // Componente OrgChart
import FileUpload from './components/FileUpload/FileUpload'; // Componente FileUpload 

export default function App() {

  const parsedLocalData = JSON.parse(localStorage.getItem('data')); // Obtiene la data guardada en el localstorage (si existe);

  const [file, setFile] = useState(null); // Hook state para el estado del archivo .CSV
  const [csvArr, setCsvArr] = useState(parsedLocalData || []); // Hook state para el estado del arreglo que contiene la data parseada del .CSV
  const [months, setMonths] = useState([]); // Hook state para el estado del arreglo que guarda los meses
  const [showMonths, setShowMonths] = useState(parsedLocalData ? true : false); // Hook state para el estado del booleano para mostrar el select de los meses

  useEffect(() => { // Hook effect para parsear la informacion que vienen en el archivo .CSV cuando este es subido 
    if( file ){
      parseCsv(file);
    }
    if( csvArr ){ // Si ya existe el arreglo con la data parseada (o si se acaba de subir) se guarda un arreglo con los meses
      let arrMonths = [];
      csvArr.forEach(item => {
        arrMonths.push(item.date.split('-')[0]);
        setMonths([...new Set(arrMonths)]);
      });
    }
  }, [file, csvArr]);

  const parseCsv = (file) => { // Funcion que parsea la data del archivo .CSV
    let newArray = [];
    let months = [];
    
    Papa.parse(file, {
      header: true,
      complete: (results) => { // Al completarse el parseo, se crea un arreglo de objetos con nombres de variables mas manejables. Ademas con el arreglo de objetos es mas facil manejar la data

        results.data.forEach(elem => {
          newArray.push({
            date: elem['Mes'],
            name: elem['Nombre '],
            id: elem['ID'],
            enter_date: elem['Fecha de ingreso'],
            salary: elem['Sueldo  bruto'],
            division: elem['División'],
            area: elem['Area'],
            subarea: elem['Subarea'],
            leader_id: elem['ID Lider'],
            hierarchy: elem['Nivel Jerárquico']
          });

          months.push(elem['Mes'].split('-')[0]);
        });

        setMonths([...new Set(months)]);

        localStorage.setItem('data', JSON.stringify(newArray)); // Se almacena la data en el local storage
        setCsvArr(newArray); // Se hace el set al estado de csvArr para almacenar el nuevo arreglo de objetos
        setShowMonths(true); // Se hace el set al estado de showMonths a true

      }
    });
  }

  return (
    <div className="app">
      <Header /> {/* Componente Header */}

      <div className="content">
        {/* Componente FileUpload */}
        <FileUpload 
          setFile={setFile} 
          showIns={showMonths}
        />

        {/* Componente OrgChart */}
        <OrgChart 
          data={csvArr} 
          months={months} 
          showMonths={showMonths}
        />
      </div>
    </div>
  );
}