import { Layout, Menu } from '@/components/ui';
import { useUIStore } from '@/stores/uiStore';
import { useLocation } from 'react-router';
import { useMenuItems } from '@/hooks/useMenuItems';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  SlidersHorizontal,
} from 'lucide-react';

import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { SettingsDrawer } from '@/components/layout/SettingsDrawer';
import { UserProfileMenu } from '@/components/layout/UserProfileMenu';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  // overflow: 'auto', // Removed automatic overflow on the whole sider
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: 'thin', // TS complaint fix: Keep only one instance
  scrollbarGutter: 'stable',
};

export function Sidebar() {
  const { sidebarCollapsed } = useUIStore();
  const location = useLocation();
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menuItems = useMenuItems();

  const getSelectedKeys = () => {
    return [location.pathname];
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    if (path.startsWith('/examples')) return ['group-examples'];
    return [];
  };

  return (
    <>
      <Sider
        collapsible
        collapsed={sidebarCollapsed}
        trigger={null}
        width={280}
        collapsedWidth={80}
        className="border-r border-border-secondary relative"
        style={siderStyle}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex shrink-0 items-center justify-center border-b border-border-secondary">
            {sidebarCollapsed ? (
              <div className="text-2xl font-bold text-primary">F</div>
            ) : (
              <div className="text-2xl font-bold text-primary">Flux Dashboard</div>
            )}
          </div>

          {/* Menu - Scrollable Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <Menu
              mode="inline"
              selectedKeys={getSelectedKeys()}
              defaultOpenKeys={getOpenKeys()}
              items={menuItems}
              style={{ borderRight: '0px', background: 'transparent' }}
            />
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="p-4 border-t border-border-secondary shrink-0 bg-bg-secondary">
            <div className={`flex ${sidebarCollapsed ? 'flex-col gap-4 items-center' : 'flex-col gap-4'}`}>

              {/* Utility Row (Lang, Theme, Settings) */}
              <div className={`flex items-center ${sidebarCollapsed ? 'flex-col gap-4' : 'justify-between'}`}>
                {/* Wrapping LanguageSelector in a way that fits if collapsed? LanguageSelector might be too wide. 
                    Let's assume LanguageSelector has an icon-only mode or we just hide text. 
                    Actually, LanguageSelector usually returns a dropdown. 
                  */}
                <div className={sidebarCollapsed ? '' : ''}>
                  <LanguageSelector />
                </div>

                <ThemeToggle />

                <button
                  onClick={() => setSettingsOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-500"
                  title={t('settings.title')}
                >
                  <SlidersHorizontal size={20} />
                </button>
              </div>

              {/* User Profile */}
              <UserProfileMenu collapsed={sidebarCollapsed} placement="topLeft" bgClassName="bg-white dark:bg-bg-primary" />
            </div>
          </div>
        </div>
      </Sider>

      {/* Settings Drawer (Now controlled by Sidebar) */}
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
