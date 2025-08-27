import React from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/AdminSidebar';

const AdminDash = () => {
  // Mock data for statistics
  const stats = [
    {
      id: 1,
      title: 'Total Products',
      value: '142',
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      color: 'bg-blue-50',
      change: '+12% from last month',
      link: '/admin/products'
    },
    {
      id: 2,
      title: 'New Enquiries',
      value: '28',
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-green-50',
      change: '+8% from last week',
      link: '/admin/enquiries'
    },
    {
      id: 3,
      title: 'Contacts',
      value: '156',
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-purple-50',
      change: '+23% from last month',
      link: '/admin/contacts'
    },
    {
      id: 4,
      title: 'Gallery Items',
      value: '84',
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-orange-50',
      change: '+15% from last month',
      link: '/admin/gallery'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'enquiry',
      message: 'New enquiry from John Doe about Dell Precision Workstation',
      time: '2 minutes ago',
      icon: '📧',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'product',
      message: 'Product "HP All-in-One PC" was updated',
      time: '15 minutes ago',
      icon: '🔄',
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'contact',
      message: 'New contact form submission from Sarah Johnson',
      time: '1 hour ago',
      icon: '👤',
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'gallery',
      message: 'New image uploaded to gallery',
      time: '2 hours ago',
      icon: '🖼️',
      color: 'text-orange-600'
    },
    {
      id: 5,
      type: 'enquiry',
      message: 'Enquiry from Mike Wilson about projectors',
      time: '3 hours ago',
      icon: '📧',
      color: 'text-blue-600'
    }
  ];

  // Quick actions
  const quickActions = [
    {
      id: 1,
      title: 'Add New Product',
      description: 'Create a new product listing',
      icon: '➕',
      link: '/admin/products/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 2,
      title: 'View Enquiries',
      description: 'Check latest customer enquiries',
      icon: '📋',
      link: '/admin/enquiries',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 3,
      title: 'Manage Gallery',
      description: 'Upload and organize images',
      icon: '🎨',
      link: '/admin/gallery',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 4,
      title: 'Settings',
      description: 'Update system settings',
      icon: '⚙️',
      link: '/admin/settings',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin! Here's what's happening today.</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <Link
                  to={stat.link}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
              <p className="text-green-600 text-xs font-medium">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <Link
                to="/admin/activities"
                className="text-sm text-[#104016] hover:text-[#2c7744] transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <span className={`text-xl ${activity.color}`}>{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm">{activity.message}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.id}
                  to={action.link}
                  className={`${action.color} text-white rounded-lg p-4 transition-all duration-200 transform hover:scale-105`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{action.icon}</span>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {/* <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Enquiries Trend</h3>
              <div className="bg-gray-50 rounded-lg p-4 h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p>Chart visualization</p>
                  <p className="text-sm">(Integrate with Chart.js or similar)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Products Overview</h3>
              <div className="bg-gray-50 rounded-lg p-4 h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <p>Pie chart visualization</p>
                  <p className="text-sm">(Integrate with Chart.js or similar)</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

       
      </main>
    </div>
  );
};

export default AdminDash;