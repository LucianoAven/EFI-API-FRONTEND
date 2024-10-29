import { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDevice() {
  const [device, setDevice] = useState({
    marca: "",
    modelo: "",
    tipo: "",
    numero_serie: "",
    estado: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDevice({
      ...device,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDevice = () => {
    axios
      .post("http://localhost:4000/api/devices/", device)
      .then((data) => {
        console.log(data);
        navigate("/dashboard");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Input
        id="brand"
        label="Marca"
        name="marca"
        placeholder="Ingrese marca del dispositivo"
        type="text"
        onChange={handleChange}
      />
      <Input
        id="model"
        label="Modelo"
        name="modelo"
        placeholder="Ingrese modelo del dispositivo"
        type="text"
        onChange={handleChange}
      />
      <Input
        id="type"
        label="Tipo"
        name="tipo"
        placeholder="Ingrese el tipo de dispositivo"
        type="text"
        onChange={handleChange}
      />
      <Input
        id="serialNumber"
        label="Numero de serie"
        name="numero_serie"
        placeholder="Ingrese número de serie"
        type="text"
        onChange={handleChange}
      />
      <Input
        id="state"
        label="Estado"
        name="estado"
        placeholder="Ingrese estado del dispositivo"
        type="text"
        onChange={handleChange}
      />

      <button onClick={() => handleAddDevice()}>Agregar</button>
    </>
  );
}
