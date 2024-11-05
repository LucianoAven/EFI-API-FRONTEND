import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, CircularProgress, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RepairDetail = () => {
  const { id } = useParams(); 
  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/repairs/${id}`); 
        setRepair(response.data);
      } catch (error) {
        setError('Error al obtener los datos de la reparación');
      } finally {
        setLoading(false);
      }
    };

    fetchRepair();
  }, [id]);

  const handleList = () => {
    navigate("/repairs")
  };

  const handleFinalize = () => {
    navigate(`/repairs/update/${id}`)
  }

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>Detalles de la reparación</Typography>
        <Typography>Dispositivo: {repair.ordenReparacion.dispositivo.marca} {repair.ordenReparacion.dispositivo.modelo}</Typography>
        <Typography>Problema Reportado: {repair.ordenReparacion.problema_reportado}</Typography>
        <Typography>Técnico: {repair.ordenReparacion.tecnico.name}</Typography>
        <Typography>Fecha de Inicio: {repair.fecha_inicio}</Typography>
        <Typography>Fecha de Fin: {repair.fecha_fin}</Typography>
        <Typography>Estado: {repair.ordenReparacion.dispositivo.estado}</Typography>
        <Typography>Costo Real: {repair.costo_real}</Typography>
        <Box sx={{marginTop:"10"}}>
          {/* <Button  variant="contained" color="primary" fullWidth onClick={handleFinalize}>
              Marcar Reparación como Finalizada
          </Button> */}

          <Button
            onClick={handleList}
            variant="text"
            color="secondary"
            fullWidth
          >
            Volver a Reparaciones
        </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RepairDetail;
