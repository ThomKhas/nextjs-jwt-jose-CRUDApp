import "../globals.css";
import 'bootstrap/dist/css/bootstrap.css';

function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

export default Layout;
