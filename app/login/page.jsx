"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [credentials, setCredentials] = useState({
    rut: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", credentials);

    if (res.status === 200) {
      // Aquí es donde manejas la redirección basada en el rol_id
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="RUT"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              rut: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.target.value,
            })
          }
        />
        <button>Ingresar</button>
      </form>
    </div>
  );
}

export default LoginPage;
