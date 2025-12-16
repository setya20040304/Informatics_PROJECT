import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Users, Package, Wrench, TrendingUp, Activity } from 'lucide-react';

const AdminOverview = () => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Active Services',
      value: '89',
      change: '+5%',
      icon: Activity,
      color: 'green',
    },
    {
      title: 'Inventory Items',
      value: '456',
      change: '-3%',
      icon: Package,
      color: 'purple',
    },
    {
      title: 'Technicians',
      value: '23',
      change: '+2',
      icon: Wrench,
      color: 'orange',
    },
  ];

  const recentActivity = [
    { id: 1, action: 'New service created', user: 'John Doe', time: '5 min ago' },
    { id: 2, action: 'Technician assigned', user: 'Tech-001', time: '12 min ago' },
    { id: 3, action: 'Service completed', user: 'Jane Smith', time: '1 hour ago' },
    { id: 4, action: 'Inventory updated', user: 'Admin', time: '2 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="flex gap-2">
              <Link
                to="/admin/users"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Users
              </Link>
              <Link
                to="/admin/inventory"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Inventory
              </Link>
            </div>
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
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span
                    className={`text-sm ${
                      stat.change.startsWith('+')
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-6 hover:bg-gray-50">
                  <p className="font-medium mb-1">{activity.action}</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{activity.user}</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">System Status</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Server Performance</span>
                  <span className="text-green-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: '95%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Database Usage</span>
                  <span className="text-blue-600">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: '67%' }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Storage</span>
                  <span className="text-yellow-600">82%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: '82%' }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Activity className="w-4 h-4" />
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Link
            to="/admin/users"
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <Users className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold mb-2">Manage Users</h3>
            <p className="text-sm text-gray-600">
              Add, edit, or remove user accounts
            </p>
          </Link>

          <Link
            to="/admin/inventory"
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <Package className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold mb-2">Inventory Management</h3>
            <p className="text-sm text-gray-600">
              Track and manage spare parts
            </p>
          </Link>

          <button className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <h3 className="font-semibold mb-2">View Reports</h3>
            <p className="text-sm text-gray-600">
              Generate analytics and insights
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
