import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../utils/axios';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // Initialize auth token from cookies
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/users/me/');
      setUser(response.data);
      // if (response.data.is_seller){
      //   navigate('/admin/dashboard')
      // }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData) => {
    // Store JWT tokens in cookies
    Cookies.set('access_token', loginData.access, { expires: 1 }); // 1 day
    Cookies.set('refresh_token', loginData.refresh, { expires: 7 }); // 7 days
    
    // Fetch user profile
    await fetchUserProfile();
  };

  const register = async (registerData) => {
    // After successful registration, you might want to automatically log in
    // For now, we'll just show success message and let user login manually
    return registerData;
  };

  const logout = () => {
    // Clear cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    
    // Clear user state
    setUser(null);
  };

  const refreshToken = async () => {
    const refreshToken = Cookies.get('refresh_token');
    if (!refreshToken) {
      logout();
      return false;
    }

    try {
      const response = await api.post('/token/refresh/', {
        refresh: refreshToken
      });
      
      // Update tokens
      Cookies.set('access_token', response.data.access, { expires: 1 });
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshToken,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 