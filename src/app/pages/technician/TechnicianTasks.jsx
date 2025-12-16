import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react';

const TechnicianTasks = () => {
  const { user, logout } = useAuth();
  
  const [tasks] = useState([
    {
      id: 'TASK-001',
      serviceId: 'SRV-001',
      device: 'iPhone 14 Pro',
      customer: 'John Doe',
      issue: 'Battery & Screen Replacement',
      priority: 'High',
      status: 'In Progress',
      deadline: '2024-12-18',
    },
    {
      id: 'TASK-002',
      serviceId: 'SRV-003',
      device: 'Samsung Galaxy S23',
      customer: 'Jane Smith',
      issue: 'Water Damage Repair',
      priority: 'Medium',
      status: 'Pending',
      deadline: '2024-12-20',
    },
    {
      id: 'TASK-003',
      serviceId: 'SRV-005',
      device: 'MacBook Pro M2',
      customer: 'Mike Johnson',
      issue: 'Keyboard Replacement',
      priority: 'Low',
      status: 'Pending',
      deadline: '2024-12-22',
    },
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Technician Panel</h1>
            <Link
              to="/tech/ai-assistant"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              AI Assistant
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
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
            <p className="text-3xl">{tasks.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-3xl text-yellow-600">
              {tasks.filter((t) => t.status === 'In Progress').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl text-gray-600">
              {tasks.filter((t) => t.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Completed Today</p>
            <p className="text-3xl text-green-600">0</p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl">My Tasks</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(task.status)}
                      <h3 className="font-semibold">{task.device}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-2">{task.issue}</p>

                    <div className="flex gap-6 text-sm text-gray-500">
                      <span>Task ID: {task.id}</span>
                      <span>Customer: {task.customer}</span>
                      <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      View Details
                    </button>
                    {task.status === 'Pending' && (
                      <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm">
                        Start Task
                      </button>
                    )}
                    {task.status === 'In Progress' && (
                      <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm">
                        Update Status
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianTasks;
