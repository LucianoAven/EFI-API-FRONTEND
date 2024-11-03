// UpdateRepairOrderForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useParams } from 'react-router-dom';

const UpdateRepairOrderForm = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        // Obtener datos de la orden de reparación
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/orders/${id}`);
                setOrderData(response.data);
            } catch (error) {
                console.error("Error al obtener los datos de la orden:", error);
            }
        };
        // Obtener lista de técnicos
        const fetchTechnicians = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/users?role=tecnico");
                setTechnicians(response.data);
            } catch (error) {
                console.error("Error al obtener técnicos:", error);
            }
        };
        fetchOrderData();
        fetchTechnicians();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/orders/${id}`, orderData);
            alert("Orden de reparación actualizada correctamente");
        } catch (error) {
            console.error("Error al actualizar la orden de reparación:", error);
        }
    };

    if (!orderData) return <p>Cargando...</p>;

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
            <Typography variant="h6" gutterBottom>Actualizar Orden de Reparación</Typography>
            <TextField
                label="Fecha"
                name="fecha"
                type="date"
                defaultValue={orderData.fecha}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Problema Reportado"
                name="problema_reportado"
                defaultValue={orderData.problema_reportado}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="ID del Dispositivo"
                name="id_dispositivo"
                defaultValue={orderData.id_dispositivo}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="technician-select-label">Técnico</InputLabel>
                <Select
                    labelId="technician-select-label"
                    name="id_usuario"
                    value={orderData.id_usuario || ""}
                    onChange={handleChange}
                    label="Técnico"
                >
                    {technicians.map((tech) => (
                        <MenuItem key={tech.id} value={tech.id}>
                            {tech.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Costo Estimado"
                name="costo_estimado"
                type="number"
                defaultValue={orderData.costo_estimado}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Actualizar Orden
            </Button>
        </Box>
    );
};

export default UpdateRepairOrderForm;
