import { Layout, Badge } from '@/components/ui';
import { Input } from '@/components/ui';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { SettingsDrawer } from '@/components/layout/SettingsDrawer';
import { UserProfileMenu } from '@/components/layout/UserProfileMenu';
import { useUIStore } from '@/stores/uiStore';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Bell,
  Search as SearchIcon,
  SlidersHorizontal,
} from 'lucide-react';
import ToggleSidebar from '@/components/layout/ToggleSidebar';

const { Header: AntHeader } = Layout;
const { Search } = Input;

export function Header() {
  const { navType } = useUIStore();
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <AntHeader className="flex items-center justify-between px-6[!important] bg-bg-secondary border-b border-border-secondary relative">
        {/* Left section */}
        <div className="flex items-center gap-4 flex-1">
          {navType === 'sidebar' && (
            <div className="absolute top-4 start-[-17.5px] z-20">
              <ToggleSidebar shape="circle" filled size={16} />
            </div>
          )}

          {/* Logo for Topbar */}
          {navType === 'topbar' && (
            <div className="text-xl font-bold text-primary mr-4">Flux Dashboard</div>
          )}

          {/* Search Bar */}
          <Search
            placeholder={t('header.searchPlaceholder')}
            className="max-w-xl"
            prefix={<SearchIcon size={16} className="text-gray-400" />}
            allowClear
          />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* User Profile - Reusable Component */}
          <UserProfileMenu collapsed={false} placement="bottomRight" showName={false} bgClassName="bg-white dark:bg-transparent" />

          {/* Notifications */}
          <Badge count={5} size="small">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <Bell className="text-gray-700 dark:text-gray-300" size={20} />
            </button>
          </Badge>

          {/* Layout-specific items: Only show in Header if using Topbar navigation. */}
          {navType === 'topbar' && (
            <>
              {/* Language Selector */}
              <LanguageSelector />

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* UI Settings Trigger */}
              <button
                onClick={() => setSettingsOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                title={t('settings.title')}
              >
                <SlidersHorizontal
                  className="text-gray-700 dark:text-gray-300"
                  size={20}
                />
              </button>
            </>
          )}
        </div>
      </AntHeader>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
