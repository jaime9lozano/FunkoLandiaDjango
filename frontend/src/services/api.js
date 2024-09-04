// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Asegúrate de que esta URL apunte a tu API de Django

export const getFunkos = async () => {
    try {
        const response = await axios.get(`${API_URL}funkos/`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the funkos!", error);
        throw error;
    }
};