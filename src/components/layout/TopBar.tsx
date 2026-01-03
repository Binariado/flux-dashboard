import { Menu } from '@/components/ui';
import { useMenuItems } from '@/hooks/useMenuItems';
import { useLocation } from 'react-router';

export function TopBar() {
  const menuItems = useMenuItems();
  const location = useLocation();

  return (
    <div className="bg-bg-secondary border-b border-border-secondary px-6">
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-b-0 w-full"
      />
    </div>
  );
}
