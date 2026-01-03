import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string;
  duration?: number;
}

interface UIState {
  sidebarCollapsed: boolean;
  theme: Theme;
  actualTheme: 'light' | 'dark'; // El tema real aplicado (resuelto si es 'system')
  notifications: Notification[];
  searchOpen: boolean;

  navType: 'sidebar' | 'topbar';
  sidebarTheme?: 'light' | 'dark'; // undefined means sync with main theme
  direction: 'ltr' | 'rtl';

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: Theme) => void;
  setActualTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setSearchOpen: (open: boolean) => void;
  setNavType: (type: 'sidebar' | 'topbar') => void;
  setSidebarTheme: (theme?: 'light' | 'dark') => void;
  setDirection: (dir: 'ltr' | 'rtl') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: 'system',
      actualTheme: 'light',
      notifications: [],
      searchOpen: false,
      navType: 'sidebar',
      sidebarTheme: undefined,
      direction: 'ltr',

      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      setTheme: (theme) => set({ theme }),

      setActualTheme: (theme) => set({ actualTheme: theme }),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id: Date.now().toString() }],
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      setSearchOpen: (open) => set({ searchOpen: open }),
      setNavType: (navType) => set({ navType }),
      setSidebarTheme: (sidebarTheme) => set({ sidebarTheme }),
      setDirection: (direction) => set({ direction }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
        navType: state.navType,
        sidebarTheme: state.sidebarTheme,
        direction: state.direction,
      }),
    },
  ),
);
