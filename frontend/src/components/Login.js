// src/components/Login.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, CircularProgress, Typography, Container, Box } from '@mui/material';
import './Login.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {getCSRFToken} from "../utils/csrf";
import Cookies from 'js-cookie';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage('');

        try {
            const csrfToken = getCSRFToken();  // Obtén el token CSRF de las cookies
            const response = await axios.post('http://localhost:8000/api/login/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken  // Incluye el token CSRF en las cabeceras
                },
                withCredentials: true  // Permite enviar las cookies
            });

            console.log('Login successful:', response.data);
            // Guarda los datos del usuario en una cookie (puede ser el token o la información que necesites)
            //Cookies.set('user', JSON.stringify(response.data.username), { expires: 1 });  // Guardamos al usuario logueado en una cookie por 1 día
            navigate('/');

        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage(error.response?.data?.error || 'Inicio de sesión fallido. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box className="login-container" component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Iniciar Sesión
                </Typography>

                <TextField
                    label="Usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('username', {
                        required: 'El usuario es obligatorio',
                        minLength: {
                            value: 3,
                            message: 'El usuario debe tener al menos 3 caracteres'
                        }
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />

                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                            value: 6,
                            message: 'La contraseña debe tener al menos 6 caracteres'
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                {errorMessage && (
                    <Typography color="error" align="center" margin="normal">
                        {errorMessage}
                    </Typography>
                )}

                <Box display="flex" justifyContent="center" marginTop={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={24} /> : 'Entrar'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

