// src/components/FunkoList.js
import React, { useEffect, useState } from 'react';
import { getFunkos } from '../services/api';

const FunkoList = () => {
    const [funkos, setFunkos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getFunkos();
            setFunkos(result);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Lista de Funkos</h1>
            <ul>
                {funkos.map(funko => (
                    <li key={funko.id}>
                        <h2>{funko.nombre}</h2>
                        <p>Precio: {funko.precio} EUR</p>
                        <p>Cantidad disponible: {funko.cantidad}</p>
                        {funko.imagen && <img src={funko.imagen} alt={funko.nombre} className="product-image" />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FunkoList;