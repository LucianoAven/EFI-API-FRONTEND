import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

const Action = (props) =>{
  const repair = props.repair
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const navigate = useNavigate();
  const {userRole} = useContext(AuthContext);

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
      deleteRepair(selectedRepair.id)
    } else if (action === 'finalize') {
      navigate(`/repairs/update/${selectedRepair.id}`);
    } else if (action === 'details') {
      navigate(`/repairs/${selectedRepair.id}`);
    } 
    handleMenuClose();
  };
  

  const deleteRepair = props.deleteRepair
  const handleClick = () =>{
    navigate(`/repairs/${repair.id}`)
  }
  if (userRole == "tecnico"){
    return(
      <><IconButton onClick={(e) => handleMenuClick(e, repair)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
          <MenuItem onClick={() => handleAction('details')}>Ver detalle</MenuItem>
          <MenuItem onClick={() => handleAction('finalize')}>Finalizar</MenuItem>
          <MenuItem onClick={() => handleAction('delete')}>Borrar</MenuItem>
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

const API_URL = 'http://localhost:4000/api/repairs';

const RepairsList = () =>{
    const [repairs, setRepairs] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRepair, setSelectedRepair] = useState(null);
    const {userRole} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRepairs = async () => {
          try {
            const response = await axios.get(API_URL);
            const repairsObtenidas = response.data
            if (userRole == "tecnico"){
              setRepairs(repairsObtenidas.filter((repair)=>repair.ordenReparacion.tecnico.id == user.id))
            } else {
              setRepairs(repairsObtenidas);
            }
            
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
          deleteRepair(selectedRepair.id)
        } else if (action === 'edit') {
          console.log('Editar reparación:', selectedRepair);
        } else if (action === 'details') {
          navigate(`/repairs/${selectedRepair.id}`);
        } 
        handleMenuClose();
      };
      const deleteRepair = async (id) => {
        try {
          await axios.delete(`http://localhost:4000/api/repairs/${id}`);
          setRepairs(repairs.filter((repair) => repair.id !== id)); 
          alert('Reparación eliminada correctamente');
        } catch (error) {
          console.error("Error eliminando la reparación:", error);
          alert('Error eliminando la reparación');
        }
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
                {repair.fecha_fin ?<TableCell>{repair.fecha_fin}</TableCell> :<TableCell>-</TableCell> }
                {repair.costo_real?<TableCell>{repair.costo_real}</TableCell> :<TableCell>-</TableCell> }
                <TableCell align="right">
                  <Action repair={repair} deleteRepair={deleteRepair}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
export default RepairsList