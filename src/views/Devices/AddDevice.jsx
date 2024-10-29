// src/components/CreateDeviceForm.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const CreateDeviceForm = () => {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    tipo: '',
    numero_serie: '',
    estado: 'Pendiente',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/devices', formData);
      setSuccessMessage(`Dispositivo creado con éxito: ${response.data.marca} ${response.data.modelo}`);
      setFormData({
        marca: '',
        modelo: '',
        tipo: '',
        numero_serie: '',
        estado: '',
      });
      setError(null);
    } catch (err) {
      setError('Error creando el dispositivo');
      setSuccessMessage(null);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Crear Dispositivo
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Marca"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Modelo"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Número de Serie"
          name="numero_serie"
          value={formData.numero_serie}
          onChange={handleChange}
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && <Typography color="success.main">{successMessage}</Typography>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Crear
        </Button>
      </form>
    </Box>
  );
};

export default CreateDeviceForm;
