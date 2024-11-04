import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, CircularProgress, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RepairOrderDetail = () => {
  const { id } = useParams(); 
  const [repairOrder, setRepairOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRepairOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders/${id}`); 
        setRepairOrder(response.data);
      } catch (error) {
        setError('Error al obtener los datos de la orden de reparacion');
      } finally {
        setLoading(false);
      }
    };

    fetchRepairOrder();
  }, [id]);

  const handleList = () => {
    navigate("/repair-orders")
  };

  const handleEdit = () => {
    navigate(`/repair-orders/update/${id}`)
  }

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>Detalles de la orden de reparación</Typography>
        <Typography>Fecha: {repairOrder.fecha}</Typography>
        <Typography>Problema Reportado: {repairOrder.problema_reportado}</Typography>
        <Typography>Dispositivo: {repairOrder.dispositivo.marca} {repairOrder.dispositivo.modelo}</Typography>
        <Typography>Técnico: {repairOrder.tecnico.name}</Typography>
        <Typography>Costo estimado: {repairOrder.costo_estimado}</Typography>
        <Typography>Estado: {repairOrder.dispositivo.estado}</Typography>
        <Box sx={{marginTop:"10"}}>
          {/* <Button  variant="contained" color="primary" fullWidth onClick={handleEdit}>
                Editar Order de Reparación
              </Button> */}

              <Button
                onClick={handleList}
                variant="text"
                color="secondary"
                fullWidth
              >
                Volver a Ordenes de Reparación
            </Button>
          </Box>
      </Paper>
    </Container>
  );
};

export default RepairOrderDetail;
