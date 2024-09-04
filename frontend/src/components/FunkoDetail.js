// src/components/FunkoDetail.js
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { getFunkos } from '../services/api'; // Asumiendo que puedes obtener el funko por su id
import './FunkoDetail.css';

const FunkoDetail = () => {
    const { id } = useParams(); // Obtén el id del parámetro de la URL
    const [funko, setFunko] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const navigate = useNavigate(); // Para manejar la navegación

    useEffect(() => {
        const fetchFunko = async () => {
            try {
                const result = await getFunkos();
                const selectedFunko = result.find(f => f.id === parseInt(id));
                setFunko(selectedFunko);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching funko details:', error);
                setLoading(false);
            }
        };
        fetchFunko();
    }, [id]);

    const handleGoBack = () => {
        navigate('/');
    };

    const handleAddToCart = () => {
        // Lógica para añadir al carrito (puedes integrar con tu carrito de compras)
        alert(`¡${funko.nombre} añadido al carrito!`);
    };

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (!funko) {
        return <div className="error">Funko no encontrado</div>;
    }

    return (
        <div className="funko-detail">
            <button className="back-button" onClick={handleGoBack}>← Volver</button>
            <h1 className="funko-title">{funko.nombre}</h1>
            <div className="funko-detail-content">
                <div className="funko-detail-image">
                    {funko.imagen && <img src={funko.imagen} alt={funko.nombre} />}
                </div>
                <div className="funko-detail-info">
                    <p className="funko-price">Precio: <strong>{funko.precio} EUR</strong></p>
                    <p className="funko-quantity">Cantidad disponible: <strong>{funko.cantidad}</strong></p>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};
export default FunkoDetail;
