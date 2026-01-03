import { Avatar, Dropdown } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { MenuProps } from '@/components/ui';
import { User, LogOut, Settings } from 'lucide-react';

interface UserProfileMenuProps {
    collapsed?: boolean;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | 'topCenter' | 'bottomCenter';
    showName?: boolean;
    bgClassName?: string;
}

const user = {
    name: 'Brayan Salgado',
    role: 'Admin',
};

export function UserProfileMenu({
    collapsed = false,
    placement = 'bottomRight',
    showName = true,
    bgClassName = "bg-white dark:bg-bg-primary"
}: UserProfileMenuProps) {
    const { logout } = useAuthStore();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <User size={16} />,
            label: t('header.profile'),
            onClick: () => navigate('/settings/profile'),
        },
        {
            key: 'settings',
            icon: <Settings size={16} />,
            label: t('header.settings'),
            onClick: () => navigate('/settings/preferences'),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogOut size={16} />,
            label: t('header.logout'),
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement={placement}>
            <div
                className={`flex items-center cursor-pointer p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${collapsed || !showName ? 'justify-center' : 'gap-3'
                    } ${bgClassName}`}
            >
                <Avatar
                    icon={<User size={18} />}
                    className="bg-primary flex shrink-0 items-center justify-center"
                    size={collapsed ? 'large' : 'default'}
                />

                {!collapsed && showName && (
                    <div className="flex-1 min-w-0 text-left">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {user.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.role}
                        </div>
                    </div>
                )}
            </div>
        </Dropdown>
    );
}
