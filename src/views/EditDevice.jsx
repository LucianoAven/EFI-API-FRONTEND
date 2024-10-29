import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditDevice() {
  const [device, setDevice] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    let usuario = window.localStorage.getItem("usuario");
    usuario = JSON.parse(usuario);
    setUser(usuario);
    axios
      .get("http://localhost:4000/api/devices/" + id)
      .then((data) => {
        console.log(data);
        setDevice(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setDevice({
      ...device,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setDevice({
      ...device,
      estado: e.target.value,
    });
  };

  const handleEdit = () => {
    axios
      .put("http://localhost:4000/api/devices/" + id, device)
      .then((data) => {
        console.log(data);
        navigate("/dashboard");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:4000/api/devices/" + id)
      .then((data) => {
        console.log(data);
        navigate("/dashboard");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {user?.role === "admin" && Object.keys(device).length ? (
        <>
          <label>Tipo</label>
          <input
            defaultValue={device.tipo}
            name="tipo"
            onChange={handleChange}
          />
          <label>Marca</label>
          <input
            defaultValue={device.marca}
            name="marca"
            onChange={handleChange}
          />

          <label>Modelo</label>
          <input
            defaultValue={device.modelo}
            name="modelo"
            onChange={handleChange}
          />
          <label>Numero Serie</label>
          <input
            defaultValue={device.numero_serie}
            name="numero_serie"
            onChange={handleChange}
          />
          <label>Estado</label>
          <select value={device.estado} onChange={handleSelect}>
            <option value="En reparacion">En reparacion</option>
            <option value="Terminado">Termiando</option>
          </select>
          <button onClick={() => handleEdit()}>Editar</button>
          <button onClick={() => handleDelete()}>Eliminar</button>
        </>
      ) : user?.role === "tecnico" && Object.keys(device).length ? (
        <>
          <label>Tipo</label>
          <label>{device.tipo}</label>
          <label>Marca</label>
          <label>{device.marca}</label>
          <label>Modelo</label>
          <label>{device.modelo}</label>
          <label>Numero Serie</label>
          <label>{device.numero_serie}</label>
          <label>Estado</label>
          <select value={device.estado} onChange={handleSelect}>
            <option value="En reparacion">En reparacion</option>
            <option value="Terminado">Termiando</option>
          </select>
          <button onClick={() => handleEdit()}>Editar</button>
        </>
      ) : null}
    </div>
  );
}
