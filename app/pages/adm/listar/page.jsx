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
  const [filters, setFilters] = useState({
    sex: '',
    area: '',
    empleo: ''
  });

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
  
  const handleRedirecttoADMIN = () => {
    router.push('/pages/adm');
  };

  const handleEDIT = (id) => {
    router.push(`/pages/adm/edit?id=${id}`, undefined, { shallow: true });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prevState => ({
      ...prevState,
      [filterType]: value
    }));
  };

  const applyFilters = () => {
    // Si no se seleccionó ningún filtro, restablece los datos a su estado original
    if (filters.sex === '' && filters.area === '' && filters.empleo === '') {
      setData(originalData);
      return;
    }
  
    // Aplica los filtros seleccionados
    let filteredData = originalData;
    if (filters.sex) {
      filteredData = filteredData.filter(item => item.sex === filters.sex);
    }
    if (filters.area) {
      filteredData = filteredData.filter(item => item.area === filters.area);
    }
    if (filters.empleo) {
      filteredData = filteredData.filter(item => item.empleo === filters.empleo);
    }
    setData(filteredData);
  };

  const handleSearch = () => {
    setData(originalData); // Restablece los datos a su estado original
    applyFilters();
    setFilters({sex: '', area: '', empleo: ''}); // Restablece las selecciones de los filtros
  };

  return (
    <div>
    <button type="button" onClick={handleRedirecttoADMIN}>Volver</button>  

      <select value={filters.sex} onChange={(e) => handleFilterChange('sex', e.target.value)}>
        <option value="">- Seleccione sexo -</option>
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
      <select value={filters.area} onChange={(e) => handleFilterChange('area', e.target.value)}>
        <option value="">- Seleccione área -</option>
        <option value="Administracion">Administración</option>
        <option value="Marketing">Marketing</option>
        <option value="Bodega">Bodega</option>
      </select>
      <select value={filters.empleo} onChange={(e) => handleFilterChange('empleo', e.target.value)}>
        <option value="">- Seleccione empleo -</option>
        <option value="Administrador">Administrador</option>
        <option value="Ejecutivo">Ejecutivo</option>
        <option value="Bodeguero">Bodeguero</option>
        <option value="Computin">Computin</option>
      </select>
      <button onClick={handleSearch}>Buscar</button>

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