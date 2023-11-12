"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { select } from '../../../api/select/route'; // api rest
import { deleteData } from '../../../api/delete/route'; // api rest
import 'bootstrap/dist/css/bootstrap.css'; // bootstrap

function Navbar({ logout }) {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <img
          className="img-fluid"
          src="/src/minilogo.png"
          alt="logo para btn"
          width={255.9}
          height={130}
        />
        <button className="btn btn-primary" type="submit" onClick={logout}>
          Salir
        </button>
      </div>
    </nav>
  );
}

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

  const logout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
    router.push("/login");
  };


  return (
    <div style={{ backgroundColor: '#DBD7D7', minHeight: '100vh' }}>
    <Navbar logout={logout} />   
    <button className="btn btn-primary" onClick={handleRedirecttoRRHH} style={{ margin: '11px' }}>Volver</button> 
    {successMessage && <div style={{ position: 'fixed', top: 10, right: 10, backgroundColor: 'green', padding: 10, borderRadius: 5, color: 'white' }}>{successMessage}</div>}
    <h1 style={{ margin: '11px', color: 'black' }}>Lista de Usuarios</h1>

    <table style={{ margin: '11px', textAlign: 'center' }} className="table">
      <thead>
        <tr style={{ borderBottom: '1px solid black' }}>
          <th scope="col">Nombre completo</th>
          <th scope="col">RUT</th>
          <th scope="col">Sexo</th>
          <th scope="col">Direccion</th>
          <th scope="col">Telefono</th>
          <th scope="col">Area</th>
          <th scope="col">Empleo</th>
          <th scope="col">Acciones</th>
          {/* Agrega el resto de los encabezados de las columnas aquí */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td scope="col">{item.full_name}</td>
            <td scope="col">{item.rut}</td>
            <td scope="col">{item.sex}</td>
            <td scope="col">{item.address}</td>
            <td scope="col">{item.phone}</td>
            <td scope="col">{item.area}</td>
            <td scope="col">{item.empleo}</td>
            <td scope="col">
                {/* Botón de editar */}
                <button className="btn btn-primary" onClick={() => handleEDIT(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg></button>
                {/* Botón de eliminar */}
                <button className="btn btn-danger" onClick={() => handleDELETE(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                </svg></button>
                
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default DataListPage;