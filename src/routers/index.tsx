import { Routes, Route, Navigate } from 'react-router';
import { Suspense, lazy } from 'react';
import { ProtectedRoute } from '@/routers/ProtectedRoute';
import { MainLayout } from '@/components/layout/MainLayout';
import { Spin } from 'antd';

// Lazy loading de páginas
const Login = lazy(() => import('@/pages/auth/Login'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const SimplePage = lazy(() => import('@/pages/examples/SimplePage'));
const NestedPage = lazy(() => import('@/pages/examples/NestedPage'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Spin size="large" />
  </div>
);

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="examples/simple" element={<SimplePage />} />
          <Route path="examples/nested" element={<NestedPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
