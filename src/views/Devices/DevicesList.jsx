import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Typography, Button,Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const API_URL = 'http://localhost:4000/api/devices';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const navigate = useNavigate(); 



  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(API_URL);
        setDevices(response.data);
      } catch (error) {
        console.error('Error al obtener los dispositivos:', error);
      }
    };

    fetchDevices();
  }, []);

  const handleMenuClick = (event, device) => {
    setAnchorEl(event.currentTarget);
    setSelectedDevice(device);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDevice(null);
  };

  const handleAction = (action) => {
    if (action === 'delete') {
      deleteDevice(selectedDevice.id)
    } else if (action === 'edit') {
      console.log('Editar dispositivo:', selectedDevice);
    } else if (action === 'details') {
      navigate(`/devices/${selectedDevice.id}`);
    } else if (action === 'createOrder') {
      navigate("/repair-orders/create", {state: selectedDevice});
    }
    handleMenuClose();
  };
  const deleteDevice = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/devices/${id}`);
      setDevices(devices.filter((device) => device.id !== id)); 
      alert('Dispositivo eliminado correctamente');
    } catch (error) {
      console.error("Error eliminando el dispositivo:", error);
      alert('Error eliminando el dispositivo');
    }
  };

  return (
    <TableContainer component={Paper}>
      <Box display={'flex'}>
        <Typography variant="h5" component="div" sx={{ m: 2 }}>
          Lista de Dispositivos
        </Typography>
        <NavLink to='/devices/add-device'>
          <Button> Registrar nuevo Dispositivo</Button>
        </NavLink>
      </Box>
      <Table aria-label="device table">
        <TableHead>
          <TableRow>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.marca}</TableCell>
              <TableCell>{device.modelo}</TableCell>
              <TableCell>{device.estado}</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleMenuClick(e, device)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleAction('details')}>Ver detalle</MenuItem>
                  <MenuItem onClick={() => handleAction('edit')}>Editar</MenuItem>
                  <MenuItem onClick={() => handleAction('delete')}>Borrar</MenuItem>
                  <MenuItem onClick={() => handleAction('createOrder')}>Crear orden</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceList;
