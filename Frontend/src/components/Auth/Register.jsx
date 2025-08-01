import React, { useState } from 'react';
import api from '../../utils/axios';
import Cookies from 'js-cookie';

const Register = ({ onRegisterSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
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
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/users/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      onRegisterSuccess(response.data);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data?.error) {
        if (typeof error.response.data.error === 'object') {
          // Handle field-specific errors
          const fieldErrors = {};
          Object.keys(error.response.data.error).forEach(key => {
            fieldErrors[key] = error.response.data.error[key][0];
          });
          setErrors(fieldErrors);
        } else {
          setErrors({ general: error.response.data.error });
        }
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 p-5">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md animate-slide-up">
        <h2 className="text-center text-gray-800 text-3xl font-semibold mb-8">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center text-sm">
              {errors.general}
            </div>
          )}
          {/* <div className="space-y-2 flex justify-evenly items-center">
            <div className="customer bg-red-100">
                <label htmlFor="customer">Customer</label>
                <input type="radio" name="is_seller" id="customer" defaultChecked />
            </div>
            <div className="seller">
              <label htmlFor="seller">Seller</label>
            <input type="radio" name="is_seller" id="seller" />
            </div>
          </div> */}
          
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
              <span className="text-red-500 text-xs">{errors.username}</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-100 ${
                errors.email 
                  ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                  : 'border-gray-200 bg-gray-50 focus:border-primary-400'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
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
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-100 ${
                errors.confirmPassword 
                  ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' 
                  : 'border-gray-200 bg-gray-50 focus:border-primary-400'
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">{errors.confirmPassword}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button 
              type="button" 
              onClick={switchToLogin} 
              className="text-primary-600 font-semibold underline hover:text-primary-700 transition-colors duration-200"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 