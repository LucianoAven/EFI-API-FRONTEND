import { useState } from "react";
import axios from "axios";
import { Input, FormButton } from "../components";
import { VscErrorSmall } from "react-icons/vsc";
import "./login.css";
import repairingMan from "../assets/repairingMan.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:4000/api/users/login/", {
        email: user.email,
        password: user.password,
      })
      .then((data) => {
        console.log(data);
        window.localStorage.setItem(
          "usuario",
          JSON.stringify(data.data.usuario)
        );

        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <div className="image-column">
        <img src={repairingMan} />
      </div>

      <div className="form-container">
        <h1>Iniciar Sesión</h1>
        <Input
          id="email"
          label="Email"
          name="email"
          placeholder="Ingrese su correo electrónico"
          type="text"
          onChange={handleChange}
        />
        <Input
          id="password"
          label="Contraseña"
          name="password"
          placeholder="Ingrese su contraseña"
          type="password"
          onChange={handleChange}
        />

        <FormButton buttonText="Ingresar" handler={handleLogin} />
      </div>
    </div>
  );
}
