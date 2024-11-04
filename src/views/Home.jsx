import { NavLink } from 'react-router-dom';
import HomeButton from '../components/Homebutton';
import DevicesIcon from '@mui/icons-material/Devices';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import { Box, Typography, Container} from '@mui/material';
export default function Home() {
    return (
        <Container  >
            {/* <Typography variant="h3"  sx={{ m: 5 }}>
            Nuestro servicios de reparación
            </Typography> */}
            <Box sx={{ display: 'flex',  alignItems: 'center', mt: 20,ml:10, gap: '1rem 5rem'}}>
                <NavLink to="/devices" >
                    <HomeButton titulo={"Dispositivos"} icon={<DevicesOutlinedIcon sx={{ fontSize: "15rem" }}/>}/> 
                </NavLink>
                <NavLink to="repair-orders">
                    <HomeButton titulo={"Ordenes de reparación"} icon={<EventNoteOutlinedIcon sx={{ fontSize: "15rem" }}/>}/> 
                </NavLink>
                <NavLink to="/repairs">
                <HomeButton titulo={"Reparaciones"} icon={<HandymanOutlinedIcon sx={{ fontSize: "15rem" }}/>}/>  
                </NavLink>    
                                       
            </Box>
        </Container>
    );
};

//sx={{ fontSize: "2.5rem" }}