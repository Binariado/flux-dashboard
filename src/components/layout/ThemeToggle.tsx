import { Sun, Moon, Monitor } from 'lucide-react';
import { Dropdown } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import type { MenuProps } from '@/components/ui';

export function ThemeToggle() {
  const { theme, actualTheme, setThemeMode } = useTheme();

  const items: MenuProps['items'] = [
    {
      key: 'light',
      label: 'Claro',
      icon: <Sun className="w-4 h-4" />,
      onClick: () => setThemeMode('light'),
    },
    {
      key: 'dark',
      label: 'Oscuro',
      icon: <Moon className="w-4 h-4" />,
      onClick: () => setThemeMode('dark'),
    },
    {
      key: 'system',
      label: 'Sistema',
      icon: <Monitor className="w-4 h-4" />,
      onClick: () => setThemeMode('system'),
    },
  ];

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-5 h-5" />;
    }
    return actualTheme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />;
  };

  return (
    <Dropdown menu={{ items, selectedKeys: [theme] }} trigger={['click']} placement="bottomRight">
      <button
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                   transition-colors duration-200 text-gray-600 dark:text-gray-300"
        aria-label="Cambiar tema"
      >
        {getIcon()}
      </button>
    </Dropdown>
  );
}
