import { NavLink } from 'react-router-dom';
import HomeButton from '../components/Homebutton';
import DevicesIcon from '@mui/icons-material/Devices';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BuildIcon from '@mui/icons-material/Build';
import { Box, Typography} from '@mui/material';
export default function Home() {
    return (
        <>
            <Typography variant="h5" component="div" sx={{ m: 2 }}>
            Nuestro servicios de reparación
        </Typography>
            <Box display={"flex"}>
                <NavLink to="/devices">
                    <HomeButton titulo={"Dispositivos"} icon={<DevicesIcon sx={{ fontSize: "2.5rem" }}/>}/> 
                </NavLink>
                <NavLink to="repair-orders">
                    <HomeButton titulo={"Ordenes de reparación"} icon={<EventNoteIcon sx={{ fontSize: "2.5rem" }}/>}/> 
                </NavLink>
                <NavLink to="/repairs">
                <HomeButton titulo={"Reparaciones"} icon={<BuildIcon sx={{ fontSize: "2.5rem" }}/>}/>  
                </NavLink>    
                                       
            </Box>
        </>
    );
};

//sx={{ fontSize: "2.5rem" }}