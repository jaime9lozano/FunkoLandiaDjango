// src/components/Header.js
import React from 'react';
import './Header.css'; // Importa el CSS si quieres estilizar el header

const Header = ({ isLoggedIn, onLogout }) => {
    return (
        <header className="header">
            <div className="header-left">
                <h1 className="header-title">FunkoLandia</h1>
            </div>
            <div className="header-right">
                <button className="header-button">
                    <img src="/public/cart-icon.jpg" alt="Cart" className="header-icon" />
                </button>
                <button className="header-button" onClick={isLoggedIn ? onLogout : () => alert('Login')}>
                    <img
                        src={isLoggedIn ? "/path/to/logout-icon.png" : "/path/to/login-icon.png"}
                        alt={isLoggedIn ? "Logout" : "Login"}
                        className="header-icon"
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;
