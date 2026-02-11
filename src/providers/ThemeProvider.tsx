import { App, ConfigProvider, theme as antTheme } from 'antd';
import { themeConfig } from '@/config/theme';
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

const COLOR_PRIMARY = themeConfig.primary;

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
      colorPrimary: COLOR_PRIMARY,
      colorSuccess: actualTheme === 'dark' ? '#34d399' : '#10b981',
      colorWarning: actualTheme === 'dark' ? '#fbbf24' : '#f59e0b',
      colorError: actualTheme === 'dark' ? '#f87171' : '#ef4444',
      colorInfo: actualTheme === 'dark' ? '#60a5fa' : '#3b82f6',
      borderRadius: 8,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

      // Colores específicos para dark mode
      ...(actualTheme === 'dark' && {
        colorBgBase: themeConfig.dark.background,
        colorBgContainer: themeConfig.dark.surface,
        colorBgElevated: themeConfig.dark.surfaceElevated,
        colorBorder: themeConfig.dark.border,
        colorText: themeConfig.dark.text,
        colorTextSecondary: themeConfig.dark.textSecondary,
      }),
    },
    components: {
      Layout: {
        headerBg: actualTheme === 'dark' ? themeConfig.dark.surface : themeConfig.light.surface,
        siderBg:
          (sidebarTheme || actualTheme) === 'dark'
            ? themeConfig.dark.background
            : themeConfig.light.surface,
        bodyBg: actualTheme === 'dark' ? themeConfig.dark.background : themeConfig.light.background,
        footerBg:
          actualTheme === 'dark' ? themeConfig.dark.background : themeConfig.light.background,
      },
      Menu: {
        darkItemBg: themeConfig.dark.background,
        darkItemSelectedBg: themeConfig.dark.surface,

        itemSelectedColor: COLOR_PRIMARY,
        // Hacer que el menú respete el tema del sidebar si está definido
        colorBgContainer:
          (sidebarTheme || actualTheme) === 'dark'
            ? themeConfig.dark.background
            : themeConfig.light.surface,
        colorText:
          (sidebarTheme || actualTheme) === 'dark' ? themeConfig.dark.text : themeConfig.light.text,
        itemHoverBg:
          (sidebarTheme || actualTheme) === 'dark'
            ? themeConfig.dark.actionHover
            : themeConfig.light.actionHover,
      },
      Button: {
        primaryColor: '#ffffff',
        primaryShadow: 'none',
      },
      Card: {
        colorBgContainer:
          actualTheme === 'dark' ? themeConfig.dark.surface : themeConfig.light.surface,
        colorBorderSecondary:
          actualTheme === 'dark' ? themeConfig.dark.border : themeConfig.light.border,
      },
      Table: {
        headerBg:
          actualTheme === 'dark'
            ? themeConfig.dark.surfaceElevated
            : themeConfig.light.surfaceElevated,
        rowHoverBg:
          actualTheme === 'dark'
            ? themeConfig.dark.surfaceElevated
            : themeConfig.light.surfaceElevated,
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
