"use client";
import axios from "axios";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';

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
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
        <Image className="img-fluid" 
        src="/src/minilogo.png"
        alt="logo para btn"
        width={190}
        height={130}/>
            <button className="btn btn-primary" type="submit" onClick={() => logout()}>Salir</button>
        </div>
      </nav>
    <div style={{ height: '94vh', backgroundColor: '#DBD7D7'}}>
      
      <h1 style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left',marginLeft: '50px', color: 'black' }}>PERFIL DE RECURSOS HUMANOS</h1>
      
      <h4 style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left',marginLeft: '50px', color: 'black', textAlign: 'left', }}>Bienvenido, {user.full_name}<br/> Porfavor seleccione una de las opciones para continuar.</h4>

      <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', marginLeft: '50px', color: 'black' }}>Opciones</h2>

      <div style={{ display: 'flex', justifyContent: 'left', marginTop: '10px', marginLeft: '50px' }}>
        <button style={{ marginRight: '10px' }} className="btn btn-success" onClick={goToCreatePage}>Crear nuevo usuario</button>
        <button className="btn btn-success" onClick={goToViewPage}>Ver usuarios</button>
      </div>
      
    </div>
    </div>
  );
}

export default RrhhPage;