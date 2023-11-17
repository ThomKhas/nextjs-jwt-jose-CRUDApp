"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';;
import React from 'react';
import { Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [rutCargaError, setRutCargaError] = useState('');
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

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === 'rut') {
      validateRut(value, setRutError);
    } else if
    (name === 'rut_carga') {
      validateRut(value, setRutCargaError);
    }
  };

  const validateRut = (rut, setRutError) => {
    if (!/^[0-9]{7,8}-[0-9Kk]$/.test(rut)) {
      setRutError('RUT inválido');
    } else {
      setRutError('');
    }
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
    const isEmptyField = Object.values(form).some((value) => value === '');
    
    if (isEmptyField) {
      toast.error('Rellene todos los campos');
      return;
    }

    try {
      if (rutError || rutCargaError) {
        toast.error('Revise los campos relacionados con el RUT');
        throw new Error('RUT inválido');
      }
      
      
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
      });toast.success('Datos insertados correctamente');
    } catch (error) {
      console.error(error.message);
      toast.error('Error al insertar los datos');
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
                  <div className='container' style={{marginTop:'20px'}}>
                    <div className='row justify-content-center' >

                        <div className="col-sm-12 col-md-6 col-lg-3 justify-content-sm-center" style={{marginTop:'20px'}}>
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
                            <select className="form-select" name="sex" value={form.sex} style={{width: '206px'}} onChange={handleChange}>
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

                        <div className="col-sm-12 col-md-6 col-lg-3 justify-content-sm-center" style={{marginTop:'20px'}}>
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
                            <select className="form-select" name="area" value={form.area} onChange={handleChange} style={{width: '206px'}}>
                              <option value="">Selecciona</option>
                              <option value="Bodega">Bodega</option>
                              <option value="Administracion">Administracion</option>
                              <option value="Marketing">Marketing</option>
                            </select>
                          </label><br />
                          <label className="form-label">
                            Rol:
                            <select className="form-select" name="rol_id" value={form.rol_id} onChange={handleChange} style={{width: '206px'}}>
                              <option value="">Selecciona</option>
                              <option value={1}>Admin</option>
                              <option value={2}>RRHH</option>
                              <option value={3}>Empleado</option>
                            </select>
                          </label><br />
                        </div>
                        
                        <div className="col-sm-12 col-md-6 col-lg-3 justify-content-sm-center" style={{marginTop:'20px'}}>
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
                          Relación contacto de emergencia:
                          <input className="form-control" type="text" name="relation_sos" value={form.relation_sos} onChange={handleChange} style={{width: '260px'}}/>
                        </label>
                        </div><br />

                        <div className="col-sm-12 col-md-6 col-lg-3 justify-content-sm-center" style={{marginTop:'20px'}}>
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
                            <select className="form-select" name="sex_carga" value={form.sex_carga} onChange={handleChange} style={{width: '206px'}}>
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
                                onChange={handleChange}
                              />
                              {rutCargaError && <div style={{ color: 'red' }}>{rutCargaError}</div>}
                          </label><br />
                          <button style={{ marginTop:'20px', marginBottom:'40px'}} className="btn btn-primary btn-lg">Registrar</button>
                        </div>
                    </div>
                  </div>
                </form>
                {message && <p>{message}</p>}
                <ToastContainer />
      
    </div>
  );
}

export default CreatePage;
