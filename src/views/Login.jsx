import React, { useState, useContext } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Container, Stack } from "@mui/material";
import AuthContext from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>

            <Button
              onClick={handleNavigate}
              variant="text"
              color="secondary"
              fullWidth
            >
              Registrarse
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
