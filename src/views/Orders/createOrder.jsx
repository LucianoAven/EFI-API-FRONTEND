import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const API_URL = 'http://localhost:8080/api/users';

const CreateOrderForm = () => {
    const location = useLocation();
    console.log(location)
  const [users, setUsers] = useState([]);
  const [tecnicoId,SetTecnicoId] =useState("");
  const [formData, setFormData] = useState({
    fecha:'',
    problema_reportado:'',
    id_dispositivo: location.state.id,
    id_usuario: '',
    costo_estimado:'',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
        setTimeout(() => {
            console.log(users);
          }, 2000);
          
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/orders', formData);
      setSuccessMessage(`Ordern creada con éxito`);
      setFormData({
        fecha:'',
        problema_reportado:'',
        id_dispositivo: '',
        id_usuario: '',
        costo_estimado:'',
      });
      setError(null);
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
        <InputLabel id="demo-simple-select-label">Técnico</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tecnicoId}
          label="tecnico"
          onChange={handleChange}
        >
            {users.map((user) => {
                if (user.role == "tecnico")(
                    <MenuItem value={user.id}>{user.name}</MenuItem>
                )
            }
               
            )}
        </Select>
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
