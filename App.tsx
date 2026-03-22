import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const Inner: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#0F172A' : '#F8FAFC'}
      />
      <AppNavigator />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  );
};

export default App;
