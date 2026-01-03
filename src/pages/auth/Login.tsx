import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuthStore } from '@/stores/authStore';
import { authApi } from '@/api/endpoints/auth';
import type { LoginRequest } from '@/types/auth.types';
import { App, Button, Checkbox, Form, Input, type FormProps } from '@/components/ui';

export default function Login() {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const { login, refreshToken } = useAuthStore();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit: FormProps<LoginRequest>['onFinish'] = async (values) => {
    setLoading(true);
    try {
      const response = await authApi.login(values);
      login(response.access_token, response.refresh_token);
      message.success('¡Bienvenido de nuevo!');
      navigate('/dashboard');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refreshToken) {
      navigate('/dashboard');
    }
  }, [refreshToken]);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary to-gradient-to items-center justify-center p-12">
        <div className="text-white max-w-md">
          <h1 className="text-5xl font-bold mb-6">Flux Dashboard Admin</h1>
          <p className="text-xl text-white/90 mb-8">
            Sistema de administración integral para gestionar tu API de forma profesional y
            eficiente.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Gestión Completa</h3>
                <p className="text-sm text-white/80">Cuentas, evaluaciones y catálogos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Seguridad Avanzada</h3>
                <p className="text-sm text-white/80">Autenticación y permisos robustos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Interface Moderna</h3>
                <p className="text-sm text-white/80">Diseño intuitivo y responsive</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg-secondary">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Bienvenido</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <Form form={form} onFinish={handleSubmit} layout="vertical" requiredMark={false}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}
            >
              <Input placeholder="tu.usuario" size="large" required />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
            >
              <Input.Password placeholder="••••••••" size="large" required />
            </Form.Item>

            <div className="flex items-center justify-between mb-6">
              <Form.Item name="rememberMe" valuePropName="checked" className="mb-0">
                <Checkbox>Recordarme</Checkbox>
              </Form.Item>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary hover:text-link-hover"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="primary" htmlType="submit" size="large" loading={loading}>
              Iniciar Sesión
            </Button>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes una cuenta?{' '}
              <Link to="/auth/register" className="text-primary hover:text-link-hover font-medium">
                Regístrate
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
