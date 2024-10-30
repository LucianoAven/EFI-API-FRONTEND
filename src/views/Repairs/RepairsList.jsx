import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/repairs';

const RepairsList = () =>{
    const [repairs, setRepairs] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRepair, setSelectedRepair] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRepairs = async () => {
          try {
            const response = await axios.get(API_URL);
            setRepairs(response.data);
            setTimeout(() => {
                console.log(orders);
              }, 1000);
          } catch (error) {
            console.error('Error al obtener las reparaciones:', error);
          }
        };
    
        fetchRepairs();
      }, []);
      const handleMenuClick = (event, repair) => {
        setAnchorEl(event.currentTarget);
        setSelectedRepair(repair);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRepair(null);
      };
    
      const handleAction = (action) => {
        if (action === 'delete') {
          console.log('Borrar reparación:', selectedRepair);
        } else if (action === 'edit') {
          console.log('Editar reparación:', selectedRepair);
        } else if (action === 'details') {
          navigate(`/repairs/${selectedRepair.id}`);
        } 
        handleMenuClose();
      };
    return(
        <TableContainer component={Paper}>
        <Typography variant="h5" component="div" sx={{ m: 2 }}>
          Lista de reparaciones
        </Typography>
        <Table aria-label="repair table">
          <TableHead>
            <TableRow>
              <TableCell>Dispositivo</TableCell>
              <TableCell>tecnico</TableCell>
              <TableCell>Fecha de inicio</TableCell>
              <TableCell>Fecha de finalización</TableCell>
              <TableCell>Costo</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair) => (
              <TableRow key={repair.id}>
                <TableCell>{repair.ordenReparacion.dispositivo.modelo}</TableCell>
                <TableCell>{repair.ordenReparacion.tecnico.name}</TableCell>
                <TableCell>{repair.fecha_inicio}</TableCell>
                <TableCell>{repair.fecha_final}</TableCell>
                <TableCell>{repair.costo}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuClick(e, repair)}>
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
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
export default RepairsList