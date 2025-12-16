import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Upload } from 'lucide-react';

const NewBooking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    issue: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    alert('Booking submitted successfully!');
    navigate('/customer/dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/customer/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">New Service Booking</h1>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl mb-6">Create New Booking</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Device Type *
                </label>
                <select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select device type</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="laptop">Laptop</option>
                  <option value="tablet">Tablet</option>
                  <option value="smartwatch">Smartwatch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Apple, Samsung"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., iPhone 14 Pro"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Issue Type *</label>
                <select
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select issue</option>
                  <option value="screen">Screen Damage</option>
                  <option value="battery">Battery Issue</option>
                  <option value="charging">Charging Problem</option>
                  <option value="software">Software Issue</option>
                  <option value="water">Water Damage</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the issue in detail..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Upload Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/customer/dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
