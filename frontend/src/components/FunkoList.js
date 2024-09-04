// src/components/FunkoList.js
import React, { useEffect, useState } from 'react';
import { getFunkos } from '../services/api';
import './FunkoList.css';
import {useNavigate} from "react-router-dom";

const FunkoList = () => {
    const [funkos, setFunkos] = useState([]);
    const navigate  = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFunkos();
                setFunkos(result);
            } catch (error) {
                console.error('Error fetching funkos:', error);
            }
        };
        fetchData();
    }, []);

    const handleFunkoClick = (id) => {
        navigate(`/funko/${id}`); // Navega a la página de detalles del Funko
    };

    return (
        <div className="funko-list">
            <h1>Lista de Funkos</h1>
            <ul>
                {funkos.map(funko => (
                    <li key={funko.id} className="funko-item" onClick={() => handleFunkoClick(funko.id)}>
                        <div className="funko-image">
                            {funko.imagen && <img src={funko.imagen} alt={funko.nombre} />}
                        </div>
                        <div className="funko-details">
                            <h2>{funko.nombre}</h2>
                            <p>Precio: {funko.precio} EUR</p>
                            <p>Cantidad disponible: {funko.cantidad}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FunkoList;