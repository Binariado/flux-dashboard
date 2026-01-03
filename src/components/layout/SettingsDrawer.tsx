import { Drawer, Radio, Switch, Flex, Divider } from '@/components/ui';
import { useUIStore } from '@/stores/uiStore';
import { useTranslation } from 'react-i18next';
import {
  Moon,
  Sun,
  LayoutTemplate,
  PanelLeft,
  ArrowLeftRight,
  Globe,
  Settings,
} from 'lucide-react';
import type { RadioChangeEvent } from 'antd';

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const {
    navType,
    setNavType,
    sidebarTheme,
    setSidebarTheme,
    sidebarCollapsed,
    toggleSidebar,
    theme,
    setTheme,
    direction,
    setDirection,
  } = useUIStore();
  const { t, i18n } = useTranslation();

  const handleNavTypeChange = (e: RadioChangeEvent) => {
    setNavType(e.target.value);
  };

  const handleSidebarCollapseChange = (checked: boolean) => {
    if (sidebarCollapsed !== checked) {
      toggleSidebar();
    }
  };

  const handleThemeChange = (e: RadioChangeEvent) => {
    setTheme(e.target.value);
  };

  const handleDirectionChange = (e: RadioChangeEvent) => {
    setDirection(e.target.value);
  };

  const handleLanguageChange = (e: RadioChangeEvent) => {
    const lang = e.target.value;
    if (lang === 'system') {
      localStorage.removeItem('i18nextLng');
      window.location.reload();
    } else {
      i18n.changeLanguage(lang);
      localStorage.setItem('i18nextLng', lang);
    }
  };

  const isSystem = !localStorage.getItem('i18nextLng');
  const detectedLang = i18n.resolvedLanguage;
  const systemLang = navigator.language.split('-')[0];

  const getFlag = (lang?: string) => {
    if (lang === 'es') return '🇪🇸';
    if (lang === 'en') return '🇺🇸';
    return '';
  };

  const currentLanguage = isSystem ? 'system' : detectedLang;

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <Settings className="text-primary" size={20} />
          <span>{t('settings.title', 'Configuración de UI')}</span>
        </div>
      }
      placement={direction === 'rtl' ? 'left' : 'right'}
      onClose={onClose}
      open={open}
      size={320}
    >
      <div className="flex flex-col gap-6">
        {/* Navigation Type */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
            <LayoutTemplate size={16} />
            {t('settings.navType.title', 'Tipo de Navegación')}
          </h3>
          <Radio.Group
            value={navType}
            onChange={handleNavTypeChange}
            className="w-full"
            optionType="button"
            buttonStyle="solid"
          >
            <Flex gap="small" vertical className="w-full">
              <Radio.Button value="sidebar" className="text-center">
                {t('settings.navType.sidebar', 'Lateral')}
              </Radio.Button>
              <Radio.Button value="topbar" className="text-center">
                {t('settings.navType.topbar', 'Superior')}
              </Radio.Button>
            </Flex>
          </Radio.Group>
        </section>

        <Divider className="my-0" />

        {/* Sidebar Theme */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
            <PanelLeft size={16} />
            {t('settings.sidebar.title', 'Menú Lateral')}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('settings.sidebar.theme', 'Tema del Menú')}</span>
              <Radio.Group
                value={sidebarTheme || undefined}
                onChange={(e) => {
                  setSidebarTheme(e.target.value === 'sync' ? undefined : e.target.value);
                }}
                size="small"
              >
                <Radio.Button value="light">
                  <div className="flex justify-center items-center h-full w-full">
                    <Sun size={14} />
                  </div>
                </Radio.Button>
                <Radio.Button value="dark">
                  <div className="flex justify-center items-center h-full w-full">
                    <Moon size={14} />
                  </div>
                </Radio.Button>
                <Radio.Button
                  value="sync"
                  title={t('settings.sidebar.sync', 'Sincronizar con tema app')}
                >
                  <div className="flex justify-center items-center h-full w-full">
                    <ArrowLeftRight size={14} className="rotate-90" />
                  </div>
                </Radio.Button>
              </Radio.Group>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t('settings.sidebar.collapsed', 'Colapsado')}</span>
              <Switch
                checked={sidebarCollapsed}
                onChange={handleSidebarCollapseChange}
                size="small"
              />
            </div>
          </div>
        </section>

        <Divider className="my-0" />

        {/* App Theme */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
            <Sun size={16} />
            {t('settings.theme.title', 'Tema de Aplicación')}
          </h3>
          <Radio.Group
            value={theme}
            onChange={handleThemeChange}
            className="w-full"
            optionType="button"
            buttonStyle="solid"
          >
            <div className="grid grid-cols-3 gap-2">
              <Radio.Button value="light" className="text-center flex justify-center items-center">
                {t('settings.theme.light', 'Claro')}
              </Radio.Button>
              <Radio.Button value="dark" className="text-center flex justify-center items-center">
                {t('settings.theme.dark', 'Oscuro')}
              </Radio.Button>
              <Radio.Button value="system" className="text-center flex justify-center items-center">
                {t('settings.theme.system', 'Auto')}
              </Radio.Button>
            </div>
          </Radio.Group>
        </section>

        <Divider className="my-0" />

        {/* Direction */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
            <ArrowLeftRight size={16} />
            {t('settings.direction.title', 'Dirección')}
          </h3>
          <Radio.Group
            value={direction}
            onChange={handleDirectionChange}
            className="w-full"
            optionType="button"
            buttonStyle="solid"
          >
            <div className="grid grid-cols-2 gap-2">
              <Radio.Button value="ltr" className="text-center">
                LTR
              </Radio.Button>
              <Radio.Button value="rtl" className="text-center">
                RTL
              </Radio.Button>
            </div>
          </Radio.Group>
        </section>

        <Divider className="my-0" />

        {/* Regional Settings */}
        <section>
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
            <Globe size={16} />
            {t('settings.regional.title', 'Configuración Regional')}
          </h3>
          <div className="flex flex-col gap-2">
            <span className="text-sm mb-1">{t('common.language', 'Idioma')}</span>
            <Radio.Group
              value={currentLanguage}
              onChange={handleLanguageChange}
              className="w-full flex flex-col gap-2"
            >
              <Radio
                value="es"
                className="flex items-center gap-2 border p-2 rounded-lg hover:border-primary transition-colors"
                disabled={!isSystem && detectedLang === 'es'}
              >
                <span className="text-xl">🇪🇸</span>
                <span>Español</span>
              </Radio>
              <Radio
                value="en"
                className="flex items-center gap-2 border p-2 rounded-lg hover:border-primary transition-colors"
                disabled={!isSystem && detectedLang === 'en'}
              >
                <span className="text-xl">🇺🇸</span>
                <span>English</span>
              </Radio>
              <Radio
                value="system"
                className="flex items-center gap-2 border p-2 rounded-lg hover:border-primary transition-colors"
                disabled={isSystem}
              >
                <span className="text-xl">💻</span>
                <span>
                  {t('common.system', 'Sistema')} ({getFlag(systemLang)})
                </span>
              </Radio>
            </Radio.Group>
          </div>
        </section>
      </div>
    </Drawer>
  );
}
