"use client";
import axios from "axios";
import { useEffect,useState } from "react";
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

function RrhhPage() {
  const [user, setUser] = useState({
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

  const goToCreatePage = () => {
    router.push("rrhh/crear");
  };
  const goToViewPage = () => {
    router.push("rrhh/listar");
  };



  return (
    <div style={{ backgroundColor: '#DBD7D7', minHeight: '100vh', overflow: 'hidden' }} className="d-flex flex-column">
      <Navbar logout={logout} />
        <div className="row flex-grow-1">
        <div className="col-lg-6 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#1CA6F5', textAlign: 'center'}}>
            <div>
              <h1>PERFIL DE RECURSOS HUMANOS</h1>
              <h4>
                Bienvenido, {user.full_name}
                <br /> Por favor seleccione una de las opciones para continuar.
              </h4>
              <h2 style={{marginTop: '30px'}}>Opciones</h2>
              <div style={{ marginTop: '10px' }}>
                <button className="btn btn-success" style={{ marginRight:'10px'}} onClick={goToViewPage}>
                  Ver Usuarios
                </button>
                <button className="btn btn-success" onClick={goToCreatePage}>
                  Crear Usuario
                </button>
              </div>
            </div>
        </div> 
        <div className="col-lg-6 d-flex align-items-center" 
          style={{ backgroundColor: '#FFFFFF'}}>
            <div>
              <Image
                src="/src/oficiallogo.png"
                alt="logo principal yuri"
                class="img-fluid"
                width={1000}
                height={1000}
                style={{ minWidth: '40%', minHeight: '40%'}}
              />
            </div>
          </div>

        </div>
    </div>
  );
}

export default RrhhPage;
                