import React from 'react';

import logo from '../../assets/img/logo-nala.png';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Nala Logo"/>
            <span className="title">Organigrama React Test</span>
        </header>
    )
}
