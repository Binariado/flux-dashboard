import axiosInstance from '@/api/axios.config';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth.types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance('/auth/token', {
      method: 'POST',
      data: {
        grant_type: 'password',
        username: credentials.username,
        password: credentials.password,
        scope: 'openid profile email offline_access',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await axiosInstance('/connect/token', {
      method: 'POST',
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await axiosInstance.post('/auth/reset-password', { token, password });
    return response.data;
  },
};
