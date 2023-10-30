"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { select } from '../../../api/select/route'; // api rest
import { deleteData } from '../../../api/delete/route'; // api rest


function DataListPage() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [originalData, setOriginalData] = useState([]);


  const fetchData = async () => {
    const result = await select();
    setData(result);
    setOriginalData(result); // Guarda los datos originales
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleDELETE = async (id) => {
    const result = await deleteData(id);
    if (result) {
      fetchData(); // Refetch data after deletion
    }
  };
  
  const handleRedirecttoRRHH = () => {
    router.push('/pages/rrhh');
  };

  const handleEDIT = (id) => {
    router.push(`/pages/rrhh/edit?id=${id}`, undefined, { shallow: true });
  };


  return (
    <div>
      <button type="button" onClick={handleRedirecttoRRHH}>Volver</button> 
    {successMessage && <div style={{ position: 'fixed', top: 10, right: 10, backgroundColor: 'green', padding: 10, borderRadius: 5, color: 'white' }}>{successMessage}</div>}
    <h1>Lista de Usuarios</h1>

    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid black' }}>
          <th style={{ border: '1px solid black', padding: '10px' }}>Nombre completo</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>RUT</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Sexo</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Direccion</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Telefono</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Area</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Empleo</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Acciones</th>
          {/* Agrega el resto de los encabezados de las columnas aquí */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} style={{ borderBottom: '1px solid black' }}>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.full_name}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.rut}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.sex}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.address}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.phone}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.area}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.empleo}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                {/* Botón de editar */}
                <button onClick={() => handleEDIT(item.id)}>Editar</button>
                {/* Botón de eliminar */}
                <button onClick={() => handleDELETE(item.id)}>Eliminar</button>
                
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default DataListPage;