import React, { createContext, useContext, useState } from 'react';

// ─── Light & Dark color palettes ──────────────────────────────────────────────
const lightColors = {
  primary:       '#4F46E5',
  primaryLight:  '#EEF2FF',
  success:       '#10B981',
  successLight:  '#D1FAE5',
  warning:       '#F59E0B',
  warningLight:  '#FEF3C7',
  danger:        '#EF4444',
  dangerLight:   '#FEE2E2',
  info:          '#3B82F6',
  infoLight:     '#DBEAFE',
  white:         '#FFFFFF',
  background:    '#F8FAFC',
  card:          '#FFFFFF',
  border:        '#E2E8F0',
  textPrimary:   '#1E293B',
  textSecondary: '#64748B',
  textMuted:     '#94A3B8',
};

const darkColors = {
  primary:       '#818CF8',
  primaryLight:  '#1E1B4B',
  success:       '#34D399',
  successLight:  '#064E3B',
  warning:       '#FCD34D',
  warningLight:  '#451A03',
  danger:        '#F87171',
  dangerLight:   '#450A0A',
  info:          '#60A5FA',
  infoLight:     '#1E3A5F',
  white:         '#FFFFFF',
  background:    '#0F172A',
  card:          '#1E293B',
  border:        '#334155',
  textPrimary:   '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted:     '#64748B',
};

// ─── Types ────────────────────────────────────────────────────────────────────
type ColorPalette = typeof lightColors;

interface ThemeContextType {
  isDark:     boolean;
  toggleDark: () => void;
  colors:     ColorPalette;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextType>({
  isDark:     false,
  toggleDark: () => {},
  colors:     lightColors,
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleDark = (): void => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleDark,
        colors: isDark ? darkColors : lightColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useTheme = (): ThemeContextType => useContext(ThemeContext);
