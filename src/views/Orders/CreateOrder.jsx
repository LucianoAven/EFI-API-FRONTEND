import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api/users';

const CreateOrderForm = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    fecha: new Date(),
    problema_reportado: '',
    id_dispositivo: location.state.id,
    id_usuario: '',
    costo_estimado: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      id_usuario: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/orders', formData);
      setSuccessMessage('Orden creada con éxito');
      setFormData({
        fecha: '',
        problema_reportado: '',
        id_dispositivo: location.state.id,
        id_usuario: '',
        costo_estimado: '',
      });
      setError(null);
      navigate(`/repair-orders/${response.data.id}`)
    } catch (err) {
      setError('Error creando la orden');
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
        Crear Orden para {location.state.marca} {location.state.modelo}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Problema Reportado"
          name="problema_reportado"
          value={formData.problema_reportado}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Costo Estimado"
          name="costo_estimado"
          value={formData.costo_estimado}
          onChange={handleChange}
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="tecnico-select-label">Técnico</InputLabel>
          <Select
            labelId="tecnico-select-label"
            id="tecnico-select"
            value={formData.id_usuario}
            label="Técnico"
            onChange={handleSelectChange}
          >
            {users
              .filter((user) => user.role === "tecnico")
              .map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

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

export default CreateOrderForm;
