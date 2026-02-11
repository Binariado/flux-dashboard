export const themeConfig = {
  primary: '#2563eb', // Blue-600

  // Dark Mode Palette: Based on "Slate" (Blue-Gray) tones.
  // These cool-toned neutrals (#0f1419, #1a1f26) provide depth and reduced eye strain compared to pure black.
  // They serve as a universal, high-contrast background that harmonizes with both cool (Blue/Violet/Teal) and warm accent colors.
  dark: {
    background: '#0f1419', // Dark Slate 900
    surface: '#1a1f26', // Dark Slate 800
    surfaceElevated: '#22272e', // Dark Slate 700
    border: '#2d333b', // Dark Slate Border
    text: '#e6edf3', // Light Text (High Contrast)
    textSecondary: '#8b949e', // Muted Text
    actionHover: '#1a1f26', // Dark Slate 800 (Surface) - Consistent with ThemeProvider logic
  },

  // Light Mode Palette: Clean and bright foundations.
  light: {
    background: '#f8f9fa', // Common dashboard light gray
    surface: '#ffffff',
    surfaceElevated: '#f8f9fa', // Using for table headers etc.
    border: '#e5e7eb', // Restored specific border color (Gray-200)
    text: '#1f2937', // Safe Gray-900 (matches oklch roughly) for AntD compatibility
    textSecondary: '#717182',
    actionHover: 'rgba(0, 0, 0, 0.06)', // Standard AntD hover style
  },
};
