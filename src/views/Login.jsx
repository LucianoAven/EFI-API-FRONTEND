import { useState } from "react";
import axios from "axios";
import Input from "../components/Input.jsx";
//import { VscErrorSmall } from "react-icons/vsc";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/api/users/login", {
        email: user.email,
        password: user.password,
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
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
        placeholder="Ingese su contraseña"
        type="password"
        onChange={handleChange}
      />

      <button onClick={() => handleLogin()}>Ingresar</button>
    </div>
  );
}
