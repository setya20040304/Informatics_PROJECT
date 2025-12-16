import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DeviceDigitalTwin from '../../components/DeviceDigitalTwin';
import { Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  
  // Mock data servis
  const [services] = useState([
    {
      id: 'SRV-001',
      device: 'iPhone 14 Pro',
      status: 'In Progress',
      damagedParts: ['battery', 'screen'],
      progress: 60,
      estimatedCompletion: '2 days',
      model3D: '/models/smartphone.gltf', // Path ke model 3D
    },
    {
      id: 'SRV-002',
      device: 'MacBook Air M2',
      status: 'Completed',
      damagedParts: [],
      progress: 100,
      estimatedCompletion: 'Completed',
      model3D: '/models/laptop.gltf',
    },
  ]);

  const [selectedService, setSelectedService] = useState(services[0]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Customer Dashboard</h1>
            <Link
              to="/customer/new-booking"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              New Booking
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Service List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg mb-4">My Services</h2>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedService.id === service.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{service.device}</p>
                    <p className="text-sm text-gray-500">{service.id}</p>
                  </div>
                  {getStatusIcon(service.status)}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      service.status
                    )}`}
                  >
                    {service.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${service.progress}%` }}
                  ></div>
                </div>
              </button>
            ))}
          </div>

          {/* 3D Visualization & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Device Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl mb-2">{selectedService.device}</h2>
                  <p className="text-gray-600">Service ID: {selectedService.id}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full ${getStatusColor(
                    selectedService.status
                  )}`}
                >
                  {selectedService.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Package className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="text-xl">{selectedService.progress}%</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600">Estimated</p>
                  <p className="text-xl">{selectedService.estimatedCompletion}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <AlertCircle className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600">Issues</p>
                  <p className="text-xl">{selectedService.damagedParts.length}</p>
                </div>
              </div>
            </div>

            {/* 3D Digital Twin Visualization */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg mb-4">Device Digital Twin</h3>
              <DeviceDigitalTwin
                modelUrl={selectedService.model3D}
                damagedParts={selectedService.damagedParts}
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 Rotate, zoom, and pan to inspect your device. Red parts indicate
                  issues that are being addressed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
