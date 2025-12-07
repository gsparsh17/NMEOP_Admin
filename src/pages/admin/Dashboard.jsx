import React, { useState, useEffect } from "react";
import { 
  Upload, 
  Download, 
  FileText,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Users,
  BarChart3,
  Database,
  Shield
} from "lucide-react";
import StatCard from "../../components/common/StatCard";
import StatusIndicator from "../../components/common/StatusIndicator";
import DataPreviewChart from "../../components/charts/DataPreviewChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRecords: 15427,
    pendingUpdates: 3,
    recentUpdates: 42,
    dataQuality: 95,
    activeUsers: 12,
    backupAge: 1
  });
  
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: "Admin User", action: "Updated Telangana FFB prices", time: "10:30 AM", type: "update" },
    { id: 2, user: "Data Editor", action: "Uploaded monthly import data", time: "09:15 AM", type: "upload" },
    { id: 3, user: "System", action: "Automatic backup completed", time: "02:00 AM", type: "system" },
    { id: 4, user: "Admin User", action: "Added new state data for Karnataka", time: "Yesterday", type: "create" },
  ]);
  
  const [loading, setLoading] = useState(false);
  const [quickActions] = useState([
    { icon: Upload, label: "Bulk Upload", description: "Upload CSV/Excel data", color: "blue", path: "/imports" },
    { icon: Download, label: "Backup Now", description: "Create system backup", color: "green", action: "backup" },
    { icon: CheckCircle, label: "Validate Data", description: "Run data validation", color: "amber", action: "validate" },
    { icon: Shield, label: "Audit Report", description: "Generate audit logs", color: "purple", path: "/audit" },
  ]);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleQuickAction = (action) => {
    console.log("Quick action:", action);
    // Implement action logic
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'update': return '🔄';
      case 'upload': return '📤';
      case 'system': return '⚙️';
      case 'create': return '➕';
      default: return '📝';
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'update': return 'text-blue-600 bg-blue-100';
      case 'upload': return 'text-green-600 bg-green-100';
      case 'system': return 'text-gray-600 bg-gray-100';
      case 'create': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Government Header */}
      <div className="bg-white border-l-4 border-[#003366] shadow-md rounded-r-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-[#003366]">Data Administration Dashboard</h2>
                <div className="bg-[#003366] text-white px-3 py-1 rounded text-sm font-medium">
                  <span>ADMINISTRATIVE ACCESS</span>
                </div>
              </div>
              
              <p className="text-gray-700 mt-1 border-l-3 border-[#0072bc] pl-3">
                Manage and update NMEO-OP policy data with administrative controls
              </p>
              
              <div className="mt-3 inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded border border-gray-200">
                <img 
                  src="/assets/ut.png" 
                  alt="Ministry Logo" 
                  className="w-6 h-6"
                />
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">Ministry of Agriculture & Farmers Welfare</span>
                  <span className="text-gray-500 mx-2">|</span>
                  <span className="text-gray-600">Government of India</span>
                </span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setLoading(true)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Records"
          value={stats.totalRecords.toLocaleString()}
          icon={Database}
          color="blue"
          trend="+2.3%"
          loading={loading}
        />
        
        <StatCard
          title="Pending Updates"
          value={stats.pendingUpdates}
          icon={AlertTriangle}
          color="amber"
          trend="3 awaiting review"
          loading={loading}
        />
        
        <StatCard
          title="Data Quality"
          value={`${stats.dataQuality}%`}
          icon={CheckCircle}
          color="green"
          trend="Excellent"
          loading={loading}
        />
        
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={Users}
          color="purple"
          trend="12 online"
          loading={loading}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const colorClasses = {
              blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
              green: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
              amber: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100',
              purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
            };

            return (
              <button
                key={index}
                onClick={() => action.path ? window.location.pathname = action.path : handleQuickAction(action.action)}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${colorClasses[action.color]}`}
              >
                <div className={`p-2 rounded-lg ${action.color === 'blue' ? 'bg-blue-100' : 
                  action.color === 'green' ? 'bg-green-100' : 
                  action.color === 'amber' ? 'bg-amber-100' : 'bg-purple-100'}`}>
                  <Icon className={`w-5 h-5 ${action.color === 'blue' ? 'text-blue-600' : 
                    action.color === 'green' ? 'text-green-600' : 
                    action.color === 'amber' ? 'text-amber-600' : 'text-purple-600'}`} />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs opacity-75">{action.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-sm text-[#003366] hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  <span className="text-sm">{getActivityIcon(activity.type)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
          <div className="space-y-4">
            <StatusIndicator 
              title="API Connectivity" 
              status="online" 
              message="All endpoints responsive"
              lastChecked="2 min ago"
            />
            <StatusIndicator 
              title="Database" 
              status="online" 
              message="Connection stable"
              lastChecked="5 min ago"
            />
            <StatusIndicator 
              title="Backup System" 
              status="warning" 
              message={`Last backup: ${stats.backupAge} day${stats.backupAge !== 1 ? 's' : ''} ago`}
              lastChecked="Today 02:00 AM"
            />
            <StatusIndicator 
              title="Validation Service" 
              status="online" 
              message="Running normally"
              lastChecked="1 hour ago"
            />
          </div>
        </div>
      </div>

      {/* Data Update Trends */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Data Update Trends</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BarChart3 size={16} />
            <span>Last 30 days</span>
          </div>
        </div>
        
        <div className="h-64">
          <DataPreviewChart 
            data={[
              { date: 'Jan 1', updates: 12 },
              { date: 'Jan 5', updates: 8 },
              { date: 'Jan 10', updates: 15 },
              { date: 'Jan 15', updates: 10 },
              { date: 'Jan 20', updates: 18 },
              { date: 'Jan 25', updates: 14 },
              { date: 'Jan 30', updates: 20 }
            ]}
          />
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">Most Updated</div>
            <div className="text-[#003366] font-semibold">FFB Prices</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">Recent Changes</div>
            <div className="text-[#003366] font-semibold">42 records</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">Avg Update Time</div>
            <div className="text-[#003366] font-semibold">2.3 mins</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="font-medium text-gray-800">Success Rate</div>
            <div className="text-green-600 font-semibold">98.5%</div>
          </div>
        </div>
      </div>
    </div>
  );
}