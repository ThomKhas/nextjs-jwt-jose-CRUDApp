"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';;
import React from 'react';
import { Button } from 'antd';
import "../../../globals.css";
import 'bootstrap/dist/css/bootstrap.css';

import { insertData } from '../../../api/insert/route' // api rest

function Navbar({ logout }) {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <img
          className="img-fluid"
          src="/src/minilogo.png"
          alt="logo para btn"
          width={190}
          height={130}
        />
        <button className="btn btn-primary" type="submit" onClick={logout}>
          Salir
        </button>
      </div>
    </nav>
  );
}

function CreatePage() {
  const [form, setForm] = useState({
    full_name: '',
    rut: '',
    password: '',
    sex: '',
    address: '',
    phone: '',
    empleo: '',
    fecha_in: '',
    area: '',
    rol_id: '',
    nom_sos: '',
    phone_sos: '',
    relation_sos: '',
    nom_carga: '',
    relation_carga: '',
    sex_carga: '',
    rut_carga: ''
  });

  const [message, setMessage] = useState('');
  const [rutError, setRutError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleRedirect = () => {
    router.push('/pages/adm');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rut') {
      if (!/^[0-9]{7,8}-[0-9Kk]$/.test(value)) {
        setRutError('RUT inválido');
      } else {
        setRutError('');
      }
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const getCurrentDateTime = () => {
    const current = new Date();
    const year = current.getFullYear();
    const month = (current.getMonth() + 1).toString().padStart(2, '0');
    const day = current.getDate().toString().padStart(2, '0');
    const hours = current.getHours().toString().padStart(2, '0');
    const minutes = current.getMinutes().toString().padStart(2, '0');
    const seconds = current.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      fecha_in: getCurrentDateTime()
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    try {
      if (rutError) {
        throw new Error('RUT inválido');
      }
      
      // Aquí puedes agregar la lógica para enviar los datos del formulario a tu base de datos
      const result = await insertData(form);
      console.log('Formulario a enviar:', form);
      console.log(result);
      
      setForm({
        full_name: '',
        rut: '',
        password: '',
        sex: '',
        address: '',
        phone: '',
        empleo: '',
        fecha_in: '',
        area: '',
        rol_id: '',
        nom_sos: '',
        phone_sos: '',
        relation_sos: '',
        nom_carga: '',
        relation_carga: '',
        sex_carga: '',
        rut_carga: ''
      });setMessage('Datos insertados correctamente');
    } catch (error) {
      console.error(error.message);
      setMessage('Error al insertar los datos');
    }
  };

  const handleRefreshDateTime = () => {
    setForm(prevForm => ({
      ...prevForm,
      fecha_in: getCurrentDateTime(),
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefreshDateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <div style={{ backgroundColor: '#DBD7D7', minHeight: '100vh', color:'black' }}>
    <Navbar logout={logout} />
    <button style={{ margin: '11px'}} className="btn btn-primary" onClick={handleRedirect}>Volver</button>
    
            <h1 style={{color: 'black', marginLeft:'10px'}}>Crear nuevo usuario</h1>
                
                <form onSubmit={handleSubmit} style={{color:'black'}}>
                    <div class='container' style={{marginTop:'20px'}}>
                      <div class='row align-items-start justify-items-center'>

                        <div class="col-sm-12 col-md-6 col-lg-3" style={{marginTop:'20px'}}>
                          <h3 style={{color: 'black'}}>Datos Personales</h3><br />
                          <label className="form-label">
                            Nombre completo:
                            <input className="form-control" type="text" name="full_name" value={form.full_name} onChange={handleChange} />
                          </label><br />
                          <label className="form-label">
                              RUT:
                              <input className="form-control" type="text" name="rut" value={form.rut} placeholder='RUT sin puntos, con guión' onChange={handleChange} />
                              {rutError && <div style={{ color: 'red' }}>{rutError}</div>}
                          </label><br />
                          <label className="form-label" >
                              Contraseña:
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <input className="form-control"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                  />
                                  <button type="button" onClick={togglePasswordVisibility} style={{ border: 'none', background: 'none' }}>
                                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                  </button>
                              </div>
                          </label><br />
                          <label className="form-label">
                            Sexo:
                            <select class="form-select" name="sex" value={form.sex} onChange={handleChange}>
                              <option value="">Selecciona</option>
                              <option value="M">M</option>
                              <option value="F">F</option>
                          </select>
                          </label><br />
                          <label className="form-label">
                            Dirección:
                            <input className="form-control" type="text" name="address" value={form.address} onChange={handleChange} />
                          </label><br />
                          <label className="form-label">
                            Teléfono:
                            <input className="form-control" type="text" name="phone" value={form.phone} onChange={handleChange} />
                          </label>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-3" style={{marginTop:'20px'}}>
                          <h3 style={{color: 'black'}}>Datos Laborales</h3><br />
                          <label className="form-label">
                            Empleo:
                            <input className="form-control" type="text" name="empleo" value={form.empleo} onChange={handleChange} />
                          </label><br />
                          <label className="form-label">
                          Fecha de ingreso:
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <input className="form-control" type="text" name="fecha_in" value={form.fecha_in} onChange={handleChange} />
                              <Button type="text" onClick={handleRefreshDateTime} style={{ border: 'none', background: 'none' }}></Button>
                            </div>
                          </label><br />
                          <label className="form-label">
                            Área:
                            <select class="form-select" name="area" value={form.area} onChange={handleChange}>
                              <option value="">Selecciona</option>
                              <option value="Bodega">Bodega</option>
                              <option value="Administracion">Administracion</option>
                              <option value="Marketing">Marketing</option>
                            </select>
                          </label><br />
                          <label className="form-label">
                            Rol:
                            <select class="form-select" name="rol_id" value={form.rol_id} onChange={handleChange}>
                              <option value="">Selecciona</option>
                              <option value={1}>Admin</option>
                              <option value={2}>RRHH</option>
                              <option value={3}>Empleado</option>
                            </select>
                          </label><br />
                        </div>
                        
                        <div class="col-sm-12 col-md-6 col-lg-3" style={{marginTop:'20px'}}>
                        <h3 style={{color: 'black'}}>Datos de Contactos</h3><br />
                        <label className="form-label">
                          Nombre de contacto de emergencia:
                          <input className="form-control" type="text" name="nom_sos" value={form.nom_sos} onChange={handleChange} />
                        </label><br />
                        <label className="form-label">
                          Teléfono de contacto de emergencia:
                          <input className="form-control" type="text" name="phone_sos" value={form.phone_sos} onChange={handleChange} />
                        </label><br />
                        <label className="form-label">
                          Relación con el contacto de emergencia:
                          <input className="form-control" type="text" name="relation_sos" value={form.relation_sos} onChange={handleChange} />
                        </label>
                        </div><br />

                        <div class="col-sm-12 col-md-6 col-lg-3" style={{marginTop:'20px'}}>
                          <h3 style={{color: 'black'}}>Datos de Cargas</h3><br />
                          <label className="form-label">
                            Nombre de la Carga:
                            <input className="form-control" type="text" name="nom_carga" value={form.nom_carga} onChange={handleChange} />
                          </label><br />
                          <label className="form-label">
                            Parentesco:
                            <input className="form-control" type="text" name="relation_carga" value={form.relation_carga} onChange={handleChange} />
                          </label><br />
                          <label className="form-label">
                            Sexo de la Carga:
                            <select class="form-select" name="sex_carga" value={form.sex_carga} onChange={handleChange}>
                            <option value="">Selecciona</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                          </select>
                          </label><br />
                          <label className="form-label">
                              RUT de la Carga:
                              <input className="form-control"
                                type="text"
                                name="rut_carga"
                                placeholder='RUT sin puntos, con guión'
                                value={form.rut_carga}
                                onChange={handleChange0}
                              />
                              {rutError && <div style={{ color: 'red' }}>{rutError}</div>}
                          </label><br />
                          <button style={{ marginTop:'20px', marginBottom:'40px'}} className="btn btn-primary btn-lg">Registrar</button>
                        </div>
                    </div>
                  </div>
                </form>
                {message && <p>{message}</p>}
      
    </div>
  );
}

export default CreatePage;
