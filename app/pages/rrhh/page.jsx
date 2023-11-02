"use client";
import axios from "axios";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

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
      <h1>PERFIL DE RECURSOS HUMANOS</h1>
      <p>RUT: {user.rut}</p>
      <p>Rol ID: {user.rol_id}</p>
      <button onClick={goToCreatePage}>Crear nuevo usuario</button>
      <button onClick={goToViewPage}>Ver usuarios</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default RrhhPage;