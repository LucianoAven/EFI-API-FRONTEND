// DeviceUpdateForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

const UpdateDeviceForm= () => {
    const { id } = useParams(); 
    const [deviceData, setDeviceData] = useState(null);

    useEffect(() => {
        const fetchDeviceData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/devices/${id}`);
                setDeviceData(response.data);
            } catch (error) {
                console.error("Error al obtener los datos del dispositivo:", error);
            }
        };
        fetchDeviceData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeviceData({ ...deviceData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/devices/${id}`, deviceData);
            alert("Dispositivo actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar el dispositivo:", error);
        }
    };
    if (!deviceData) return <p>Cargando...</p>;
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
            <Typography variant="h6" gutterBottom>Actualizar Dispositivo</Typography>
            <TextField label="Marca" name="marca" defaultValue={deviceData.marca} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Modelo" name="modelo" defaultValue={deviceData.modelo} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Tipo" name="tipo" defaultValue={deviceData.tipo} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Número de Serie" name="numero_serie" defaultValue={deviceData.numero_serie} onChange={handleChange} fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Actualizar Dispositivo</Button>
        </Box>
    );
}
export  default UpdateDeviceForm;