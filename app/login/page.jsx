"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';
import Link from 'next/link';

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
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
        <Link href="/">
          <Image className="img-fluid" 
          src="/src/minilogo.png"
          alt="logo para btn"
          width={190}
          height={130}
          priority={true}
          style={{ width: "auto", height: "auto" }}/>
        </Link>
        <button className="btn btn-primary" type="submit" style={{ visibility: 'hidden', pointerEvents: 'none' }}>Ingresar</button>
        </div>
      </nav>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#999999',
    }}>
      

    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label"  style={{ color: 'black' }}>RUT</label>
              <input className="form-control"
                type="text"
                placeholder="11111111-1"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    rut: e.target.value,
                  })
                }
              />
      </div>     
      <div className="mb-3">  
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
            />
        </div> 
        <button className="btn btn-primary">Ingresar</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default LoginPage;

