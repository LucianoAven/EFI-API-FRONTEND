import { useState } from "react";
import axios from "axios";
import { validateName, validateEmail, validatePassword } from "../validations";
import Input from "../components/Input.jsx";
import "./register.css";
import dispositivo from "../assets/images.jpeg";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "tecnico" 
});


const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

const navigate = useNavigate()

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
      ...formData,
      [name]: value
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:4000/api/users", formData);
        setSuccess("Usuario creado exitosamente");
        setError(null);
        navigate("/login")
    } catch (err) {
        setError("Error al crear el usuario");
        setSuccess(null);
    }
};

const handleNavigate = () =>{
  navigate("/login")
}


  return (
    <div className="container">
      <div>
        <img src={dispositivo} />
      </div>

      <div>
        <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Rol:
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="tecnico">Técnico</option>
                        <option value="admin">Administrador</option>
                    </select>
                </label>
                <br />
                <button type="submit">Registrar</button>

                <button onClick={handleNavigate}>Iniciar Sesión</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </div>
  );
}
