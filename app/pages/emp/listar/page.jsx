"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { select } from '../../../api/select/route'; // api rest
import { deleteData } from '../../../api/delete/route'; // api rest


function DataListPage() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [userId, setUserId] = useState(null);

  
  const fetchData = async (id) => {
    const result = await select();
    const filteredData = result.filter(item => item.id === id);
    setData(filteredData);
    setOriginalData(filteredData);
  };

  const fetchUserData = async () => {
    const profile = await axios.get("/api/profile");
    const { id } = profile.data;
    setUserId(id);
    fetchData(id); // Llama a fetchData aquí
  };
  

  useEffect(() => {
    fetchUserData(); // Obtén la ID del usuario actual
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
    router.push('/pages/emp');
  };

  const handleEDIT = (id) => {
    router.push(`/pages/emp/edit?id=${id}`, undefined, { shallow: true });
  };


  return (
    <div>
      <button type="button" onClick={handleRedirecttoRRHH}>Volver</button> 
    {successMessage && <div style={{ position: 'fixed', top: 10, right: 10, backgroundColor: 'green', padding: 10, borderRadius: 5, color: 'white' }}>{successMessage}</div>}
    <h1>Información Personal</h1>

    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid black' }}>
          <th style={{ border: '1px solid black', padding: '10px' }}>Nombre completo</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Sexo</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Dirección</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Teléfono</th>

          <th style={{ border: '1px solid black', padding: '10px' }}>Nombre de la Carga</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Parentesco</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Sexo de la Carga</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>RUT de la Carga</th>

          <th style={{ border: '1px solid black', padding: '10px' }}>Nombre Contacto</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Número Contacto</th>
          <th style={{ border: '1px solid black', padding: '10px' }}>Relación con el Contacto</th>


          <th style={{ border: '1px solid black', padding: '10px' }}>Acciones</th>
          {/* Agrega el resto de los encabezados de las columnas aquí */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} style={{ borderBottom: '1px solid black' }}>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.full_name}</td>

            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.sex}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.address}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.phone}</td>

            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.nom_carga}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.relation_carga}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.sex_carga}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.rut_carga}</td>

            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.nom_sos}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.phone_sos}</td>
            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{item.relation_sos}</td>
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