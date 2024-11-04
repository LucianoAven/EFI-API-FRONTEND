import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, CircularProgress, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DeviceDetail = () => {
  const { id } = useParams(); 
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/devices/${id}`); 
        setDevice(response.data);
      } catch (error) {
        setError('Error al obtener los datos del dispositivo.');
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  const handleList = () => {
    navigate("/devices")
  };

  const handleEdit = () => {
    navigate(`/devices/update/${id}`)
  }

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Typography color="error" align="center" mt={4}>
      {error}
    </Typography>
  );

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom align="center">
          Detalles del Dispositivo
        </Typography>
        <Typography variant="h6">Marca: {device.marca}</Typography>
        <Typography>Modelo: {device.modelo}</Typography>
        <Typography>Tipo: {device.tipo}</Typography>
        <Typography>Número de Serie: {device.número_serie}</Typography>
        <Typography>Estado: {device.estado}</Typography>
        <Box sx={{marginTop:"10"}}>
          {/* <Button  variant="contained" color="primary" fullWidth onClick={handleEdit}>
                Editar Dispositivo
              </Button> */}

              <Button
                onClick={handleList}
                variant="text"
                color="secondary"
                fullWidth
              >
                Volver a Dispositivos
            </Button>
          </Box>
      </Paper>
    </Container>
  );
};

export default DeviceDetail;
