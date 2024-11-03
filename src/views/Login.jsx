import { useState } from "react";
import axios from "axios";
import Input from "../components/Input.jsx";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:4000/api/users/login", {
        email: user.email,
        password: user.password,
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
};
const handleNavigate = () =>{
  navigate("/register")
}


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          name="email"
          placeholder="Ingrese su correo electrónico"
          type="text"
          onChange= {(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          label="Contraseña"
          name="password"
          placeholder="Ingese su contraseña"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>

        <button onClick={handleNavigate}>Registrarse</button>
      </form>
    </div>
  );
}
