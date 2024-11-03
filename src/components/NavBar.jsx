import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

export default function NavBar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () =>{
    logout()
    navigate("/login")
  }
  return (
 
    <AppBar position="static" sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Button color="inherit">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          </Button>
          <Button color="inherit">
            <Link to="/devices" style={{ color: "inherit", textDecoration: "none" }}>Dispositivos</Link>
          </Button>
          <Button color="inherit">
            <Link to="/repair-orders" style={{ color: "inherit", textDecoration: "none" }}>Ordenes de Reparación</Link>
          </Button>
          <Button color="inherit">
            <Link to="/repairs" style={{ color: "inherit", textDecoration: "none" }}>Reparaciones</Link>
          </Button>
          <Button onClick={handleLogout} color="inherit">
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
