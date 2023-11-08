"use client";

import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function HomePage() {

  const router = useRouter();
  const handleRedirect = () => {
    router.push('/login');
  };
  return (
    <div>
      <h1>HELLO WORLD</h1>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
        <Image className="img-fluid" 
        src="/src/minilogo.png"
        alt="logo para btn"
        width={190}
        height={130}/>
            <button className="btn btn-primary" type="submit" onClick={handleRedirect}>Ingresar</button>
        </div>
      </nav>

      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '94vh', backgroundColor: '#DBD7D7'}}>
      <Image className="img-fluid" 
        src="/src/logo1.png"
        alt="Logo de la empresa"
        width={950}
        height={580}/>
      </div>
    </div>
  )
}

export default HomePage;
