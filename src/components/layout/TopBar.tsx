import { Menu } from '@/components/ui';
import { useMenuItems } from '@/hooks/useMenuItems';
import { useLocation } from 'react-router';

interface TopBarProps {
  variant?: 'sidebar' | 'topbar';
}

export function TopBar({ variant = 'topbar' }: TopBarProps) {
  const menuItems = useMenuItems();
  const location = useLocation();
  const isTopbar = variant === 'topbar';

  const wrapperClassName = isTopbar
    ? 'template-topbar-inner'
    : 'bg-bg-secondary border-b border-border-secondary px-6 template-topbar';

  return (
    <div className={wrapperClassName}>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-b-0 w-full template-topbar-menu"
      />
    </div>
  );
}
