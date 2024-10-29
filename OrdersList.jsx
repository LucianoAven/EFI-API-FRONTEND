import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom'; 

const API_URL = 'http://localhost:8080/api/orders';

const OrdersList = () =>{
    const [orders, setOrders] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get(API_URL);
            setOrders(response.data);
            setTimeout(() => {
                console.log(orders);
              }, 1000);
              
          } catch (error) {
            console.error('Error al obtener las ordenes de reparación:', error);
          }
        };
    
        fetchOrders();
      }, []);
      const handleMenuClick = (event, order) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrder(order);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedOrder(null);
      };
    
      const handleAction = (action) => {
        if (action === 'delete') {
          console.log('Borrar orden:', selectedOrder);
        } else if (action === 'edit') {
          console.log('Editar orden:', selectedOrder);
        } else if (action === 'details') {
          console.log('Ver detalle de la orden:', selectedOrder);
          navigate(`/orders/${selectedOrder.id}`);
        } else if (action === 'createRepair') {
          console.log('Crear reparación para la orden:', selectedOrder);
        }
        handleMenuClose();
      };
    return(
        <TableContainer component={Paper}>
        <Typography variant="h5" component="div" sx={{ m: 2 }}>
          Lista de Ordenes de reparación
        </Typography>
        <Table aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell>Dispositivo</TableCell>
              <TableCell>Problema Reportado</TableCell>
              <TableCell>Tecnico</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.dispositivo.modelo}</TableCell>
                <TableCell>{order.problema_reportado}</TableCell>
                <TableCell>{order.tecnico.name}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuClick(e, order)}>
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
                    <MenuItem onClick={() => handleAction('createOrder')}>Crear reparación</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
export default OrdersList