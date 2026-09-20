import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Bungkus halaman Login/Register dengan komponen ini.
 * Kalau user sudah login, langsung diarahkan ke home (tidak bisa balik ke form login/daftar).
 */
export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
