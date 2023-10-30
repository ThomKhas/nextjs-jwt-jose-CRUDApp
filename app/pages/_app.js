import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'; // Importa tus estilos globales si los tienes

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;