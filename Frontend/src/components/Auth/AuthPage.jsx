import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useAuth } from './AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const { login, register } = useAuth();

  const handleLoginSuccess = (data) => {
    login(data);
  };

  const handleRegisterSuccess = (data) => {
    setSuccessMessage('Registration successful! Please login with your credentials.');
    setIsLogin(true);
    // Clear success message after 5 seconds
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setSuccessMessage('');
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setSuccessMessage('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br">
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-lg text-center text-sm shadow-lg z-50 max-w-md">
          {successMessage}
        </div>
      )}
      
      {isLogin ? (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          switchToRegister={switchToRegister}
        />
      ) : (
        <Register 
          onRegisterSuccess={handleRegisterSuccess} 
          switchToLogin={switchToLogin}
        />
      )}
    </div>
  );
};

export default AuthPage; 