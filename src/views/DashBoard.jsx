import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoDeviceDesktop } from "react-icons/go";

export default function DashBoard() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/devices/")
      .then((data) => {
        console.log(data.data);
        setDevices(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-device/${id}`);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Numero Serie</th>
            <th>Estado</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {devices.length
            ? devices.map((device) => {
                return (
                  <tr key={device.id}>
                    <th>{device.id}</th>
                    <th>{device.tipo}</th>
                    <th>{device.marca}</th>
                    <th>{device.modelo}</th>
                    <th>{device.numero_serie}</th>
                    <th>{device.estado}</th>
                    <th>
                      <button onClick={() => handleEdit(device.id)}>
                        Editar
                      </button>
                    </th>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </>
  );
}
