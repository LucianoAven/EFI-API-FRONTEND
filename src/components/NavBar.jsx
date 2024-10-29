import { Link, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [user, setUser] = useState({});

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    let usuario = window.localStorage.getItem("usuario");
    setUser(usuario);
  }, [location]);

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/");
    console.log("toyota");
  };

  return (
    <>
      <div className="fondo">
        <div className="links">
          <Link className="object" to="/">
            Home
          </Link>
          {user === "undefined" || user === null || user === undefined ? (
            <>
              <Link className="object" to="/login">
                Ingresar
              </Link>
              <Link className="object" to="/register">
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <label onClick={() => handleLogout()}>Cerrar Sesion</label>
              <Link className="object" to="/dashboard">
                Dispositivos
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
