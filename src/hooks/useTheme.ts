import { useUIStore } from '../stores/uiStore';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const { theme, actualTheme, setTheme } = useUIStore();

  const isDark = actualTheme === 'dark';
  const isLight = actualTheme === 'light';
  const isSystem = theme === 'system';

  const toggleTheme = () => {
    const newTheme: Theme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const setThemeMode = (mode: Theme) => {
    setTheme(mode);
  };

  return {
    theme, // 'light' | 'dark' | 'system' (preferencia del usuario)
    actualTheme, // 'light' | 'dark' (tema realmente aplicado)
    isDark,
    isLight,
    isSystem,
    toggleTheme,
    setThemeMode,
  };
}
