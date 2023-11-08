'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';

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

function EmpPage() {
  const [user, setUser] = useState({
    id: "",
    rut: "",
    rol_id: "",
  });
  const router = useRouter();

  const getProfile = async () => {
    const profile = await axios.get("/api/profile");
    setUser(profile.data);
  };

  useEffect(() => {
    getProfile();
  }, []); // Se ejecuta una vez al montar el componente

  const logout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
    router.push("/login");

  };

  const goToViewPage = () => {
    router.push("emp/listar");
  };

  return (
    <div style={{ backgroundColor: '#DBD7D7', minHeight: '100vh' }}>
      <Navbar logout={logout} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6" style={{ backgroundColor: '#DBD7D7', padding: '50px' }}>
            <div style={{ textAlign: 'left', marginLeft: '250px' }}>
              <h1 style={{ textAlign: 'left', marginTop: '200px', color: 'black' }}>PERFIL DE EMPLEADO</h1>
              <h4 style={{ textAlign: 'left', color: 'black' }}>
                Bienvenido, {user.full_name}
                <br /> Por favor seleccione una de las opciones para continuar.
              </h4>
              <h2 style={{ textAlign: 'left', marginTop: '70px', color: 'black'}}>Opciones</h2>
              <div style={{ marginTop: '10px' }}>
                <button className="btn btn-success" onClick={goToViewPage}>
                  Ver Perfil
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6" style={{ backgroundColor: '#DBD7D7', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginTop: '120px', marginRight: '190px' }}>
              <Image
                src="/src/logoPage.png"
                alt="Ejemplo de imagen"
                width={940}
                height={505}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpPage;