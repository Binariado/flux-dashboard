import { Dropdown } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import type { MenuProps } from '@/components/ui';

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  const handleSystemLanguage = () => {
    localStorage.removeItem('i18nextLng');
    window.location.reload();
  };

  const isSystem = !localStorage.getItem('i18nextLng');
  const detectedLang = i18n.resolvedLanguage;
  const systemLang = navigator.language.split('-')[0];

  const getFlag = (lang?: string) => {
    if (lang === 'es') return '🇪🇸';
    if (lang === 'en') return '🇺🇸';
    return '';
  };

  const items: MenuProps['items'] = [
    {
      key: 'system',
      label: `${t('common.system')} (${getFlag(systemLang)})`,
      onClick: handleSystemLanguage,
      disabled: isSystem,
    },
    {
      type: 'divider',
    },
    {
      key: 'es',
      label: 'Español 🇪🇸',
      onClick: () => handleLanguageChange('es'),
      disabled: !isSystem && detectedLang === 'es',
    },
    {
      key: 'en',
      label: 'English 🇺🇸',
      onClick: () => handleLanguageChange('en'),
      disabled: !isSystem && detectedLang === 'en',
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <button
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-2"
        aria-label={t('common.language')}
      >
        <Languages className="text-gray-700 dark:text-gray-300" size={20} />
      </button>
    </Dropdown>
  );
}
