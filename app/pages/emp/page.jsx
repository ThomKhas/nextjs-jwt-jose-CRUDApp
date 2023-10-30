"use client";
import axios from "axios";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

function empPage() {
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
    <div>
      <h1>PERFIL DE EMPLEADOS</h1>
      <p>ID: {user.id}</p>
      <p>RUT: {user.rut}</p>
      <p>Rol ID: {user.rol_id}</p>
      <button onClick={goToViewPage}>Editar Perfil</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default empPage;