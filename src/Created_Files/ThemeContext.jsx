// ThemeContext.js
import React, { createContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

const lightTheme = {
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
};

const darkTheme = {
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
    text: {
      primary: '#ffffff',
    },
  },
};

export default function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode); // For CSS vars
    localStorage.setItem('theme', newMode); // Save preference
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setMode(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
