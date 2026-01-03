import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '@/pages/auth/Login';
import { BrowserRouter } from 'react-router';
import { App } from 'antd';

// Mock del hook useAuthStore
vi.mock('@/stores/authStore', () => ({
    useAuthStore: () => ({
        login: vi.fn(),
        isAuthenticated: false,
        error: null,
        isLoading: false,
        refreshToken: null,
    }),
}));

// Mock de la API
vi.mock('@/api/endpoints/auth', () => ({
    authApi: {
        login: vi.fn(),
    },
}));

// Mock de window.matchMedia para Ant Design
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe('Login Component', () => {
    it('renders login form correctly', () => {
        render(
            <App>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </App>
        );

        // Verifica que el título esté presente
        expect(screen.getByText(/Flux Dashboard Admin/i)).toBeInTheDocument();

        // Verifica que los campos existan
        expect(screen.getByPlaceholderText(/tu.usuario/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();

        // Verifica que el botón de login exista
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it('updates input values on change', () => {
        render(
            <App>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </App>
        );

        const usernameInput = screen.getByPlaceholderText(/tu.usuario/i) as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText(/••••••••/i) as HTMLInputElement;

        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(usernameInput.value).toBe('admin');
        expect(passwordInput.value).toBe('password123');
    });
});
