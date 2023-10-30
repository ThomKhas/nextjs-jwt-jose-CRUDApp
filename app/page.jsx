"use client";


import { useRouter } from 'next/navigation';

function HomePage() {

  const router = useRouter();
  const handleRedirect = () => {
    router.push('/login');
  };
  return (
    <div>
      <h1>Home Page</h1>

      <button type="button" onClick={handleRedirect}>Iniciar Sesion</button>
      
    </div>
  )
}

export default HomePage;
