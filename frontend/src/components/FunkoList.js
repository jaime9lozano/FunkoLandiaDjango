// src/components/FunkoList.js
import React, { useEffect, useState } from 'react';
import { getFunkos } from '../services/api';
import './FunkoList.css';
import {useNavigate} from "react-router-dom";

const FunkoList = () => {
    const [funkos, setFunkos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFunkos();
                setFunkos(result);
            } catch (error) {
                console.error('Error fetching funkos:', error);
                setError('Error al cargar los Funkos. Por favor, inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFunkoClick = (id) => {
        navigate(`/funko/${id}`);
    };

    const handleAddToCart = (funko) => {
        // Lógica para añadir al carrito
        alert(`¡${funko.nombre} añadido al carrito!`);
    };

    if (loading) {
        return <div className="loading">Cargando Funkos...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="funko-list">
            <h1>Lista de Funkos</h1>
            <div className="funko-grid">
                {funkos.map(funko => (
                    <div key={funko.id} className="funko-card" onClick={() => handleFunkoClick(funko.id)}>
                        <div className="funko-image">
                            {funko.imagen && <img src={funko.imagen} alt={funko.nombre} />}
                        </div>
                        <div className="funko-details">
                            <h2>{funko.nombre}</h2>
                            <p className="funko-price">Precio: {funko.precio} EUR</p>
                            <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(funko); }}>
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FunkoList;