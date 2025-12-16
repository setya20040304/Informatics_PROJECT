import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Search, Plus, Edit, Package } from 'lucide-react';

const InventoryManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [inventory, setInventory] = useState([
    { id: 1, name: 'iPhone 14 Screen', category: 'Displays', stock: 25, price: 250, status: 'in-stock' },
    { id: 2, name: 'Samsung Battery (4000mAh)', category: 'Batteries', stock: 5, price: 45, status: 'low-stock' },
    { id: 3, name: 'MacBook M2 Keyboard', category: 'Keyboards', stock: 0, price: 120, status: 'out-of-stock' },
    { id: 4, name: 'USB-C Charging Port', category: 'Ports', stock: 50, price: 15, status: 'in-stock' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (status) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-700';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-700';
      case 'out-of-stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/overview')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Inventory Management</h1>
          </div>
          <span className="text-sm text-gray-600">{user?.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Items</p>
            <p className="text-3xl">{inventory.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">In Stock</p>
            <p className="text-3xl text-green-600">
              {inventory.filter((i) => i.status === 'in-stock').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Low Stock</p>
            <p className="text-3xl text-yellow-600">
              {inventory.filter((i) => i.status === 'low-stock').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
            <p className="text-3xl text-red-600">
              {inventory.filter((i) => i.status === 'out-of-stock').length}
            </p>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-gray-600" />
                      </div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">{item.stock}</span> units
                  </td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs capitalize ${getStockStatus(
                        item.status
                      )}`}
                    >
                      {item.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
