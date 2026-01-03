import { useNavigate } from 'react-router';
import { Home, Folder, FileText } from 'lucide-react';
import type { MenuProps } from '@/components/ui';
import { useTranslation } from 'react-i18next';

export function useMenuItems() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <Home size={18} />,
      label: t('menu.dashboard'),
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/examples/simple',
      icon: <FileText size={18} />,
      label: t('menu.simple'),
      onClick: () => navigate('/examples/simple'),
    },
    {
      key: 'group-examples',
      icon: <Folder size={18} />,
      label: t('menu.examplesGroup'),
      children: [
        {
          key: '/examples/nested',
          label: t('menu.nested'),
          onClick: () => navigate('/examples/nested'),
        },
      ],
    },
  ];

  return menuItems;
}
