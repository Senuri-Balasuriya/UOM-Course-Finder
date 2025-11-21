import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const theme = {
    dark: isDarkMode,
    colors: isDarkMode ? {
      // Dark theme colors
      background: '#111827',
      card: '#1F2937',
      surface: '#374151',
      primary: '#60A5FA',
      primaryLight: '#93C5FD',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      textTertiary: '#9CA3AF',
      border: '#374151',
      borderLight: '#4B5563',
      error: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      icon: '#D1D5DB',
      placeholder: '#6B7280',
      inputBackground: '#374151',
      shadow: '#000000',
    } : {
      // Light theme colors
      background: '#F3F4F6',
      card: '#FFFFFF',
      surface: '#FFFFFF',
      primary: '#1E3A8A',
      primaryLight: '#DBEAFE',
      text: '#111827',
      textSecondary: '#6B7280',
      textTertiary: '#9CA3AF',
      border: '#F3F4F6',
      borderLight: '#E5E7EB',
      error: '#DC2626',
      success: '#059669',
      warning: '#D97706',
      icon: '#6B7280',
      placeholder: '#9CA3AF',
      inputBackground: '#F9FAFB',
      shadow: '#000000',
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
