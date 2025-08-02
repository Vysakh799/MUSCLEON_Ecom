import React, { useState } from 'react';
import api from '../../utils/axios';
import Cookies from 'js-cookie';
import Navbar from '../common/Navbar';
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
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
      <link
        rel="stylesheet"
        as="style"
        // onload="this.rel='stylesheet'"
        href="https://fonts.googleapis.com/css2?display=swap&family=Lexend%3Awght%40400%3B500%3B700%3B900&family=Noto+Sans%3Awght%40400%3B500%3B700%3B900"
      />
      <title>Stitch Design</title>
      <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />
      <div
        className="relative flex size-full min-h-screen flex-col bg-gradient-to-br from-[#221112] to-[#182035] dark group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
      >
        <Navbar/>
        <div className="layout-container flex h-full grow flex-col mt-20">

          <div className="gap-1 px-6 flex flex-1 justify-center py-5">
            
            <div className="layout-content-container flex flex-col w-[360px]">
              <div className="@container">
                <div className="@[480px]:px-4 @[480px]:py-3">
                  <div
                    className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#221112] @[480px]:rounded-xl min-h-80"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqxh446BvvQXeUv0StB1P7IT-SbuGVrL6DWUw-I74LuHMCtxzYfqntgnRFQ6b8kXB7ntYSBMm8PBHwcvarfACBymtu-BFPdqZcGl1EF_J5qCa1iv6lp8dcHZrfqfc9Tr8n1cXuKgZszzE_Xvu6j1vTCrBL0qpa7N9_j3_iyTMSzO3mq96qtL3qjn5eBCkSwFkN2zp6XL8qMH_7V6HhRrt8WVYCe8GtQxgcnMb7LsoAU4vZVfnyLCXvPM2ImLSQh5ParI-51UGbCbs")'
                    }}
                  />
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
                <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
                  Welcome back
                </h2>
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
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <input
                      placeholder="Email"
                      className={`form-input  flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-black focus:outline-0 focus:ring-0 border-none bg-[#472426] focus:border-none h-14 placeholder:text-[#c89396] p-4 text-base font-normal leading-normal  ${errors.username
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
                        : 'border-gray-200 bg-gray-50 focus:border-primary-400'
                        }`}
                    
                      id='username'
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <span className="text-red-500 text-xs flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.username}
                      </span>
                    )}
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <input
                      type='password'
                      placeholder="Password"
                      className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-black focus:outline-0 focus:ring-0 border-none bg-[#472426] focus:border-none h-14 placeholder:text-[#c89396] p-4 text-base font-normal leading-normal ${errors.password
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
                        : 'border-gray-200 bg-gray-50 focus:border-primary-400'
                        }`}
                     
                      id='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}

                    />
                    {errors.password && (
                      <span className="text-red-500 text-xs flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.password}
                      </span>
                    )}
                  </label>
                </div>

                <p className="text-[#c89396] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline">
                  Forgot password?
                </p>
                <div className="flex px-4 py-3 justify-start">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#e82630] text-white text-base font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">{loading ? 'Logging in...' : 'Login'}</span>
                  </button>
                </div>
                <p className="text-[#c89396] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline">
                  New to Muscleon?{' '}
                  <button
                    type='button'
                    onClick={switchToRegister}
                    className='text-[#c89398] font-semibold underline hover:text[#c89399] transition-colors duration-200'
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login; 