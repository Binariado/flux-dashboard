import { useUIStore } from '@/stores/uiStore';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface ToggleSidebarProps {
    shape?: 'square' | 'circle';
    filled?: boolean;
    className?: string;
    size?: number;
}

export default function ToggleSidebar({
    shape = 'square',
    filled = false,
    className,
    size = 20,
}: ToggleSidebarProps) {
    const { sidebarCollapsed, toggleSidebar } = useUIStore();
    return (
        <button
            onClick={toggleSidebar}
            className={cn(
                'transition-colors cursor-pointer flex items-center justify-center',
                shape === 'circle' ? 'rounded-full p-2' : 'rounded-lg p-1',
                filled
                    ? 'bg-bg-secondary border border-border-secondary shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                className
            )}
        >
            {sidebarCollapsed ? (
                <PanelLeftOpen className="text-gray-700 dark:text-gray-300" size={size} />
            ) : (
                <PanelLeftClose className="text-gray-700 dark:text-gray-300" size={size} />
            )}
        </button>
    );
}
