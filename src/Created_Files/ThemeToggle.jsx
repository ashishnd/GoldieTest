// components/ThemeToggle.js
/*
import React from 'react';
import { Fab } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggle = ({ mode, toggleTheme }) => {
  return (
    <Fab
      onClick={toggleTheme}
      color="primary"
      aria-label="toggle theme"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </Fab>
  );
};

export default ThemeToggle;*/

// ToggleTheme.js
import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ColorModeContext } from './ThemeContext';
import { useTheme } from '@mui/material/styles';

const ThemeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
