import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import NewBooking from './pages/customer/NewBooking';

// Technician Pages
import TechnicianTasks from './pages/technician/TechnicianTasks';
import AIAssistant from './pages/technician/AIAssistant';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import UserManagement from './pages/admin/UserManagement';
import InventoryManagement from './pages/admin/InventoryManagement';

/**
 * AppRoutes Component
 * Mengelola semua routing aplikasi dengan Role-Based Access Control (RBAC)
 */
function AppRoutes() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Check auth status saat app dimount
    checkAuth();
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />

      {/* Customer Routes - Only accessible by 'customer' role */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/new-booking"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <NewBooking />
          </ProtectedRoute>
        }
      />

      {/* Technician Routes - Only accessible by 'technician' role */}
      <Route
        path="/tech/tasks"
        element={
          <ProtectedRoute allowedRoles={['technician']}>
            <TechnicianTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tech/ai-assistant"
        element={
          <ProtectedRoute allowedRoles={['technician']}>
            <AIAssistant />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes - Only accessible by 'admin' role */}
      <Route
        path="/admin/overview"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inventory"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <InventoryManagement />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route - redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/**
 * Main App Component
 * Wrapper dengan AuthProvider dan BrowserRouter
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
