import React, { useState } from "react";
import axios from "axios";
import { validateName, validateEmail, validatePassword } from "../validations";
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl, Stack } from "@mui/material";
import dispositivo from "../assets/images.jpeg";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "tecnico"
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/users", formData);
      setSuccess("Usuario creado exitosamente");
      setError(null);
      navigate("/login");
    } catch (err) {
      setError("Error al crear el usuario");
      setSuccess(null);
    }
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Box component="img" src={dispositivo} alt="dispositivo" sx={{ width: 150, mb: 2 }} />
        
        <Typography variant="h5" component="h1" gutterBottom>
          Registro de Usuario
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              type="email"
            />
            <TextField
              label="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              type="password"
            />
            <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="tecnico">Técnico</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar
            </Button>
            <Button onClick={handleNavigate} variant="outlined" color="secondary" fullWidth>
              Iniciar Sesión
            </Button>
          </Stack>
        </Box>

        {error && <Typography color="error" mt={2}>{error}</Typography>}
        {success && <Typography color="success.main" mt={2}>{success}</Typography>}
      </Box>
    </Container>
  );
}
