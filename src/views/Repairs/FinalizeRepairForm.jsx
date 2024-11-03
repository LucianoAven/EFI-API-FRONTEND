import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

const FinalizeRepairForm = () => {
    const { id } = useParams();
    const [repairData, setRepairData] = useState(null);
    const [costoReal, setCostoReal] = useState("");

    useEffect(() => {
        const fetchRepairData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/repairs/${id}`);
                setRepairData(response.data);
            } catch (error) {
                console.error("Error al obtener los datos de la reparación:", error);
            }
        };
        fetchRepairData();
    }, [id]);

    const handleCostoRealChange = (e) => {
        setCostoReal(e.target.value);
    };

    const handleFinalizeRepair = async (e) => {
        e.preventDefault();
        const fechaFin = new Date().toISOString().split("T")[0]; 
        
        try {
            await axios.put(`http://localhost:4000/api/repairs/${id}`, {
                fecha_fin: fechaFin,
                costo_real: costoReal,
            });

            if (repairData && repairData.id_orden) {
                const orderResponse = await axios.get(`http://localhost:4000/api/orders/${repairData.id_orden}`);
                const dispositivoId = orderResponse.data.id_dispositivo;

                await axios.put(`http://localhost:4000/api/devices/${dispositivoId}`, { estado: "Reparado" });
            }

            alert("Reparación finalizada y dispositivo actualizado a 'Reparado'");

        } catch (error) {
            console.error("Error al finalizar la reparación:", error);
        }
    };

    if (!repairData) return <p>Cargando...</p>;

    return (
        <Box component="form" onSubmit={handleFinalizeRepair} sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
            <Typography variant="h6" gutterBottom>Finalizar Reparación</Typography>
            <TextField
                label="Costo Real"
                type="number"
                value={costoReal}
                onChange={handleCostoRealChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Finalizar Reparación
            </Button>
        </Box>
    );
};

export default FinalizeRepairForm;
