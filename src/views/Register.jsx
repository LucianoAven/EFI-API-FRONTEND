import { useState } from "react";
import axios from "axios";
import { validateName, validateEmail, validatePassword } from "../validations";
import Input from "../components/Input.jsx";
import "./register.css";
import dispositivo from "../assets/images.jpeg";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validateRegister = () => {
    const newErrors = {
      name: !user.name.trim()
        ? "El nombre es requerido"
        : !validateName(user.name)
        ? "El nombre solo puede contener letras"
        : "",
      phoneNumber: !user.phoneNumber.trim()
        ? "El número de teléfono es requerido"
        : "",
      email: !user.email.trim()
        ? "El Email es requerido"
        : !validateEmail(user.email)
        ? "El formato ingresado en el Email no es válido"
        : "",
      password: !user.password.trim()
        ? "La contraseña es requerida"
        : user.password.length < 8
        ? "La contraseña debe tener al menos ocho caracteres"
        : user.password.length > 32
        ? "La contraseña debe tener menos de 32 caracteres"
        : !validatePassword(user.password)
        ? "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial"
        : "",
      passwordRepeat: !user.passwordRepeat.trim()
        ? "La contraseña es requerida"
        : user.passwordRepeat !== user.password
        ? "Las contraseñas deben coincidir"
        : "",
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(
      (error) => error.trim() !== ""
    );
    return !hasErrors;
  };

  const handleRegister = () => {
    console.log("Hola mundo");
    console.log(validateRegister());
    if (validateRegister()) {
      axios
        .post("http://localhost:4000/api/users", {
          name: user.name,
          email: user.email,
          password: user.password,
          role: "user",
        })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container">
      <div>
        <img src={dispositivo} />
      </div>

      <div>
        <Input
          id="name"
          label="Nombre Completo"
          name="name"
          placeholder="Escriba su nombre"
          type="text"
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          id="email"
          label="Email"
          name="email"
          placeholder="Ingrese su Email"
          type="email"
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          id="phoneNumber"
          label="Numero de telefono"
          name="phoneNumber"
          placeholder="Ingrese su número de teléfono"
          type="tel"
          pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}-[0-9]{4}"
          onChange={handleChange}
          error={errors.phoneNumber}
        />
        <Input
          id="password"
          label="Contraseña"
          name="password"
          placeholder="Ingese su contraseña"
          type="password"
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          id="passwordRepeat"
          label="Repetir contraseña"
          name="passwordRepeat"
          placeholder="Vuelva a ingresar la contraseña"
          type="password"
          onChange={handleChange}
          error={errors.passwordRepeat}
        />

        <button onClick={() => handleRegister()}>Registrarse</button>
      </div>
    </div>
  );
}
