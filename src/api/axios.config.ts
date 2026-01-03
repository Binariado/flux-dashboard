import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { useAuthStore } from '@/stores/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5123';

// Crear instancia de Axios
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Si es error 401 y no es el endpoint de login/refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/connect/token')
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken, setAccessToken } = useAuthStore.getState();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Intentar obtener nuevo access token
        const response = await axios.post(
          `${API_URL}/connect/token`,
          {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );

        const { access_token } = response.data;
        setAccessToken(access_token);

        // Reintentar request original con nuevo token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, hacer logout
        useAuthStore.getState().logout();
        // window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    // Si es error 403, mostrar mensaje de permisos
    if (error.response?.status === 403) {
      console.error('No tienes permisos para realizar esta acción');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
