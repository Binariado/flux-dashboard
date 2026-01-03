import { App, ConfigProvider, theme as antTheme } from 'antd';
import { useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/stores/uiStore';
import esES from 'antd/locale/es_ES';
import enUS from 'antd/locale/en_US';

import type { Locale } from 'antd/es/locale';

interface ThemeProviderProps {
  children: ReactNode;
}

const languageMap: Record<string, Locale> = {
  es: esES,
  en: enUS,
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setActualTheme, actualTheme, direction, sidebarTheme } = useUIStore();
  const { i18n } = useTranslation();

  // Detectar preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const systemTheme = e.matches ? 'dark' : 'light';
        setActualTheme(systemTheme);
        applyTheme(systemTheme);
      }
    };

    // Establecer tema inicial
    if (theme === 'system') {
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      setActualTheme(systemTheme);
      applyTheme(systemTheme);
    } else {
      setActualTheme(theme);
      applyTheme(theme);
    }

    // Escuchar cambios en preferencia del sistema
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setActualTheme]);

  // Aplicar tema al documento
  useEffect(() => {
    applyTheme(actualTheme);
  }, [actualTheme]);

  // Aplicar dirección al documento
  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  const applyTheme = (themeName: 'light' | 'dark') => {
    const root = document.documentElement;

    if (themeName === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Configuración de tema para Ant Design
  const antdTheme = {
    algorithm: actualTheme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#04d182',
      colorSuccess: actualTheme === 'dark' ? '#34d399' : '#10b981',
      colorWarning: actualTheme === 'dark' ? '#fbbf24' : '#f59e0b',
      colorError: actualTheme === 'dark' ? '#f87171' : '#ef4444',
      colorInfo: actualTheme === 'dark' ? '#60a5fa' : '#3b82f6',
      borderRadius: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

      // Colores específicos para dark mode
      ...(actualTheme === 'dark' && {
        colorBgBase: '#0f1419',
        colorBgContainer: '#1a1f26',
        colorBgElevated: '#22272e',
        colorBorder: '#2d333b',
        colorText: '#e6edf3',
        colorTextSecondary: '#8b949e',
      }),
    },
    components: {
      Layout: {
        headerBg: actualTheme === 'dark' ? '#1a1f26' : '#ffffff',
        siderBg: (sidebarTheme || actualTheme) === 'dark' ? '#0f1419' : '#ffffff',
        bodyBg: actualTheme === 'dark' ? '#0f1419' : '#f8f9fa',
        footerBg: actualTheme === 'dark' ? '#0f1419' : '#ffffff',
      },
      Menu: {
        darkItemBg: '#0f1419',
        darkItemSelectedBg: '#1a1f26',
        itemSelectedBg: '#e6faf3',
        itemSelectedColor: '#04d182',
        // Hacer que el menú respete el tema del sidebar si está definido
        colorBgContainer: (sidebarTheme || actualTheme) === 'dark' ? '#0f1419' : '#ffffff',
        colorText: (sidebarTheme || actualTheme) === 'dark' ? '#e6edf3' : 'rgba(0, 0, 0, 0.88)',
        itemHoverBg: (sidebarTheme || actualTheme) === 'dark' ? '#1a1f26' : 'rgba(0, 0, 0, 0.06)',
      },
      Button: {
        primaryColor: '#ffffff',
        primaryShadow: 'none',
      },
      Card: {
        colorBgContainer: actualTheme === 'dark' ? '#1a1f26' : '#ffffff',
        colorBorderSecondary: actualTheme === 'dark' ? '#2d333b' : '#e5e7eb',
      },
      Table: {
        headerBg: actualTheme === 'dark' ? '#22272e' : '#f8f9fa',
        rowHoverBg: actualTheme === 'dark' ? '#22272e' : '#f8f9fa',
      },
    },
  };

  // Get the Ant Design locale settings based on the current language.
  const currentLanguage = i18n.language?.split('-')[0] || 'es';
  const locale = languageMap[currentLanguage] || esES;

  return (
    <ConfigProvider theme={antdTheme} locale={locale} direction={direction}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
