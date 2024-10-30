import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RepairDetail = () => {
  const { id } = useParams(); 
  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/repairs/${id}`); 
        setRepair(response.data);
      } catch (error) {
        setError('Error al obtener los datos de la reparacion');
      } finally {
        setLoading(false);
      }
    };

    fetchRepair();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Detalles de la reparacion</h1>
      <p>fecha_inicio: {repair.fecha_inicio}</p>
      <p>fecha_fin: {repair.fecha_fin}</p>
      <p>Costo Real: {repair.costo_real}</p>
    </div>
  );
};

export default RepairDetail;
