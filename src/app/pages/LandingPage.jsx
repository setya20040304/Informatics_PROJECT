import { Link } from 'react-router-dom';
import { Wrench, Users, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="p-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Servis-Hub</h1>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6">
            Platform Manajemen Servis Elektronik
          </h1>
          <p className="text-xl text-gray-600">
            Tracking servis dengan visualisasi 3D real-time
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl mb-4">Customer Portal</h3>
            <p className="text-gray-600 mb-4">
              Lihat status servis dan visualisasi 3D device Anda
            </p>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login as Customer →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Wrench className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl mb-4">Technician Panel</h3>
            <p className="text-gray-600 mb-4">
              Kelola tugas servis dengan AI assistant
            </p>
            <Link to="/login" className="text-green-600 hover:underline">
              Login as Technician →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Shield className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl mb-4">Admin Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Monitor inventory dan user management
            </p>
            <Link to="/login" className="text-purple-600 hover:underline">
              Login as Admin →
            </Link>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20 text-center">
          <p className="text-sm text-gray-500 mb-4">Built with modern tech stack</p>
          <div className="flex justify-center gap-6 text-gray-600">
            <span>React (Vite)</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Three.js</span>
            <span>•</span>
            <span>React Router</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
