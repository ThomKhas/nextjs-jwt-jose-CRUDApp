"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';


import { selectData } from '../../../api/select/route_id'; // api rest
import { updateData } from '../../../api/edit/route'; // api rest

const queryClient = new QueryClient();

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

  return (
    <div style={{ backgroundColor: '#DBD7D7', minHeight: '100vh' }}>
      <button type="button" onClick={handleRedirect}>Volver</button>
      <form>
        <label>
          Nombre completo:
          <input type="text" name="full_name" value={formData.full_name || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
        Sexo:
        <select name="sex" value={formData.sex || ''} onChange={handleChange}>
        <option value="">Selecciona</option>  
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
      </label>
        <br />
        <label>
          Dirección:
          <input type="text" name="address" value={formData.address || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Teléfono:
          <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nombre de la Carga:
          <input type="text" name="nom_carga" value={formData.nom_carga || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Parentesco:
          <input type="text" name="relation_carga" value={formData.relation_carga || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
        Sexo de la Carga:
        <select name="sex_carga" value={formData.sex_carga || ''} onChange={handleChange}>
        <option value="">Selecciona</option>  
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
      </label>
        <br />
<label>
          RUT de la Carga:
          <input type="text" name="rut_carga" placeholder='RUT sin puntos, con guión' value={formData.rut_carga} onChange={handleChange0} />
        </label>
        {rutError && <div style={{ color: 'red' }}>{rutError}</div>}<br />
        <label>
          Nombre del Contacto:
          <input type="text" name="nom_sos" value={formData.nom_sos || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Número del Contacto:
          <input type="text" name="phone_sos" value={formData.phone_sos || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Relacion del Contacto:
          <input type="text" name="relation_sos" value={formData.relation_sos || ''} onChange={handleChange} />
        </label>
        <br />
        <button type="button" onClick={handleUpdate}>Guardar</button>
      </form>
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