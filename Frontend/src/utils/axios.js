import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken
        });

        const { access } = response.data;
        
        // Update tokens in cookies
        Cookies.set('access_token', access, { expires: 1 });
        
        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens but don't redirect automatically
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        
        // Don't redirect automatically - let the component handle it
        console.log('Token refresh failed, tokens cleared');
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 