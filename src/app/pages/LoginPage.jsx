import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock login
    login(email, password, role);

    // Redirect based on role
    const roleRoutes = {
      customer: '/customer/dashboard',
      technician: '/tech/tasks',
      admin: '/admin/overview',
    };
    
    navigate(roleRoutes[role]);
  };

  const quickLogin = (testRole) => {
    const credentials = {
      customer: { email: 'customer@test.com', password: 'customer123' },
      technician: { email: 'tech@test.com', password: 'tech123' },
      admin: { email: 'admin@test.com', password: 'admin123' },
    };

    const cred = credentials[testRole];
    login(cred.email, cred.password, testRole);
    
    const roleRoutes = {
      customer: '/customer/dashboard',
      technician: '/tech/tasks',
      admin: '/admin/overview',
    };
    
    navigate(roleRoutes[testRole]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl mb-2 text-center">Login</h1>
          <p className="text-center text-gray-600 mb-8">Servis-Hub Platform</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="customer">Customer</option>
                <option value="technician">Technician</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Quick Test Login */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3">Quick Test Login:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => quickLogin('customer')}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
              >
                Customer
              </button>
              <button
                onClick={() => quickLogin('technician')}
                className="px-3 py-2 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
              >
                Technician
              </button>
              <button
                onClick={() => quickLogin('admin')}
                className="px-3 py-2 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
