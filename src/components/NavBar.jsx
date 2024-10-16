import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <img />
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Ingresar</Link>
        <Link to="/register">Registrarse</Link>
      </div>
    </>
  );
}
