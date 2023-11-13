"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';


import { selectData } from '../../../api/select/route_id'; // api rest
import { updateData } from '../../../api/edit/route'; // api rest

import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css';

const queryClient = new QueryClient();

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

function EditFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // Estado para almacenar el mensaje de éxito
  const [rutError, setRutError] = useState(''); // Estado para almacenar el error del RUT de carga
  let id;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      id = url.searchParams.get('id');
      console.log("id from URL", id); // Verificar el ID desde la URL

      if (id) {
        const fetchData = async () => {
          const result = await selectData(id);
          if (result) {
            setFormData(result);
          }
        };
        fetchData();
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData((oldData) => ({
      ...oldData,
      [e.target.name]: e.target.value,
    }));
  };

  const { data: form, error } = useQuery(['user', id], () => selectData(id), {
    enabled: !!id,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const handleUpdate = async () => {
    const { id, ...data } = formData; // Excluye el ID del objeto de datos
    const success = await updateData(id, data); // Llama a la función de actualización y pasa el ID y los datos

    if (success) {
      setSuccessMessage('Editado exitosamente');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      // Si la actualización fue exitosa, redirige a la página de visualización o muestra un mensaje de éxito
      router.push('/pages/emp/listar');
    } else {
      // Si hay un error, muestra un mensaje de error
      console.error('Error al actualizar los datos');
    }
  };

  const handleChange0 = (e) => {
    const { name, value } = e.target;
    if (name === 'rut_carga') {
      if (!/^[0-9]{7,8}-[0-9Kk]$/.test(value)) {
        setRutError('RUT inválido');
      } else {
        setRutError('');
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRedirect = () => {
    router.push('/pages/emp/listar');
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
    <div style={{ backgroundColor: '#DBD7D7', minHeight: '100vh', overflow: 'hidden' }}>
      <Navbar logout={logout} />
      <div>
      <button style={{margin:'20px'}} className="btn btn-primary" onClick={handleRedirect}>Volver</button>
      <h1 style={{marginLeft:'40px', color: 'black'}}>Editar Perfil</h1>
      <div style={{marginLeft:'20px', color: 'black'}} className='row'>
      <div className="col-lg-4 d-flex justify-content-lg-end justify-content-center">  
      <form className='container'>
      <div className='row'> 
      <div className='col-6 col-md-6'>
      <h3>Datos Personales</h3>
        <label className="form-label" style={{color: 'black'}}>
          Nombre completo:
          <input className="form-control" type="text" name="full_name" value={formData.full_name || ''} onChange={handleChange} />
        </label>
        <br />
        <label className="form-label" style={{color: 'black'}}>
        Sexo:
          <select className="form-select" name="sex" value={formData.sex || ''} onChange={handleChange}>
          <option value="">Selecciona</option>  
          <option value="M">M</option>
          <option value="F">F</option>
          </select>
        </label>
        <br />
        <label className="form-label" style={{color: 'black'}}>
          Dirección:
          <input className="form-control" type="text" name="address" value={formData.address || ''} onChange={handleChange} />
        </label>
        <br />
        <label className="form-label" style={{color: 'black'}}>
          Teléfono:
          <input className="form-control" type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
        </label>
        <br /></div>
        <div className='col-6 col-md-6'>
        <h3>Datos de la Carga</h3>  
        <label className="form-label" style={{color: 'black'}}>
          Nombre de la Carga:
          <input className="form-control" type="text" name="nom_carga" value={formData.nom_carga || ''} onChange={handleChange} />
        </label>
        <br />
        <label className="form-label" style={{color: 'black'}}>
          Parentesco:
          <input className="form-control" type="text" name="relation_carga" value={formData.relation_carga || ''} onChange={handleChange} />
        </label>
        <br />
        <label className="form-label" style={{color: 'black'}}>
        Sexo de la Carga:
          <select className="form-select" name="sex_carga" value={formData.sex_carga || ''} onChange={handleChange}>
          <option value="">Selecciona</option>  
          <option value="M">M</option>
          <option value="F">F</option>
          </select>
        </label>
        <br />
        <label className="form-label" style={{color: 'black'}}>
          RUT de la Carga:
          <input className="form-control" type="text" name="rut_carga" placeholder='RUT sin puntos, con guión' value={formData.rut_carga} onChange={handleChange0} />
        </label>
        {rutError && <div style={{ color: 'red' }}>{rutError}</div>}<br />
        </div>
        <div className='col col-sm-12'>
        <h3 style={{marginTop: '20px'}}>Datos de Contacto</h3>  
        <label className="form-label" style={{color: 'black'}}>
          Nombre del Contacto:
          <input className="form-control" type="text" name="nom_sos" value={formData.nom_sos || ''} onChange={handleChange} />
        </label>
        <br />
        <label className="form-label" style={{color: 'black'}}>
          Número del Contacto:
          <input className="form-control" type="text" name="phone_sos" value={formData.phone_sos || ''} onChange={handleChange} />
        </label>
        <br />
        <label className="form-label" style={{color: 'black'}}>
          Relacion del Contacto:
          <input className="form-control" type="text" name="relation_sos" value={formData.relation_sos || ''} onChange={handleChange} />
        </label>
        <br />
        <button style={{marginTop:'20px'}} type="button" className="btn btn-primary" onClick={handleUpdate}>Guardar</button>
        </div>
        </div> 
      </form>
      </div>
      <div className="col-lg-8 d-flex align-items-center justify-content-center">
          <div>
            <Image
              src="/src/logoEdit.png"
              alt="logo principal yuri"
              className="img-fluid"
              width={1000}
              height={1000}
              style={{margin: '20px'}}
           />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EditFormPage />
    </QueryClientProvider>
  );
}