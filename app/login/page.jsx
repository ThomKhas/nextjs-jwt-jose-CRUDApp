"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';

function Navbar({ logout }) {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link href={'/'}>
          <img
            className="img-fluid"
            src="/src/minilogo.png"
            alt="logo para btn"
            width={255.9}
            height={130}
          />
        </Link>
        <button className="btn btn-primary" type="submit" style={{visibility: 'hidden'}} onClick={logout}>
          Salir
        </button>
      </div>
    </nav>
  );
}

function LoginPage() {
  const router = useRouter();
  const [errorShown, setErrorShown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cleanup function para indicar que el componente se ha desmontado
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    // Verificar si hay un error en la URL
    if (mounted) {
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get('error');

      if (errorParam === 'access-denied' && !errorShown) {
        toast.error("Acceso Denegado");
        setErrorShown(true);
      }
    }
  }, [errorShown, mounted]); // Ahora, el efecto solo se ejecutará cuando errorShown cambie

  const [credentials, setCredentials] = useState({
    rut: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.rut || !credentials.password) {
      toast.error("Rellena todos los campos");
      return;
    }

    try {
      const res = await axios.post("/api/auth/login", credentials);

      if (res.status === 200) {
        const { rol_id } = res.data;

        switch (rol_id) {
          case 1:
            router.push("pages/adm");
            break;
          case 2:
            router.push("pages/rrhh");
            break;
          case 3:
            router.push("pages/emp");
            break;
          default:
            console.error("Invalid role ID");
            break;
        }
      }
    } catch (error) {
      // Mostrar mensaje de error con Toastify
      toast.error("Rut o Contraseña inválido");
      // También puedes verificar aquí si el error proviene de un acceso denegado
      if (error.response && error.response.status === 401) {
        toast.error("Acceso Denegado");
        setErrorShown(true);
      }
    }
  };

  return (
    <div>
      <Navbar />
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '94.2vh',
      backgroundColor: '#DEDEDE',
    }}>
    <div style={{ backgroundColor: '#D3D3D3', padding: '30px', borderRadius: '10px', textAlign: 'center', boxSizing: 'border-box' }}>
      <form onSubmit={handleSubmit}  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
          <h1 style={{ width: '100%', color: 'black' }}>INGRESE SUS DATOS</h1>
          <label className="form-label" style={{ color: 'black' }}>RUT</label>
              <input className="form-control"
                type="text"
                placeholder="11111111-1"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    rut: e.target.value,
                  })
                }
                style={{ width: '60%' }}
              />
           
          <label className="form-label"  style={{ color: 'black' }}>Contraseña</label>
              <input className="form-control"
                type="password"
                placeholder="********"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  })
                }
                style={{ width: '60%', marginBottom: '20px' }}
              />


          <button className="btn btn-primary" >Ingresar</button>
      </form>
    </div>
    </div>
    <ToastContainer />
    </div>
  );
}

export default LoginPage;

