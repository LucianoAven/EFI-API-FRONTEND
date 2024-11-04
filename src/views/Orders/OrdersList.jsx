import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

const Action = (props) =>{
  const order = props.order
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const {userRole} = useContext(AuthContext);

  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };
  const CreateRepair = async () => {
    const repairData = {
      id_orden: selectedOrder.id,
      fecha_inicio: new Date(),
      fecha_fin: null,
      costo_real: null,
    };
    try {
      const response = await axios.post('http://localhost:4000/api/repairs', repairData);
      setSuccessMessage('Reparación creada con éxito');

      const dispositivoId = selectedOrder.id_dispositivo;
      await axios.put(`http://localhost:4000/api/devices/${dispositivoId}`, { estado: "En Reparación" });

      setError(null);
      navigate(`/repairs/${response.data.id}`)
    } catch (err) {
      console.error("Error creando la reparación:", err);
      setError('Error creando la reparación');
      setSuccessMessage(null);
    }
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleAction = (action) => {
    if (action === 'delete') {
      deleteOrder(selectedOrder.id)
    } else if (action === 'edit') {
      navigate(`/repair-orders/update/${selectedOrder.id}`);
    } else if (action === 'details') {
      navigate(`/repair-orders/${selectedOrder.id}`);
    } else if (action === 'createRepair') {
      CreateRepair()
    }
    handleMenuClose();
  };
  // const deleteOrder = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:4000/api/orders/${id}`);
  //     setOrders(orders.filter((order) => order.id !== id)); 
  //     alert('Orden eliminada correctamente');
  //   } catch (error) {
  //     console.error("Error eliminando la orden:", error);
  //     alert('Error eliminando la orden');
  //   }
  // };
  const deleteOrder = props.deleteOrder

  const handleClick = () =>{
    navigate(`/repair-orders/${order.id}`)
  }
  if (userRole == "admin"){
    return(
      <><IconButton onClick={(e) => handleMenuClick(e, order)}>
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
          <MenuItem onClick={() => handleAction('createRepair')}>Crear reparación</MenuItem>
        </Menu></>
    )
  }else{
    return(
      <Button onClick={handleClick}>
        Ver Detalle 
      </Button>
    )
  }


}

const API_URL = 'http://localhost:4000/api/orders';

const OrdersList = () =>{
    const [orders, setOrders] = useState([]);
    
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
      
      const deleteOrder = async (id) => {
        try {
          await axios.delete(`http://localhost:4000/api/orders/${id}`);
          setOrders(orders.filter((order) => order.id !== id)); 
          alert('Orden eliminada correctamente');
        } catch (error) {
          console.error("Error eliminando la orden:", error);
          alert('Error eliminando la orden');
        }
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
                  <Action order={order} deleteOrder={deleteOrder}/>
                  {/* <IconButton onClick={(e) => handleMenuClick(e, order)}>
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
                    <MenuItem onClick={() => handleAction('createRepair')}>Crear reparación</MenuItem>
                  </Menu> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
export default OrdersList