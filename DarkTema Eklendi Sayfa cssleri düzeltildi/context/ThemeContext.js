import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    isDarkMode,
    colors: {
      background: isDarkMode ? '#1a1a1a' : '#f8f9fa',
      card: isDarkMode ? '#2d2d2d' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#2d3436',
      textSecondary: isDarkMode ? '#b3b3b3' : '#636e72',
      border: isDarkMode ? '#404040' : '#e9ecef',
    },
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 