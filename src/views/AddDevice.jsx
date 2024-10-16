import { useState } from "react";
import Input from "../components/Input";

export default function AddDevice() {
  const [device, setDevice] = useState({
    brand: "",
    model: "",
    type: "",
    serialNumber: "",
    state: "",
  });

  const handleChange = (e) => {
    setDevice({
      ...device,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDevice = () => {};

  return (
    <>
      <Input
        id="brand"
        label="Marca"
        name="brand"
        placeholder="Ingrese marca del dispositivo"
        type="text"
        onChange={handleChange}
      />
      <Input
        id="model"
        label="Modelo"
        name="model"
        placeholder="Ingrese modelo del dispositivo"
        type="text"
        onChange={handleChange}
      />
      <Input
        id="type"
        label="Tipo"
        name="type"
        placeholder="Ingrese el tipo de dispositivo"
        type="text"
        onChange={handleChange}
      />
      <Input
        id="serialNumber"
        label="Numero de serie"
        name="serialNumber"
        placeholder="Ingrese número de serie"
        type="text"
        onChange={handleChange}
      />
      <Input
        id="state"
        label="Estado"
        name="state"
        placeholder="Ingrese estado del dispositivo"
        type="text"
        onChange={handleChange}
      />

      <button onClick={() => handleAddDevice()}></button>
    </>
  );
}
