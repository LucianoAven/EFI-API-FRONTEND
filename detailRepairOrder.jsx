import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RepairOrderDetail = () => {
  const { id } = useParams(); 
  const [repairOrder, setRepairOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepairOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders/${id}`); 
        setRepairOrder(response.data);
      } catch (error) {
        setError('Error al obtener los datos de la orden de reparacion');
      } finally {
        setLoading(false);
      }
    };

    fetchRepairOrder();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Detalles de la orden de reparacion</h1>
      <p>Fecha: {repairOrder.fecha}</p>
      <p>problema_reportado: {repairOrder.problema_reportado}</p>
      <p>Dispositivo: {repairOrder.id_dispositivo}</p>
      <p>Usuario: {repairOrder.id_usuario}</p>
      <p>Costo estimado: {repairOrder.costo_estimado}</p>
    </div>
  );
};

export default RepairOrderDetail;
