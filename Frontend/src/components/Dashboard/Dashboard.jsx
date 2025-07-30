import React from 'react';
import { useAuth } from '../Auth/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-5">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome to MUSCLEON E-commerce
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-gray-600 text-lg">
              Hello, {user?.username}!
            </span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 hover:shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-primary-500">
            User Profile
          </h2>
          <div className="space-y-3">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Username:</span> {user?.username}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Email:</span> {user?.email}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-primary-500">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:translate-x-1 text-left">
              Browse Products
            </button>
            <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:translate-x-1 text-left">
              View Orders
            </button>
            <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:translate-x-1 text-left">
              Account Settings
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-3 border-b-2 border-primary-500">
            Recent Activity
          </h2>
          <p className="text-gray-600">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 