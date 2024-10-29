import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeviceDetail = () => {
  const { id } = useParams(); 
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/devices/${id}`); 
        setDevice(response.data);
      } catch (error) {
        setError('Error al obtener los datos del dispositivo.');
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Detalles del Dispositivo</h1>
      <h2>Marca: {device.marca}</h2>
      <p>Modelo: {device.modelo}</p>
      <p>Tipo: {device.tipo}</p>
      <p>Número de Serie: {device.número_serie}</p>
      <p>Estado: {device.estado}</p>
    </div>
  );
};

export default DeviceDetail;
