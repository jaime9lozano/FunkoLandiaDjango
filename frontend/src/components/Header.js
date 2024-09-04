// src/components/Header.js
import React from 'react';
import './Header.css';
import {FaShoppingCart, FaUser} from "react-icons/fa"; // Importa el CSS si quieres estilizar el header

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <img src={'Logo.jpg'} alt="Logo" className="header-logo" />
            </div>
            <div className="header-center">
                <h1 className="header-title">FunkoLandia</h1>
            </div>
            <div className="header-right">
                <button className="header-icon">
                    <FaShoppingCart size={24} />
                </button>
                <button className="header-icon">
                    <FaUser size={24} />
                </button>
            </div>
        </header>
    );
}

export default Header;
