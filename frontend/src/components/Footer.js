// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Importa el CSS si quieres estilizar el footer

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2024 Mi Aplicación. Todos los derechos reservados.</p>
            <div className="footer-links">
                <a href="https://github.com/jaime9lozano" target="_blank" rel="noopener noreferrer">
                    Mi Github
                </a>
                <span> | </span>
                <a href="https://portfolio-jaime-lozano.netlify.app/" target="_blank" rel="noopener noreferrer">
                    Mi Porfolio personal
                </a>
            </div>
        </footer>
    );
};

export default Footer;
