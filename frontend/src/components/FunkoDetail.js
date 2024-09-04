// src/components/FunkoDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFunkos } from '../services/api'; // Asumiendo que puedes obtener el funko por su id
import './FunkoDetail.css';

const FunkoDetail = () => {
    const { id } = useParams(); // Obtén el id del parámetro de la URL
    const [funko, setFunko] = useState(null);

    useEffect(() => {
        const fetchFunko = async () => {
            try {
                const result = await getFunkos(); // Obtén todos los Funkos (o implementa una función para obtener por id)
                const selectedFunko = result.find(f => f.id === parseInt(id));
                setFunko(selectedFunko);
            } catch (error) {
                console.error('Error fetching funko details:', error);
            }
        };
        fetchFunko();
    }, [id]);

    if (!funko) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="funko-detail">
            <h1>{funko.nombre}</h1>
            <div className="funko-detail-content">
                <div className="funko-detail-image">
                    {funko.imagen && <img src={funko.imagen} alt={funko.nombre} />}
                </div>
                <div className="funko-detail-info">
                    <p>Precio: {funko.precio} EUR</p>
                    <p>Cantidad disponible: {funko.cantidad}</p>
                    <p>Descripción: {funko.descripcion}</p> {/* Asume que el objeto funko tiene una descripción */}
                </div>
            </div>
        </div>
    );
};

export default FunkoDetail;
