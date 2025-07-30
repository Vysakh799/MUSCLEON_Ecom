import React, { useState } from 'react';
import api from '../../utils/axios';
import Cookies from 'js-cookie';

const Login = ({ onLoginSuccess, switchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Only clear field-specific errors, not general errors
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Form submitted, preventing default...');
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return false;
    }

    setLoading(true);
    console.log('Starting login process...');
    
    // Use a separate function for the async operation
    const performLogin = async () => {
      try {
        console.log('Making API call...');
        const response = await api.post('/users/login/', formData);
        console.log('Login successful:', response.data);
        
        // Store JWT tokens in cookies
        Cookies.set('access_token', response.data.access, { expires: 1 });
        Cookies.set('refresh_token', response.data.refresh, { expires: 7 });
        
        onLoginSuccess(response.data);
      } catch (error) {
        console.error('Login error:', error);
        console.log('Setting error message...');
        
        if (error.response?.data?.error) {
          setErrors(prev => ({ ...prev, general: error.response.data.error }));
        } else {
          setErrors(prev => ({ ...prev, general: 'Login failed. Please try again.' }));
        }
        console.log('Error message set');
      } finally {
        setLoading(false);
        console.log('Login process finished');
      }
    };

    performLogin();
    return false;
  };

  const clearGeneralError = () => {
    console.log('Clearing general error...');
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.general;
      return newErrors;
    });
  };

  console.log('Current errors state:', errors);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 p-5">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md animate-slide-up">
        <h2 className="text-center text-gray-800 text-3xl font-semibold mb-8">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center text-sm">
              <div className="flex items-center justify-between">
                <span className="flex-1">{errors.general}</span>
                <button
                  type="button"
                  onClick={clearGeneralError}
                  className="ml-2 text-red-400 hover:text-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-100 ${
                errors.username 
                  ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                  : 'border-gray-200 bg-gray-50 focus:border-primary-400'
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <span className="text-red-500 text-xs flex items-center">
                <span className="mr-1">⚠</span>
                {errors.username}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-100 ${
                errors.password 
                  ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                  : 'border-gray-200 bg-gray-50 focus:border-primary-400'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500 text-xs flex items-center">
                <span className="mr-1">⚠</span>
                {errors.password}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <button 
              type="button" 
              onClick={switchToRegister} 
              className="text-primary-600 font-semibold underline hover:text-primary-700 transition-colors duration-200"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 