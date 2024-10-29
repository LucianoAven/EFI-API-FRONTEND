import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Button color="inherit">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          </Button>
          <Button color="inherit">
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>Ingresar</Link>
          </Button>
          <Button color="inherit">
            <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>Registrarse</Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
