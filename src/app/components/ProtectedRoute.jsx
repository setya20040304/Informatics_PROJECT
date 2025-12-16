import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * Melindungi route berdasarkan role pengguna (RBAC - Role Based Access Control)
 * 
 * @param {Array} allowedRoles - Array role yang diperbolehkan mengakses route
 * @param {ReactNode} children - Component yang akan dirender jika authorized
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAuth();

  // Jika belum login, redirect ke /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika role user tidak sesuai, redirect ke halaman unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500">
            Your role: <span className="font-semibold">{user.role}</span>
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
