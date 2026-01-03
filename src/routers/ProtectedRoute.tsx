import { Navigate } from 'react-router';
import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { authApi } from '@/api/endpoints/auth';
import { useLoading } from '@/hooks/useLoading';
import { App } from '@/components/ui';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { message } = App.useApp();
  const { isAuthenticated, refreshToken, login, logout } = useAuthStore();
  const { hideLoading, isLoading } = useLoading(!!refreshToken && !isAuthenticated);

  const handleRefreshToken = async (refreshToken: string) => {
    try {
      const response = await authApi.refreshToken(refreshToken);
      login(response.access_token, response.refresh_token);
    } catch (error: any) {
      logout();
      message.error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (refreshToken && !isAuthenticated) {
      handleRefreshToken(refreshToken);
    } else if (!refreshToken) {
      logout();
      hideLoading();
    } else if (refreshToken && isAuthenticated) {
      hideLoading();
    }
  }, [refreshToken, isAuthenticated]);

  return isLoading ? (
    <></>
  ) : !isAuthenticated ? (
    <Navigate to="/auth/login" replace />
  ) : (
    <>{children}</>
  );
}
